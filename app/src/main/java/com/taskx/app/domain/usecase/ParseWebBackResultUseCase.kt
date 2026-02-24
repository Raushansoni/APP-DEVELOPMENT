package com.taskx.app.domain.usecase

class ParseWebBackResultUseCase {
  operator fun invoke(result: String?): Boolean {
    return result == "\"true\"" || result == "true"
  }
}
