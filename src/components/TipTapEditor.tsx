'use client';
import React from 'react'
import {Editor, EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import TipTapToolbar from './TipTapToolbar';
import { Button } from './ui/button';
import { useDebounce } from '@/lib/useDebounce';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { NoteType } from '@/lib/db/schema';

type Props = {note: NoteType}

const TipTapEditor = ({ note }: Props) => {
    const [editorState, setEditorState] = React.useState('');
    const saveNote = useMutation({
        mutationFn: async() => {
            const response = await axios.post('/api/saveNote', {noteId: note.id, editorState});
            return response.data;
        }
    
    })
    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit],
        content: editorState,
        onUpdate: ({editor}) => {
            setEditorState(editor.getHTML());
        },
    });

    const debouncedEditorState = useDebounce(editorState, 500);
    React.useEffect(() => {
        // Save Note to DB
        if (debouncedEditorState === '') {
            return;
        }
        saveNote.mutate(undefined, {
            onSuccess: (data) => {
                console.log('data', data);
            },
            onError: (error) => {
                console.log('error', error);
            }
        
        });
        console.log('debouncedEditorState', debouncedEditorState);
    }, [debouncedEditorState]);

  return (
    <>
        <div className="flex">
            {editor && <TipTapToolbar editor={editor} />}
            <Button disabled variant={'outline'} className='bg-blue-600' size='sm'>
                {saveNote.isPending ? 'Saving...' : 'Saved'}
            </Button>
        </div>
        <div className='prose'>
            <EditorContent editor={editor} />
        </div>
    </>
  )
}

export default TipTapEditor