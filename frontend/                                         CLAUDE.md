# TennisForm AI Project Summary

## Project Overview

**TennisForm AI** is a Next.js web application that provides AI-powered tennis form analysis. The application allows users to upload tennis videos and receive detailed form analysis with improvement suggestions.

## Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Development**: ESLint, Turbopack for dev server

## Key Features

1. **Video Upload**: Drag & drop or file selection for tennis videos (MP4, MOV, AVI)
2. **Form Analysis**: AI-powered analysis of tennis technique
3. **Progress Tracking**: Real-time analysis progress visualization
4. **Results Display**: Detailed analysis results with improvement suggestions
5. **History Tracking**: Previous analysis history

## Application Structure

```
├── app/
│   ├── page.tsx           # Landing page with hero section
│   ├── analyze/           # Video upload and analysis page
│   ├── history/           # Analysis history page
│   └── results/           # Analysis results page
├── components/
│   ├── ui/               # Reusable UI components (shadcn/ui)
│   └── analysis-chart.tsx # Chart component for analysis visualization
├── lib/
│   ├── utils.ts          # Utility functions
│   └── mock-data.ts      # Mock data for development
```

## Pages

- **Home (/)**: Landing page with feature overview and CTA
- **Analyze (/analyze)**: Video upload interface with filming tips
- **History (/history)**: Analysis history with loading states
- **Results (/results)**: Analysis results display

## UI Components

- Form elements (Button, Input, Card, Tabs, Progress)
- Analysis visualization components
- Responsive design with mobile support
- Japanese language interface

## Development Setup

- Uses Turbopack for fast development
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for styling

## Current State

The application has a complete UI foundation with mock functionality. The analysis process is simulated with progress indicators, but actual AI analysis backend integration is not yet implemented.

# ルール

- 改修時は、必ずbranchを切ること　例）：feature/#${N} origin はmainで
- 改修後は、動作を担保するためにテストを必ず行うこと
- モックデータは、ハードコーディングせずに必ずファイルを分離すること
- 改修する前に手順を一覧化し、こちら側にレスポンスを要求すること

# 改修依頼一覧

- Frontend
  - 1.Dockerfileセットアップ
    - status: TODO
    - フロントエンドをコンテナ化して立ち上げるためにdockerfileを書いてください
- backend
  - 1.Dockerfileセットアップ
    - status: TODO
    - バックエンドをコンテナ化して立ち上げるためにdockerfileを書いてください
    - バックエンドは、いったんPythonのFlask使う想定でお願いします。
- DB
  - 1.Dockerfileセットアップ
    - status: STOP
    - データベースをコンテナ化して立ち上げるためにdockerfileを書いてください
- common
  - 1. docker-compose作成
    - status: TODO
    - これらすべてを立ち上げるためのコンポーズ書いて
