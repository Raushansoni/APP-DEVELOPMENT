package com.taskx.app.ui.main

import android.Manifest
import android.annotation.SuppressLint
import android.app.Activity
import android.content.ActivityNotFoundException
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.GeolocationPermissions
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceError
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.activity.OnBackPressedCallback
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import androidx.lifecycle.lifecycleScope
import com.taskx.app.BuildConfig
import com.taskx.app.R
import com.taskx.app.core.logging.AppLogger
import kotlinx.coroutines.launch
import kotlinx.coroutines.suspendCancellableCoroutine
import kotlin.coroutines.resume

class MainActivity : AppCompatActivity() {

  private data class PendingGeoRequest(
    val origin: String,
    val callback: GeolocationPermissions.Callback
  )

  private val viewModel: MainViewModel by viewModels()

  private lateinit var webView: WebView
  private var filePathCallback: ValueCallback<Array<Uri>>? = null
  private var pendingFileChooserParams: WebChromeClient.FileChooserParams? = null
  private var pendingGeoRequest: PendingGeoRequest? = null

  private val filePickerLauncher =
    registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { result ->
      val callback = filePathCallback
      filePathCallback = null
      pendingFileChooserParams = null

      if (callback == null) return@registerForActivityResult

      val uris = if (result.resultCode == Activity.RESULT_OK) {
        WebChromeClient.FileChooserParams.parseResult(result.resultCode, result.data)
      } else {
        null
      }
      callback.onReceiveValue(uris)
    }

  private val filePermissionLauncher =
    registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { grants ->
      val allGranted = viewModel.requiredFilePermissions().all { permission ->
        grants[permission] == true || hasPermission(permission)
      }

      if (allGranted) launchPendingFileChooser() else cancelPendingFileChooser()
    }

  private val locationPermissionLauncher =
    registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { grants ->
      val granted =
        grants[Manifest.permission.ACCESS_FINE_LOCATION] == true ||
          grants[Manifest.permission.ACCESS_COARSE_LOCATION] == true ||
          hasPermission(Manifest.permission.ACCESS_FINE_LOCATION) ||
          hasPermission(Manifest.permission.ACCESS_COARSE_LOCATION)

      resolvePendingGeoRequest(granted)
    }

  private val backPressedCallback = object : OnBackPressedCallback(true) {
    override fun handleOnBackPressed() {
      dispatchBackToWebThenNative()
    }
  }

  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)

    webView = findViewById(R.id.webView)
    configureWebView()
    webView.clearCache(true)
    webView.clearHistory()

    if (savedInstanceState != null) {
      webView.restoreState(savedInstanceState)
    } else {
      webView.loadUrl(viewModel.uiState.startUrl)
    }

    onBackPressedDispatcher.addCallback(this, backPressedCallback)
  }

  @SuppressLint("SetJavaScriptEnabled")
  private fun configureWebView() {
    webView.settings.apply {
      javaScriptEnabled = true
      domStorageEnabled = true
      databaseEnabled = true
      allowFileAccess = true
      allowContentAccess = true
      allowFileAccessFromFileURLs = false
      allowUniversalAccessFromFileURLs = false
      mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
      cacheMode = WebSettings.LOAD_DEFAULT
      setGeolocationEnabled(true)
      safeBrowsingEnabled = true

      setSupportZoom(false)
      builtInZoomControls = false
      displayZoomControls = false
      setSupportMultipleWindows(false)
      javaScriptCanOpenWindowsAutomatically = false
      mediaPlaybackRequiresUserGesture = true
      loadsImagesAutomatically = true
      offscreenPreRaster = true
    }

    webView.webViewClient = object : WebViewClient() {
      override fun onReceivedError(
        view: WebView,
        request: WebResourceRequest,
        error: WebResourceError
      ) {
        super.onReceivedError(view, request, error)
        if (request.isForMainFrame) {
          AppLogger.e("Main frame load error: ${error.description} (${error.errorCode})")
        }
      }
    }

    webView.webChromeClient = object : WebChromeClient() {
      override fun onConsoleMessage(consoleMessage: ConsoleMessage): Boolean {
        val level = consoleMessage.messageLevel().name
        if (BuildConfig.LOG_VERBOSE) {
          AppLogger.d(
            "JS[$level] ${consoleMessage.message()} @ ${consoleMessage.sourceId()}:${consoleMessage.lineNumber()}"
          )
        }
        return super.onConsoleMessage(consoleMessage)
      }

      override fun onShowFileChooser(
        webView: WebView?,
        filePathCallback: ValueCallback<Array<Uri>>?,
        fileChooserParams: FileChooserParams?
      ): Boolean {
        if (filePathCallback == null) return false

        cancelPendingFileChooser()
        this@MainActivity.filePathCallback = filePathCallback
        this@MainActivity.pendingFileChooserParams = fileChooserParams

        if (ensureFilePermissions()) launchPendingFileChooser()
        return true
      }

      override fun onGeolocationPermissionsShowPrompt(
        origin: String?,
        callback: GeolocationPermissions.Callback?
      ) {
        if (origin.isNullOrBlank() || callback == null) return
        pendingGeoRequest = PendingGeoRequest(origin, callback)
        if (ensureLocationPermissions()) resolvePendingGeoRequest(true)
      }

      override fun onGeolocationPermissionsHidePrompt() {
        resolvePendingGeoRequest(false)
      }
    }

    val debuggable = (applicationInfo.flags and ApplicationInfo.FLAG_DEBUGGABLE) != 0
    WebView.setWebContentsDebuggingEnabled(debuggable)
  }

  private fun ensureFilePermissions(): Boolean {
    val missing = viewModel.requiredFilePermissions().filterNot(::hasPermission)
    if (missing.isEmpty()) return true
    filePermissionLauncher.launch(missing.toTypedArray())
    return false
  }

  private fun ensureLocationPermissions(): Boolean {
    val required = viewModel.requiredLocationPermissions()
    val hasAny = required.any(::hasPermission)
    if (hasAny) return true
    locationPermissionLauncher.launch(required.toTypedArray())
    return false
  }

  private fun hasPermission(permission: String): Boolean {
    return ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED
  }

  private fun launchPendingFileChooser() {
    val callback = filePathCallback ?: return

    val intent = try {
      pendingFileChooserParams?.createIntent()
        ?: Intent(Intent.ACTION_GET_CONTENT).apply {
          addCategory(Intent.CATEGORY_OPENABLE)
          type = "image/*"
        }
    } catch (error: Exception) {
      AppLogger.e("Unable to create file chooser intent", error)
      callback.onReceiveValue(null)
      filePathCallback = null
      pendingFileChooserParams = null
      return
    }

    try {
      filePickerLauncher.launch(intent)
    } catch (error: ActivityNotFoundException) {
      AppLogger.e("No file chooser available", error)
      callback.onReceiveValue(null)
      filePathCallback = null
      pendingFileChooserParams = null
    }
  }

  private fun cancelPendingFileChooser() {
    filePathCallback?.onReceiveValue(null)
    filePathCallback = null
    pendingFileChooserParams = null
  }

  private fun resolvePendingGeoRequest(granted: Boolean) {
    val request = pendingGeoRequest ?: return
    request.callback.invoke(request.origin, granted, false)
    pendingGeoRequest = null
  }

  private fun dispatchBackToWebThenNative() {
    if (webView.url.isNullOrBlank()) {
      performNativeBack()
      return
    }

    lifecycleScope.launch {
      val handledByWeb = evaluateBackHandler()
      if (!handledByWeb) {
        performNativeBack()
      }
    }
  }

  private suspend fun evaluateBackHandler(): Boolean {
    return suspendCancellableCoroutine { continuation ->
      try {
        webView.evaluateJavascript(viewModel.uiState.jsBackHandler) { result ->
          if (continuation.isActive) {
            continuation.resume(viewModel.parseBackResult(result))
          }
        }
      } catch (_: Throwable) {
        if (continuation.isActive) continuation.resume(false)
      }
    }
  }

  private fun performNativeBack() {
    if (webView.canGoBack()) {
      webView.goBack()
      return
    }

    backPressedCallback.isEnabled = false
    onBackPressedDispatcher.onBackPressed()
    backPressedCallback.isEnabled = true
  }

  override fun onSaveInstanceState(outState: Bundle) {
    webView.saveState(outState)
    super.onSaveInstanceState(outState)
  }

  override fun onResume() {
    super.onResume()
    webView.onResume()
    webView.resumeTimers()
  }

  override fun onPause() {
    webView.onPause()
    webView.pauseTimers()
    super.onPause()
  }

  override fun onDestroy() {
    cancelPendingFileChooser()
    resolvePendingGeoRequest(false)

    try {
      webView.stopLoading()
      webView.webChromeClient = null
      webView.webViewClient = WebViewClient()
      webView.loadUrl("about:blank")
      webView.clearHistory()
      webView.removeAllViews()
      (webView.parent as? ViewGroup)?.removeView(webView)
      webView.destroy()
    } catch (error: Throwable) {
      AppLogger.w("WebView destroy failed", error)
    }
    super.onDestroy()
  }
}
