'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'

const Navbar = () => {
  const { data: session } = useSession()
  const user: User = session?.user as User

  return (
    <nav className="w-full px-4 md:px-8 py-4 bg-black/50 backdrop-blur-md border-b border-gray-800 z-50 rounded-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          No-Name-Msgs
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4 mt-2 md:mt-0 text-white">
          {session ? (
            <>
              <span className="text-sm text-white">
                Welcome, {user?.username || user?.email}
              </span>
              <Button variant="destructive" size="sm" onClick={() => signOut()}>
                Sign out
              </Button>
            </>
          ) : (
            <Link href="/signin">
              <Button size="sm">Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
