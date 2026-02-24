package com.taskx.app.ui.main

import androidx.lifecycle.ViewModel
import com.taskx.app.data.repository.AppConfigRepository
import com.taskx.app.data.repository.PermissionRepository
import com.taskx.app.domain.usecase.ParseWebBackResultUseCase

class MainViewModel : ViewModel() {
  private val appConfigRepository = AppConfigRepository()
  private val permissionRepository = PermissionRepository()
  private val parseWebBackResultUseCase = ParseWebBackResultUseCase()

  val uiState: MainUiState = MainUiState(
    startUrl = appConfigRepository.startUrl(),
    jsBackHandler = appConfigRepository.jsBackHandler()
  )

  fun requiredFilePermissions(): List<String> = permissionRepository.requiredFilePermissions()

  fun requiredLocationPermissions(): List<String> = permissionRepository.requiredLocationPermissions()

  fun parseBackResult(result: String?): Boolean = parseWebBackResultUseCase(result)
}
