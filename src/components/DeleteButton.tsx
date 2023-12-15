'use client'
import React from 'react'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'

type Props = {
    noteId: number
}

const DeleteButton = ({noteId}: Props) => {
    const router = useRouter()
    const deleteNote = useMutation({
        mutationFn: async () => {
            const res = await axios.post('/api/deleteNote', {
                noteId
            })
            return res.data
        }
    })
  return (
    <Button variant={'destructive'} size='sm' disabled={deleteNote.isPending} onClick={()=>{
        const confirm = window.confirm("Are you sure you want to delete this note?")
        if (!confirm) {
            return
        }
        deleteNote.mutate(undefined, {
            onSuccess: () => {
                router.push('/dashboard')
            },
            onError: (err) => {
                console.error(err)
                window.alert('An error occurred while deleting your note. Please try again.')
            }
        })
    }}>
        <Trash2 />
    </Button>
  )
}

export default DeleteButton