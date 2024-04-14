'use client'
import { Tuser } from '@/utils/types'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import React from 'react'



const Provider = ({
    children,
    session
}: { children: JSX.Element, session: Session | null & { session: { user: Tuser } } }) => {
    return (
        <SessionProvider session={session}>

            {children}
        </SessionProvider>
    )
}

export default Provider