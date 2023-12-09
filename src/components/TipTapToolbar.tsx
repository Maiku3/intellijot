import { Editor } from '@tiptap/react'
import { Bold } from 'lucide-react'
import React from 'react'

type Props = {
    editor: Editor
}

const TipTapToolbar = ({ editor }: Props) => {
  return (
    <div className='flex flex-wrap gap-3'>
        <button>
            <Bold className='h-6 w-6' strokeWidth={4} />
        </button>
    </div>
  )
}

export default TipTapToolbar