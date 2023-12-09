'use client';
import React from 'react'
import {Editor, EditorContent, useEditor} from '@tiptap/react'
import {StarterKit} from '@tiptap/starter-kit'
import TipTapToolbar from './TipTapToolbar';
import { Button } from './ui/button';

type Props = {}

const TipTapEditor = (props: Props) => {
    const [editorState, setEditorState] = React.useState('')

    const editor = useEditor({
        autofocus: true,
        extensions: [StarterKit],
        content: editorState,
        onUpdate: ({editor}) => {
            setEditorState(editor.getHTML())
        },
    });
  return (
    <>
        <div className="flex">
            {editor && <TipTapToolbar editor={editor} />}
            <Button className='bg-blue-600' size='sm'>Save</Button>
        </div>
        <div>
            <EditorContent editor={editor} />
        </div>
    </>
  )
}

export default TipTapEditor