package com.taskx.app.data.repository

import com.taskx.app.BuildConfig

class AppConfigRepository {
  fun startUrl(): String = BuildConfig.WEB_START_URL

  fun jsBackHandler(): String = JS_BACK_HANDLER

  companion object {
    private const val JS_BACK_HANDLER = """
      (function () {
        try {
          if (window.TaskXApp && typeof window.TaskXApp.handleBack === 'function') {
            return window.TaskXApp.handleBack() ? 'true' : 'false';
          }
          return 'false';
        } catch (e) {
          return 'false';
        }
      })();
    """
  }
}
