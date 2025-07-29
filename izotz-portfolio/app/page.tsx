import Link from 'next/link'

export default function Home() {
  return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Choose Your Experience</h1>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/driving"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Driving Experience
          </Link>
          <Link 
            href="/classic"
            className="px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all"
          >
            Classic Portfolio
          </Link>
        </div>
      </div>
    </main>
  )
}