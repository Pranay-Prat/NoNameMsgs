'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Loader2, RefreshCcw } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import MessageCard from '@/components/MessageCard'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessage'
import { ApiResponse } from '@/types/ApiResponse'

import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
})

const Dashboard = () => {
  const { data: session, status } = useSession()

  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })

  const { register, watch, setValue } = form
  const acceptMessage = watch("acceptMessage")

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
      if (typeof response.data.isAcceptingMessages === "boolean") {
        setValue("acceptMessage", response.data.isAcceptingMessages)
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error(error)
      toast.error(axiosError.response?.data.message || "Failed to fetch accept message status"  )
    } finally {
      setIsSwitchLoading(false)
    }
  }, [setValue])

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])
      if (refresh) {
        toast.success("Messages refreshed successfully")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error("Error fetching messages:", axiosError)
      toast.error(axiosError.response?.data.message ?? "Failed to fetch messages")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!session?.user) return
    fetchAcceptMessage()
    fetchMessages()
  }, [session, fetchAcceptMessage, fetchMessages])

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessage
      })
      setValue('acceptMessage', !acceptMessage)
      toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error("Error updating accept messages:", axiosError)
      toast.error(axiosError.response?.data.message ?? "Failed to update accept messages")
    }
  }

  if (status === "loading") {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-6 w-6 animate-spin" />
      <span className="ml-2">Loading dashboard...</span>
    </div>
  )
}


  if (!session?.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Please log in to view your dashboard.</p>
      </div>
    )
  }

  const username = session.user.username
  const profileUrl = typeof window !== 'undefined'
    ? `${window.location.protocol}//${window.location.host}/u/${username}`
    : ""

  const copyToClipboard = () => {
    if (!profileUrl) return
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        toast.success("Link copied to clipboard")
      })
      .catch((error) => {
        console.error("Failed to copy link:", error)
        toast.error("Failed to copy link")
      })
  }

  return (
    <div className={`${poppins.className} min-h-screen w-full relative bg-black text-white`}>
      {/* Gradient background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Main content */}
      <div className="relative z-10 my-8 mx-4 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="bg-white text-black rounded p-1 w-full mr-2"
            />
            <Button onClick={copyToClipboard}>Copy</Button>
          </div>
        </div>

        <div className="mb-4">
          <Switch
            {...register('acceptMessage')}
            checked={acceptMessage}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
          />
          <span className="ml-2">
            Accept Messages: {acceptMessage ? 'On' : 'Off'}
          </span>
        </div>

        <Separator />

        <Button
          className="mt-4"
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            fetchMessages(true)
          }}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="h-4 w-4 text-black" />
          )}
        </Button>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id as string}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <p>No messages to display.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
