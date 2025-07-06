export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ja-JP', {
    month: 'short',
    day: 'numeric',
  })
}

export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffInDays === 0) return '今日'
  if (diffInDays === 1) return '昨日'
  if (diffInDays < 7) return `${diffInDays}日前`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}週間前`
  return `${Math.floor(diffInDays / 30)}ヶ月前`
}
