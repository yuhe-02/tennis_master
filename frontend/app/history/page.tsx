'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Search,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Play,
  MoreVertical,
  Filter,
} from 'lucide-react'
import Link from 'next/link'
import {
  mockAnalysisHistory,
  mockUserStats,
  getFilteredAnalysisHistory,
} from '@/lib/mock-data'

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredHistory, setFilteredHistory] = useState(mockAnalysisHistory)
  // APIデータの取得は将来的に実装予定

  // APIデータの取得は将来的に実装予定

  // const analysisHistory = [
  //   {
  //     id: 1,
  //     date: "2024-01-15",
  //     title: "フォアハンド練習",
  //     score: 78,
  //     change: +5,
  //     duration: "0:45",
  //     thumbnail: "/placeholder.svg?height=100&width=150&text=Tennis+1",
  //   },
  //   {
  //     id: 2,
  //     date: "2024-01-12",
  //     title: "バックハンド改善",
  //     score: 73,
  //     change: -2,
  //     duration: "1:20",
  //     thumbnail: "/placeholder.svg?height=100&width=150&text=Tennis+2",
  //   },
  //   {
  //     id: 3,
  //     date: "2024-01-10",
  //     title: "サーブフォーム",
  //     score: 75,
  //     change: +8,
  //     duration: "0:35",
  //     thumbnail: "/placeholder.svg?height=100&width=150&text=Tennis+3",
  //   },
  //   {
  //     id: 4,
  //     date: "2024-01-08",
  //     title: "総合練習",
  //     score: 67,
  //     change: 0,
  //     duration: "2:15",
  //     thumbnail: "/placeholder.svg?height=100&width=150&text=Tennis+4",
  //   },
  //   {
  //     id: 5,
  //     date: "2024-01-05",
  //     title: "フォアハンド基礎",
  //     score: 67,
  //     change: +3,
  //     duration: "1:05",
  //     thumbnail: "/placeholder.svg?height=100&width=150&text=Tennis+5",
  //   },
  // ]

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-600" />
    return <Minus className="w-4 h-4 text-gray-400" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600'
    if (change < 0) return 'text-red-600'
    return 'text-gray-400'
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    setFilteredHistory(getFilteredAnalysisHistory(term))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TennisForm AI</h1>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                ホーム
              </Link>
              <Link
                href="/analyze"
                className="text-gray-600 hover:text-gray-900"
              >
                解析
              </Link>
              <Link href="/history" className="text-green-600 font-medium">
                履歴
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">解析履歴</h2>
            <p className="text-gray-600">
              過去の解析結果を確認し、上達の軌跡を追跡しましょう
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>総解析回数</CardDescription>
                <CardTitle className="text-2xl">
                  {mockUserStats.totalAnalyses}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-600">
                  +{mockUserStats.monthlyIncrease} 今月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>平均スコア</CardDescription>
                <CardTitle className="text-2xl">
                  {mockUserStats.averageScore}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-600">
                  +{mockUserStats.scoreImprovement} 先月比
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardDescription>最高スコア</CardDescription>
                <CardTitle className="text-2xl">
                  {mockUserStats.bestScore}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  {mockUserStats.bestScoreDate}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="解析結果を検索..."
                value={searchTerm}
                onChange={e => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              フィルター
            </Button>
          </div>

          {/* History List */}
          <div className="space-y-4">
            {filteredHistory.map(item => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="relative">
                      <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center relative">
                        <Play className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{item.date}</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Score */}
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">
                              {item.score}
                            </div>
                            <div className="text-xs text-gray-500">スコア</div>
                          </div>

                          {/* Change */}
                          <div
                            className={`flex items-center gap-1 ${getChangeColor(
                              item.change
                            )}`}
                          >
                            {getChangeIcon(item.change)}
                            <span className="text-sm font-medium">
                              {item.change > 0
                                ? `+${item.change}`
                                : item.change}
                            </span>
                          </div>

                          {/* Actions */}
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">さらに読み込む</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
