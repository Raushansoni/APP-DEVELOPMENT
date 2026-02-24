package com.taskx.app.core.debug

import android.os.StrictMode
import com.taskx.app.BuildConfig

object StrictModeConfig {
  fun enableIfDebug() {
    if (!BuildConfig.DEBUG || !BuildConfig.ENABLE_STRICT_MODE) return

    StrictMode.setThreadPolicy(
      StrictMode.ThreadPolicy.Builder()
        .detectAll()
        .penaltyLog()
        .build()
    )
    StrictMode.setVmPolicy(
      StrictMode.VmPolicy.Builder()
        .detectLeakedClosableObjects()
        .detectActivityLeaks()
        .penaltyLog()
        .build()
    )
  }
}
