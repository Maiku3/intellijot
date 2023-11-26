import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <>
    <div className='max-w-7xl mx-auto p-10'>
        <div className='h-14'></div>
        <div className='flex justify-between items-center md:flex-row flex-col'>
            <div className='flex items-center'>
                <Link href='/'>
                    <Button className='bg-blue-600'>
                        <ArrowBigLeft className='h-5 w-5 mr-1' />
                        Back
                    </Button>
                </Link>
                <div className='w-4'></div>
                <h1 className='text-3xl font-bold text-gray-800'>My Notes</h1>
                <div className="w-4"></div>
                <UserButton />
            </div>
        </div>
    </div>
    </>
  )
}

export default DashboardPage