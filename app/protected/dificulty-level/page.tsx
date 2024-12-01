import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import DificultyLevel from '@/components/pages/dificulty-level/DificultyLevel'

function page() {
  return (
    <NextUIProvider>
        <DificultyLevel/>
    </NextUIProvider>
  )
}

export default page
