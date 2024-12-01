import React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import UserName from '@/components/pages/user-name/UserName'

function page() {
  return (
    <NextUIProvider>
        <UserName/>
    </NextUIProvider>
  )
}

export default page
