'use client'
import { BuiltInProviderType } from 'next-auth/providers/index'
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  signIn,
  signOut,
  useSession
} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Nav = () => {
  const { data: session } = useSession();


  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null)
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);


  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>PromptHub</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href='/create-prompt'
              className='black_btn'
            >
              Create Post
            </Link>
            <button
              type='button'
              onClick={() => signOut()}
              className='outline_btn'
            >
              Sign Out
            </button>
            <Link href="/profile ">
              <Image
                src={session?.user?.image as string}
                width={37}
                height={37}
                // style={}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {
              providers && Object.values(providers)
                .map((provider: any) => (
                  <button
                    key={provider.name}
                    type='button'
                    onClick={() => signIn(provider.id)}
                    className='black_btn'
                  >
                    Sign In
                  </button>
                ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {
          session?.user ? (
            <div className="flex">
              <Image
                src={session?.user.image as string}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown((prev: boolean) => !prev)}
              />

              {toggleDropdown && (
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/create"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    className="mt-5 w-full black_btn"
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false)
                      signOut()
                    }}
                  >
                    Sing Out
                  </button>
                </div>
              )
              }
            </div>
          ) : (
            <>
              {
                providers && Object.values(providers)
                  .map((provider: any) => (
                    <button
                      key={provider.name}
                      type='button'
                      onClick={() => signIn(provider.id)}
                      className='black_btn'
                    >
                      Sign In
                    </button>
                  ))
              }</>
          )
        }
      </div>
    </nav >
  )
}

export default Nav