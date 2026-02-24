param(
  [ValidateSet("debug", "release", "both")]
  [string]$Build = "debug",

  [switch]$NoBuild
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Resolve-Path (Join-Path $scriptDir "..")
$taskxRoot = Split-Path -Parent $projectRoot
$apksRoot = Join-Path $taskxRoot "APKs"
$backupRoot = Join-Path $apksRoot "Versioned"
$manifestPath = Join-Path $apksRoot "version-list.csv"
$gradleFile = Join-Path $projectRoot "app\build.gradle"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

function Ensure-Java {
  if (Get-Command java -ErrorAction SilentlyContinue) {
    return
  }

  $studioJbr = "C:\Program Files\Android\Android Studio\jbr"
  if (Test-Path $studioJbr) {
    $env:JAVA_HOME = $studioJbr
    $env:Path = "$studioJbr\bin;$env:Path"
  }

  if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    throw "Java was not found. Set JAVA_HOME before running this script."
  }
}

function Get-VersionInfo {
  if (-not (Test-Path $gradleFile)) {
    throw "Cannot find app/build.gradle at $gradleFile"
  }

  $text = Get-Content $gradleFile -Raw

  $versionNameMatch = [regex]::Match($text, 'versionName\s+"([^"]+)"')
  $versionCodeMatch = [regex]::Match($text, 'versionCode\s+(\d+)')

  $versionName = if ($versionNameMatch.Success) { $versionNameMatch.Groups[1].Value } else { "unknown" }
  $versionCode = if ($versionCodeMatch.Success) { $versionCodeMatch.Groups[1].Value } else { "0" }

  return @{ VersionName = $versionName; VersionCode = $versionCode }
}

function Build-Apk([string]$target) {
  if ($NoBuild) {
    return
  }

  Ensure-Java

  Push-Location $projectRoot
  try {
    if ($target -eq "debug") {
      & .\gradlew.bat assembleDebug
    } elseif ($target -eq "release") {
      & .\gradlew.bat assembleRelease
    }

    if ($LASTEXITCODE -ne 0) {
      throw "Gradle build failed for $target"
    }
  }
  finally {
    Pop-Location
  }
}

function Find-SourceApk([string]$target) {
  $candidates = @()

  if ($target -eq "debug") {
    $candidates = @(
      (Join-Path $projectRoot "app\build\outputs\apk\debug\app-debug.apk"),
      (Join-Path $projectRoot "TaskX-debug.apk")
    )
  }

  if ($target -eq "release") {
    $candidates = @(
      (Join-Path $projectRoot "app\build\outputs\apk\release\app-release.apk"),
      (Join-Path $projectRoot "app\build\outputs\apk\release\app-release-aligned.apk"),
      (Join-Path $projectRoot "TaskX-final-release.apk"),
      (Join-Path $projectRoot "TaskX-release-optimized.apk"),
      (Join-Path $projectRoot "TaskX-release.apk")
    )
  }

  foreach ($path in $candidates) {
    if (Test-Path $path) {
      return $path
    }
  }

  throw "No $target APK found after build."
}

function Ensure-Manifest {
  New-Item -ItemType Directory -Force $apksRoot | Out-Null
  New-Item -ItemType Directory -Force $backupRoot | Out-Null

  if (-not (Test-Path $manifestPath)) {
    "createdAt,versionName,versionCode,buildType,fileName,fileSizeBytes,sha256,sourcePath,backupPath" | Set-Content $manifestPath
  }
}

function Save-Backup([string]$sourcePath, [string]$target, [hashtable]$versionInfo) {
  Ensure-Manifest

  $safeVersion = ($versionInfo.VersionName -replace '[^0-9A-Za-z._-]', '_')
  $fileName = "TaskX_v$safeVersion`_vc$($versionInfo.VersionCode)_$target`_$timestamp.apk"
  $destinationPath = Join-Path $backupRoot $fileName

  Copy-Item -Path $sourcePath -Destination $destinationPath -Force

  $fileInfo = Get-Item $destinationPath
  $hash = (Get-FileHash $destinationPath -Algorithm SHA256).Hash

  $row = '{0},{1},{2},{3},{4},{5},{6},{7},{8}' -f `
    (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), `
    $versionInfo.VersionName, `
    $versionInfo.VersionCode, `
    $target, `
    $fileInfo.Name, `
    $fileInfo.Length, `
    $hash, `
    $sourcePath.Replace(',', ';'), `
    $destinationPath.Replace(',', ';')

  Add-Content -Path $manifestPath -Value $row

  return $destinationPath
}

$targets = @()
if ($Build -eq "both") {
  $targets = @("debug", "release")
} else {
  $targets = @($Build)
}

$versionInfo = Get-VersionInfo
$results = @()

foreach ($target in $targets) {
  Build-Apk -target $target
  $sourceApk = Find-SourceApk -target $target
  $backupApk = Save-Backup -sourcePath $sourceApk -target $target -versionInfo $versionInfo
  $results += [PSCustomObject]@{
    buildType = $target
    sourceApk = $sourceApk
    backupApk = $backupApk
  }
}

Write-Output "Backup completed:"
$results | Format-Table -AutoSize
Write-Output "Version log: $manifestPath"
