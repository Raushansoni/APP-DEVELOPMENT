package com.taskx.app

import android.app.Application
import com.taskx.app.core.debug.StrictModeConfig
import timber.log.Timber

class TaskXApp : Application() {
  override fun onCreate() {
    super.onCreate()

    if (BuildConfig.DEBUG) {
      StrictModeConfig.enableIfDebug()
      if (Timber.forest().isEmpty()) {
        Timber.plant(Timber.DebugTree())
      }
    }
  }
}
