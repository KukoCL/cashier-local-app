export interface MessageRecord {
  id: string
  message: string
  timestamp: string
}

export interface SaveMessageRequest {
  message: string
}

export interface ApiResponse<T = any> {
  success?: boolean
  message?: string
  error?: string
  data?: T
}
