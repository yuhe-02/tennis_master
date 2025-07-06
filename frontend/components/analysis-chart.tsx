'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getScoreHistory } from '@/lib/mock-data'
import { TrendingUp } from 'lucide-react'

export function AnalysisChart() {
  const scoreHistory = getScoreHistory()
  const maxScore = Math.max(...scoreHistory.map(d => d.score))
  const minScore = Math.min(...scoreHistory.map(d => d.score))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          スコア推移
        </CardTitle>
        <CardDescription>過去の解析結果のスコア変化</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-2">
          {scoreHistory.map((data, index) => {
            const height =
              ((data.score - minScore) / (maxScore - minScore)) * 200 + 20
            return (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="text-xs font-medium">{data.score}</div>
                <div
                  className="bg-green-500 rounded-t-sm min-w-[20px] transition-all hover:bg-green-600"
                  style={{ height: `${height}px` }}
                />
                <div className="text-xs text-gray-500 rotate-45 origin-left">
                  {data.date.slice(5)}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
