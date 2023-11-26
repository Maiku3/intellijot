import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-blue-100 to-rose-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-6xl text-center">
          Your <span className='text-blue-600 font bold'>Intelligent</span> Note-Taking Companion
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          Powered by AI 
        </h2>
      </div>
    </div>
  )
}
