const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export interface AnalysisResult {
  analysis_id: string
  filename: string
  timestamp: string
  results: {
    overall_score: number
    form_analysis: {
      serve: FormAnalysis
      forehand: FormAnalysis
      backhand: FormAnalysis
    }
  }
}

export interface FormAnalysis {
  score: number
  feedback: string
  improvements: string[]
}

export interface HistoryItem {
  id: number
  date: string
  filename: string
  score: number
  status: string
}

export class ApiClient {
  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  static async uploadVideo(
    file: File
  ): Promise<{ success: boolean; filename: string; message: string }> {
    const formData = new FormData()
    formData.append('video', file)

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`)
    }

    return response.json()
  }

  static async analyzeVideo(filename: string): Promise<AnalysisResult> {
    return this.request<AnalysisResult>('/api/analyze', {
      method: 'POST',
      body: JSON.stringify({ filename }),
    })
  }

  static async getAnalysisHistory(): Promise<HistoryItem[]> {
    return this.request<HistoryItem[]>('/api/history')
  }

  static async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health')
  }
}
