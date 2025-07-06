export interface AnalysisResult {
  id: string
  date: string
  title: string
  score: number
  change: number
  duration: string
  thumbnail: string
  videoUrl?: string
  keyMetrics: {
    name: string
    score: number
    status: 'good' | 'warning' | 'poor'
  }[]
  strengths: string[]
  improvements: string[]
  detailedAnalysis: {
    bodyAxis: number
    impactTiming: number
    followThrough: number
    weightTransfer: number
    racketWork: number
  }
}

export interface UserStats {
  totalAnalyses: number
  averageScore: number
  bestScore: number
  monthlyIncrease: number
  scoreImprovement: number
  bestScoreDate: string
}

export interface PracticeMenu {
  day: string
  title: string
  description: string
  duration: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface ImprovementAdvice {
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  tips: string[]
}

export interface PracticeVideo {
  id: string
  title: string
  duration: string
  thumbnail: string
  category: string
}

// モックデータ
export const mockAnalysisHistory: AnalysisResult[] = [
  {
    id: '1',
    date: '2024-01-15',
    title: 'フォアハンド練習',
    score: 78,
    change: +5,
    duration: '0:45',
    thumbnail: '/placeholder.svg?height=100&width=150&text=フォアハンド練習',
    videoUrl: '/mock-video-1.mp4',
    keyMetrics: [
      { name: '体の軸の安定性', score: 85, status: 'good' },
      { name: 'インパクトタイミング', score: 72, status: 'warning' },
      { name: 'フォロースルー', score: 88, status: 'good' },
      { name: '体重移動', score: 65, status: 'warning' },
      { name: 'ラケットワーク', score: 70, status: 'warning' },
    ],
    strengths: [
      'バックスイングのタイミングが良好',
      'フォロースルーの軌道が安定',
      '体重移動が適切',
    ],
    improvements: [
      'インパクト時の体の開きが早い',
      '膝の曲げが不十分',
      'ラケットヘッドの位置が低い',
    ],
    detailedAnalysis: {
      bodyAxis: 85,
      impactTiming: 72,
      followThrough: 88,
      weightTransfer: 65,
      racketWork: 70,
    },
  },
  {
    id: '2',
    date: '2024-01-12',
    title: 'バックハンド改善',
    score: 73,
    change: -2,
    duration: '1:20',
    thumbnail: '/placeholder.svg?height=100&width=150&text=バックハンド改善',
    videoUrl: '/mock-video-2.mp4',
    keyMetrics: [
      { name: '体の軸の安定性', score: 78, status: 'good' },
      { name: 'インパクトタイミング', score: 68, status: 'warning' },
      { name: 'フォロースルー', score: 75, status: 'warning' },
      { name: '体重移動', score: 70, status: 'warning' },
      { name: 'ラケットワーク', score: 74, status: 'warning' },
    ],
    strengths: [
      '両手バックハンドの安定性が向上',
      'テイクバックの位置が改善',
      '足の踏み込みが良好',
    ],
    improvements: [
      'インパクト後の体の回転が不足',
      'ラケット面の角度が不安定',
      'フィニッシュポジションが低い',
    ],
    detailedAnalysis: {
      bodyAxis: 78,
      impactTiming: 68,
      followThrough: 75,
      weightTransfer: 70,
      racketWork: 74,
    },
  },
  {
    id: '3',
    date: '2024-01-10',
    title: 'サーブフォーム',
    score: 75,
    change: +8,
    duration: '0:35',
    thumbnail: '/placeholder.svg?height=100&width=150&text=サーブフォーム',
    videoUrl: '/mock-video-3.mp4',
    keyMetrics: [
      { name: '体の軸の安定性', score: 80, status: 'good' },
      { name: 'インパクトタイミング', score: 75, status: 'warning' },
      { name: 'フォロースルー', score: 82, status: 'good' },
      { name: '体重移動', score: 68, status: 'warning' },
      { name: 'ラケットワーク', score: 70, status: 'warning' },
    ],
    strengths: [
      'トスの位置が安定している',
      'サーブモーションのリズムが良好',
      'プロネーションが改善',
    ],
    improvements: [
      '膝の曲げ伸ばしが不十分',
      'インパクト時の体の伸び上がりが早い',
      'フォロースルーの方向が不安定',
    ],
    detailedAnalysis: {
      bodyAxis: 80,
      impactTiming: 75,
      followThrough: 82,
      weightTransfer: 68,
      racketWork: 70,
    },
  },
  {
    id: '4',
    date: '2024-01-08',
    title: '総合練習',
    score: 67,
    change: 0,
    duration: '2:15',
    thumbnail: '/placeholder.svg?height=100&width=150&text=総合練習',
    videoUrl: '/mock-video-4.mp4',
    keyMetrics: [
      { name: '体の軸の安定性', score: 70, status: 'warning' },
      { name: 'インパクトタイミング', score: 65, status: 'warning' },
      { name: 'フォロースルー', score: 72, status: 'warning' },
      { name: '体重移動', score: 60, status: 'poor' },
      { name: 'ラケットワーク', score: 68, status: 'warning' },
    ],
    strengths: [
      'ラリー継続能力が向上',
      '様々なショットへの対応力',
      'コート内でのポジショニング',
    ],
    improvements: [
      '全体的なフォームの一貫性が不足',
      '疲労による技術の低下が顕著',
      'フットワークの改善が必要',
    ],
    detailedAnalysis: {
      bodyAxis: 70,
      impactTiming: 65,
      followThrough: 72,
      weightTransfer: 60,
      racketWork: 68,
    },
  },
  {
    id: '5',
    date: '2024-01-05',
    title: 'フォアハンド基礎',
    score: 67,
    change: +3,
    duration: '1:05',
    thumbnail: '/placeholder.svg?height=100&width=150&text=フォアハンド基礎',
    videoUrl: '/mock-video-5.mp4',
    keyMetrics: [
      { name: '体の軸の安定性', score: 72, status: 'warning' },
      { name: 'インパクトタイミング', score: 63, status: 'warning' },
      { name: 'フォロースルー', score: 70, status: 'warning' },
      { name: '体重移動', score: 65, status: 'warning' },
      { name: 'ラケットワーク', score: 65, status: 'warning' },
    ],
    strengths: [
      '基本的なスイング軌道は良好',
      'グリップの握り方が改善',
      '準備動作のタイミング',
    ],
    improvements: [
      'インパクト時の手首の使い方',
      'ボールとの距離感の調整',
      'スイングスピードの向上',
    ],
    detailedAnalysis: {
      bodyAxis: 72,
      impactTiming: 63,
      followThrough: 70,
      weightTransfer: 65,
      racketWork: 65,
    },
  },
]

export const mockUserStats: UserStats = {
  totalAnalyses: 24,
  averageScore: 72.4,
  bestScore: 85,
  monthlyIncrease: 3,
  scoreImprovement: 4.2,
  bestScoreDate: '2024/01/20',
}

export const mockPracticeMenus: PracticeMenu[] = [
  {
    day: 'Day 1-2',
    title: '体の軸安定練習',
    description: '壁打ちで体の開きを抑える練習',
    duration: 30,
    difficulty: 'beginner',
  },
  {
    day: 'Day 3-4',
    title: '膝の使い方',
    description: 'スクワット動作を取り入れたフォーム練習',
    duration: 20,
    difficulty: 'intermediate',
  },
  {
    day: 'Day 5-7',
    title: '総合練習',
    description: '改善ポイントを意識した実戦練習',
    duration: 45,
    difficulty: 'advanced',
  },
]

export const mockImprovementAdvice: ImprovementAdvice[] = [
  {
    priority: 'high',
    title: 'インパクト時の体の開き',
    description:
      'インパクトの瞬間に体が早く開きすぎています。ボールを最後まで見続け、インパクト後にフォロースルーで体を回転させるよう意識しましょう。',
    tips: [
      'インパクト時は肩を残すことを意識する',
      'ボールを最後まで見続ける',
      'フォロースルーで自然に体を回転させる',
    ],
  },
  {
    priority: 'medium',
    title: '膝の使い方',
    description:
      '膝の曲げが不十分で、パワーを十分に活用できていません。準備段階でより深く膝を曲げ、インパクトに向けて伸び上がる動作を意識してください。',
    tips: [
      '準備段階で膝を深く曲げる',
      'インパクトに向けて下半身を使って伸び上がる',
      '膝の曲げ伸ばしでパワーを生み出す',
    ],
  },
  {
    priority: 'low',
    title: 'ラケットヘッドの位置',
    description:
      'バックスイング時のラケットヘッドがやや低い位置にあります。より高い位置からスイングを開始することで、パワーと安定性が向上します。',
    tips: [
      'バックスイング時にラケットヘッドを高く上げる',
      '肩の高さ以上の位置からスイングを開始',
      '上から下への軌道を意識する',
    ],
  },
]

export const mockPracticeVideos: PracticeVideo[] = [
  {
    id: '1',
    title: '体の開き改善ドリル',
    duration: '3:24',
    thumbnail: '/placeholder.svg?height=80&width=120&text=体の開き改善',
    category: 'フォーム改善',
  },
  {
    id: '2',
    title: '膝の使い方基礎',
    duration: '2:45',
    thumbnail: '/placeholder.svg?height=80&width=120&text=膝の使い方',
    category: '基礎練習',
  },
  {
    id: '3',
    title: 'ラケットワーク向上',
    duration: '4:12',
    thumbnail: '/placeholder.svg?height=80&width=120&text=ラケットワーク',
    category: '技術向上',
  },
  {
    id: '4',
    title: 'フォアハンド基礎ドリル',
    duration: '5:30',
    thumbnail: '/placeholder.svg?height=80&width=120&text=フォアハンド基礎',
    category: '基礎練習',
  },
  {
    id: '5',
    title: 'バックハンド安定練習',
    duration: '3:45',
    thumbnail: '/placeholder.svg?height=80&width=120&text=バックハンド安定',
    category: 'フォーム改善',
  },
]

// 現在の解析結果（最新のもの）
export const getCurrentAnalysisResult = (): AnalysisResult => {
  return mockAnalysisHistory[0]
}

// 特定のIDの解析結果を取得
export const getAnalysisResultById = (
  id: string
): AnalysisResult | undefined => {
  return mockAnalysisHistory.find(result => result.id === id)
}

// フィルタリングされた解析履歴を取得
export const getFilteredAnalysisHistory = (
  searchTerm = ''
): AnalysisResult[] => {
  if (!searchTerm) return mockAnalysisHistory

  return mockAnalysisHistory.filter(
    result =>
      result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.date.includes(searchTerm)
  )
}

// スコア推移データ
export const getScoreHistory = () => {
  return mockAnalysisHistory
    .map(result => ({
      date: result.date,
      score: result.score,
    }))
    .reverse()
}
