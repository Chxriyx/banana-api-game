import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import Home from '@/components/pages/play/Home'

function page() {
  return (
    <NextUIProvider>
      <Home/>
    </NextUIProvider>
  )
}

export default page
