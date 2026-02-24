package com.taskx.app.core.logging

import timber.log.Timber

object AppLogger {
  fun d(message: String) = Timber.d(message)

  fun i(message: String) = Timber.i(message)

  fun w(message: String, throwable: Throwable? = null) {
    if (throwable == null) Timber.w(message) else Timber.w(throwable, message)
  }

  fun e(message: String, throwable: Throwable? = null) {
    if (throwable == null) Timber.e(message) else Timber.e(throwable, message)
  }
}
