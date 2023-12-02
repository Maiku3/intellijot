'use client';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Loader2, Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {useRouter} from 'next/navigation'

type Props = {}

const NewNoteDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = React.useState('');
  const createNote = useMutation({
    mutationFn: async () => {
      const res = await axios.post('/api/newNote', {
        name: input
      });
      return res.data
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === '') {
      window.alert('Please enter a name for your note.');

      return;
    }
    createNote.mutate(undefined, {
      onSuccess: ({note_id}) => {
        console.log('Successfully created new note:', {note_id});
        router.push(`/notebook/${note_id}`);
      },
      onError: (err) => {
        console.error(err);
        window.alert('An error occurred while creating your note. Please try again.');
      }
    });
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex border-dashed border-2 border-blue-600 h-full rounded-lg items-center justify-center sm:flex-col hover::shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className='h-6 w-6 text-blue-600' strokeWidth={4} />
          <h2 className='font-semibold text-blue-600'>
            New Note
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            New Note
          </DialogTitle>
          <DialogDescription>
            Create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder='Enter new note name...' />
          <div className="h-4"></div>
          <div className="flex items-center gap-3">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600" disabled={createNote.isPending}>
            {createNote.isPending && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create Note
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewNoteDialog