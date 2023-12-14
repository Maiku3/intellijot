import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft } from 'lucide-react'
import { UserButton, auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import NewNoteDialog from '@/components/NewNoteDialog'
import { db } from '@/lib/db'
import { $notes } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { date } from 'drizzle-orm/mysql-core'

type Props = {}

const DashboardPage = async (props: Props) => {
    const {userId} = auth()
    const notes = await db.select().from($notes).where(eq($notes.userId, userId!))
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

        <div className="h-8"></div>
        <Separator />
        <div className="h-8"></div>
        {notes.length == 0 && (
            <div className="text-center">
                <h2 className="text-2xl text-gray-500">No notes at the moment</h2>
            </div>
        )}

        <div className="grid sm:grid-cols-3 md:grid-cols-5 grid-cls-1 gap-3">
            <NewNoteDialog />
            {notes.map(note => {
                return (
                    <a href={`/notes/${note.id}`} key={note.id}>
                        <div className="border border-stone-200 overflow-hidden rounded-lg flex flex-col hover:shadow-xl transition hover:-translate-y-1">
                            <img width={400} height={400} alt={note.name} src={note.imageUrl || ''} className="object-cover" />
                            <div className="p-4">
                                <h3 className='text-lg font-semibold text-gray-800'>{note.name}</h3>
                                <div className="h-1"></div>
                                <p className='text-sm text-gray-400'>
                                    {new Date(note.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </a>
                )
            })}
        </div>
    </div>
    </>
  )
}

export default DashboardPage