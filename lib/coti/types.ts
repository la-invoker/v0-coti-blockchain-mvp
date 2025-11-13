export interface GrantSubmissionRequest {
  title: string
  description: string
  author?: string
}

export interface GrantResponse {
  id: number
  title: string
  description: string
  author: string
  created_at: string
  submitter: string
  timestamp: number
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
