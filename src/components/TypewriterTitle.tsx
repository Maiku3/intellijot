"use client";
import React from 'react'
import TypeWriter from 'typewriter-effect'

type Props = {}

const TypewriterTitle = (props: Props) => {
  return (
    <TypeWriter
      options={{
        strings: ['Powered by AI', 'Maximize Output', 'Unlocking Potential', 'Unleashing Productivity!'],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  )
}

export default TypewriterTitle