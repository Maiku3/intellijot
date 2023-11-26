import TypewriterTitle from '@/components/TypewriterTitle'
import { Button } from '@/components/ui/button'
import { ArrowBigRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-gradient-to-r min-h-screen from-blue-100 to-rose-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-6xl text-center">
          Your <span className='text-blue-600 font bold'>Intelligent</span> Note-Taking Companion
        </h1>
        <div className="mt-4"></div>
        <h2 className="font-semibold text-3xl text-center text-slate-700">
          <TypewriterTitle></TypewriterTitle>
        </h2>
        <div className='mt-8'>
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button className="bg-blue-600">
                Dashboard
                <ArrowBigRight className="h-5 w-5 mr-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
