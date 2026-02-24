package com.taskx.app.data.repository

import android.Manifest
import android.os.Build

class PermissionRepository {
  fun requiredFilePermissions(): List<String> {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) return emptyList()

    val permissions = mutableListOf(Manifest.permission.CAMERA)
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      permissions += Manifest.permission.READ_MEDIA_IMAGES
    } else {
      permissions += Manifest.permission.READ_EXTERNAL_STORAGE
    }
    return permissions
  }

  fun requiredLocationPermissions(): List<String> = listOf(
    Manifest.permission.ACCESS_FINE_LOCATION,
    Manifest.permission.ACCESS_COARSE_LOCATION
  )
}
