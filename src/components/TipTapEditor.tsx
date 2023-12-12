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
import {Text} from '@tiptap/extension-text'
import {useCompletion} from 'ai/react'

type Props = {note: NoteType}

const TipTapEditor = ({ note }: Props) => {
    const [editorState, setEditorState] = React.useState(note.editorState || `<h1>${note.name}</h1>`);
    const {complete, completion} = useCompletion({
        api: '/api/completion'
    });
    const saveNote = useMutation({
        mutationFn: async() => {
            const response = await axios.post('/api/saveNote', {noteId: note.id, editorState});
            return response.data;
        }
    });
    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Shift-a': () => {
                    // Input last 40 words into completion
                    const prompt = this.editor.getText().split(' ').slice(-40).join(' ');
                    complete(prompt);
                    return true;
                },
            }
        },
    });
    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit, customText],
        content: editorState,
        onUpdate: ({editor}) => {
            setEditorState(editor.getHTML());
        },
    });
    const lastCompletion = React.useRef('');
    React.useEffect(() => {
        if (!completion || !editor) return;
        const diff = completion.slice(lastCompletion.current.length);
        lastCompletion.current = completion;
        editor.commands.insertContent(diff);
      }, [completion, editor]);

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
    }, [debouncedEditorState]);

  return (
    <>
        <div className="flex">
            {editor && <TipTapToolbar editor={editor} />}
            <Button disabled variant={'outline'} className='bg-blue-600' size='sm'>
                {saveNote.isPending ? 'Saving...' : 'Saved'}
            </Button>
        </div>
        <div className='prose prose-sm w-full mt-3'>
            <EditorContent editor={editor} />
        </div>
        <div className="h-4"></div>
        <span className='text-sm'>
            <span >
                Shortcut: Press <kbd className='px-2 py-1.5 text-xs text-gray-700 font-semibold bg-gray-100 border border-gray-200 rounded-lg'>Shift + A</kbd> to use AI autocomplete
            </span>
        </span>
    </>
  )
}

export default TipTapEditor