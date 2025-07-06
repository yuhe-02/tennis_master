'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Share2,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Target,
  Activity,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  getCurrentAnalysisResult,
  mockImprovementAdvice,
  mockPracticeMenus,
  mockPracticeVideos,
} from '@/lib/mock-data'
import { ApiClient, type AnalysisResult } from '@/lib/api'

function ResultsPageContent() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [analysisData, setAnalysisData] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const searchParams = useSearchParams()
  const filename = searchParams.get('filename')

  useEffect(() => {
    const fetchAnalysisData = async () => {
      if (!filename) {
        setError('ファイル名が指定されていません')
        setLoading(false)
        return
      }

      try {
        const result = await ApiClient.analyzeVideo(filename)
        setAnalysisData(result)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'データの取得に失敗しました'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysisData()
  }, [filename])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">解析結果を読み込み中...</p>
        </div>
      </div>
    )
  }

  if (error || !analysisData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || '解析結果が見つかりません'}
          </p>
          <Link href="/analyze">
            <Button>新しい解析を開始</Button>
          </Link>
        </div>
      </div>
    )
  }

  const mockAnalysisData = getCurrentAnalysisResult()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TennisForm AI</h1>
            </Link>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                共有
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                レポート保存
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">解析結果</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-600">
                    {analysisData.results.overall_score}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500">総合スコア</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {analysisData.results.overall_score}/100
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="analysis" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analysis">解析結果</TabsTrigger>
              <TabsTrigger value="comparison">フォーム比較</TabsTrigger>
              <TabsTrigger value="advice">改善アドバイス</TabsTrigger>
              <TabsTrigger value="practice">練習メニュー</TabsTrigger>
            </TabsList>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Video Player */}
                <Card>
                  <CardHeader>
                    <CardTitle>解析動画</CardTitle>
                    <CardDescription>
                      AIが検出した骨格とフォームの軌道を表示
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden">
                      <video
                        className="w-full h-full object-cover"
                        poster="/placeholder.svg?height=300&width=500&text=Tennis+Analysis+Video"
                      >
                        <source
                          src="/sample-tennis-video.mp4"
                          type="video/mp4"
                        />
                      </video>

                      {/* Video Controls */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <div className="flex items-center gap-4">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                            onClick={() => setIsPlaying(!isPlaying)}
                          >
                            {isPlaying ? (
                              <Pause className="w-4 h-4" />
                            ) : (
                              <Play className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-white hover:bg-white/20"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                          <div className="flex-1">
                            <Progress value={30} className="bg-white/20" />
                          </div>
                          <span className="text-white text-sm">
                            0:15 / 0:45
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>主要指標</CardTitle>
                    <CardDescription>
                      各フォーム要素の評価スコア
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockAnalysisData.keyMetrics.map((metric, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {metric.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">
                              {metric.score}/100
                            </span>
                            {metric.status === 'good' ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                        </div>
                        <Progress
                          value={metric.score}
                          className={`h-2 ${
                            metric.status === 'good'
                              ? 'bg-green-100'
                              : 'bg-yellow-100'
                          }`}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      良い点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mockAnalysisData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-gray-700">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      改善点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {mockAnalysisData.improvements.map(
                        (improvement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-gray-700">{improvement}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Comparison Tab */}
            <TabsContent value="comparison" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>理想フォームとの比較</CardTitle>
                  <CardDescription>
                    プロ選手の理想的なフォームとあなたのフォームを並べて比較
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 text-center">
                        あなたのフォーム
                      </h4>
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=200&width=300&text=Your+Form"
                          alt="Your tennis form"
                          width={300}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3 text-center">
                        理想フォーム
                      </h4>
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=200&width=300&text=Ideal+Form"
                          alt="Ideal tennis form"
                          width={300}
                          height={200}
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">主な違い</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• インパクト時の体の向きが約15度早く開いています</li>
                      <li>• 膝の曲げ角度が理想より10度浅くなっています</li>
                      <li>
                        • ラケットヘッドの位置が理想より5cm低い位置にあります
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Advice Tab */}
            <TabsContent value="advice" className="space-y-6">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      優先改善ポイント
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockImprovementAdvice.map((advice, index) => (
                      <div
                        key={index}
                        className={`border-l-4 ${
                          advice.priority === 'high'
                            ? 'border-red-500'
                            : advice.priority === 'medium'
                              ? 'border-yellow-500'
                              : 'border-blue-500'
                        } pl-4`}
                      >
                        <h4
                          className={`font-medium ${
                            advice.priority === 'high'
                              ? 'text-red-900'
                              : advice.priority === 'medium'
                                ? 'text-yellow-900'
                                : 'text-blue-900'
                          }`}
                        >
                          {index + 1}. {advice.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {advice.description}
                        </p>
                        <Badge
                          variant={
                            advice.priority === 'high'
                              ? 'destructive'
                              : advice.priority === 'medium'
                                ? 'secondary'
                                : 'outline'
                          }
                          className="mt-2"
                        >
                          {advice.priority === 'high'
                            ? '高優先度'
                            : advice.priority === 'medium'
                              ? '中優先度'
                              : '低優先度'}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Practice Tab */}
            <TabsContent value="practice" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>今週の練習メニュー</CardTitle>
                    <CardDescription>
                      解析結果に基づいた個別練習プログラム
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockPracticeMenus.map((menu, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h5 className="font-medium">
                          {menu.day}: {menu.title}
                        </h5>
                        <p className="text-sm text-gray-600 mt-1">
                          {menu.description}（{menu.duration}分）
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>練習動画</CardTitle>
                    <CardDescription>
                      改善に効果的な練習方法を動画で確認
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockPracticeVideos.map(video => (
                      <div
                        key={video.id}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <Play className="w-8 h-8 text-green-600" />
                        <div>
                          <h5 className="font-medium">{video.title}</h5>
                          <p className="text-sm text-gray-500">
                            {video.duration}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Link href="/analyze">
              <Button variant="outline">新しい動画を解析</Button>
            </Link>
            <Button className="bg-green-600 hover:bg-green-700">
              練習を開始
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">読み込み中...</p>
          </div>
        </div>
      }
    >
      <ResultsPageContent />
    </Suspense>
  )
}
