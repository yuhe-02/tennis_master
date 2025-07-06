'use client'

import type React from 'react'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Upload, FileVideo, X, Play, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { ApiClient } from '@/lib/api'

export default function AnalyzePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('video/')) {
      setUploadedFile(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) {
      setUploadedFile(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const startAnalysis = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setError(null)

    try {
      // ファイルをアップロード
      setAnalysisProgress(20)
      const uploadResult = await ApiClient.uploadVideo(uploadedFile)
      setUploadedFilename(uploadResult.filename)

      // 解析開始
      setAnalysisProgress(50)
      await ApiClient.analyzeVideo(uploadResult.filename)

      setAnalysisProgress(100)
      setIsAnalyzing(false)
      setAnalysisComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsAnalyzing(false)
      setAnalysisProgress(0)
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
    setAnalysisProgress(0)
    setAnalysisComplete(false)
    setUploadedFilename(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <FileVideo className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TennisForm AI</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ホーム
              </Link>
              <Link href="/analyze" className="text-green-600 font-medium">
                解析
              </Link>
              <Link
                href="/history"
                className="text-gray-600 hover:text-gray-900"
              >
                履歴
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              フォーム解析
            </h2>
            <p className="text-gray-600">
              テニスの動画をアップロードして、AIによる詳細なフォーム解析を受けましょう
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle>動画アップロード</CardTitle>
                <CardDescription>
                  MP4, MOV,
                  AVI形式の動画ファイルをアップロードしてください（最大100MB）
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      ファイルをドラッグ&ドロップ
                    </p>
                    <p className="text-sm text-gray-500 mb-4">または</p>
                    <Button variant="outline">ファイルを選択</Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileVideo className="w-8 h-8 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {uploadedFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {!analysisComplete && (
                      <Button
                        onClick={startAnalysis}
                        disabled={isAnalyzing}
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            解析中...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            解析を開始
                          </>
                        )}
                      </Button>
                    )}

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 text-sm">{error}</p>
                      </div>
                    )}

                    {isAnalyzing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>解析進行状況</span>
                          <span>{analysisProgress}%</span>
                        </div>
                        <Progress value={analysisProgress} className="w-full" />
                      </div>
                    )}

                    {analysisComplete && (
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Play className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-green-600 font-medium mb-4">
                          解析が完了しました！
                        </p>
                        <Link href={`/results?filename=${uploadedFilename}`}>
                          <Button className="bg-green-600 hover:bg-green-700">
                            結果を見る
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>撮影のコツ</CardTitle>
                <CardDescription>
                  より正確な解析のために、以下のポイントを参考にしてください
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">横からの撮影</h4>
                    <p className="text-sm text-gray-600">
                      体の側面が見えるように横から撮影してください
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      全身が映るように
                    </h4>
                    <p className="text-sm text-gray-600">
                      頭からつま先まで全身が画面に収まるようにしてください
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">明るい場所で</h4>
                    <p className="text-sm text-gray-600">
                      十分な明るさがある場所で撮影してください
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      スローモーション推奨
                    </h4>
                    <p className="text-sm text-gray-600">
                      可能であればスローモーション撮影をお勧めします
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
