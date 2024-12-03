import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import LeaderBoard from '@/components/pages/leader-board/LeaderBoard'

function page() {
  return (
    <NextUIProvider>
        <LeaderBoard/>
    </NextUIProvider>
  )
}

export default page
