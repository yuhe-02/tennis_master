'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Upload, Play, BarChart3, Target, Zap } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">TennisForm AI</h1>
            </div>
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            AIでテニスフォームを
            <span className="text-green-600">完璧に</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            動画をアップロードするだけで、AIがあなたのテニスフォームを詳細に解析。
            理想的なフォームとの比較から具体的な改善アドバイスまで、すべてを提供します。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/analyze">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Upload className="w-5 h-5 mr-2" />
                今すぐ解析を始める
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              <Play className="w-5 h-5 mr-2" />
              デモを見る
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">主な機能</h3>
          <p className="text-gray-600">
            プロレベルのフォーム解析をあなたの手に
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Upload className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>動画アップロード</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                スマートフォンで撮影した動画を簡単にアップロード。様々な形式に対応しています。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>フォーム解析</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AIが体の軸、関節の動き、ラケットの軌道を詳細に解析し、ビジュアライズします。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Target className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>理想フォーム比較</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                プロ選手の理想的なフォームと比較し、改善すべきポイントを明確に示します。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Zap className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>改善アドバイス</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                具体的な練習方法と改善ステップを提案し、上達をサポートします。
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">
            今すぐテニスフォームを改善しましょう
          </h3>
          <p className="text-xl mb-8 text-green-100">
            プロコーチレベルの解析を、いつでもどこでも
          </p>
          <Link href="/analyze">
            <Button size="lg" variant="secondary">
              無料で解析を始める
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 TennisForm AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
