
import Nav from '@/components/Nav'
import Provider from '@/components/Provider'
import '@/styles/globals.css'
import React from 'react'
export const metadata = {
    title: "PromptHub",
    description: "Discover & Share AI Prompts",
}

const RootLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <html>
            <body lang='en'>
                <Provider session={null}>
                    <>
                        <div className="main">
                            <div className="gradient" />
                        </div>

                        <main className="app">
                            <Nav />
                            {children}
                        </main>
                    </>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout