'use client'

import dynamic from 'next/dynamic'

// Dynamic import to avoid SSR issues with Three.js
const DrivingScene = dynamic(
  () => import('@/components/DrivingExperience/DrivingScene'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading experience...</div>
      </div>
    )
  }
)

export default function DrivingPortfolio() {
  return (
    <main className="w-full h-screen overflow-hidden bg-black">
      <DrivingScene />
    </main>
  )
}