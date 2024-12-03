import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import BananaGame from '@/components/pages/banana-game/BananaGame'

function page() {
  return (
    <NextUIProvider>
        <BananaGame/>
    </NextUIProvider>
  )
}

export default page
