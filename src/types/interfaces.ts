export interface MessageRecord {
  id: string
  message: string
  timestamp: string
}

export interface SaveMessageRequest {
  message: string
}
