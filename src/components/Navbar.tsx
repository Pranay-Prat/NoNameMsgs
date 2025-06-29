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
    <nav>
      <div>
        <a href="/" className="text-2xl font-bold">No-Name-Msgs</a>
        {
          session ? (
            <>
              <span>Welcome, {user?.username || user?.email}</span>
              <Button variant="destructive" onClick={() => signOut()}>Sign out</Button>
            </>
          ) : (
            <Link href="/signin">
              <Button>Sign in</Button>
            </Link>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
