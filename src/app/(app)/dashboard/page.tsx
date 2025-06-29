'use client'
import MessageCard from '@/components/MessageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessage'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { User } from 'next-auth'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [isSwitchLoading, setisSwitchLoading] = useState(false)
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }
  const {data:session} = useSession()
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })
  const {register, watch, setValue} = form;
  const acceptMessage = watch("acceptMessage")
  const fetchAcceptMessage = useCallback(async() => {
    setisSwitchLoading(true)
    try {
      const response = await axios.get<ApiResponse>('/api/accept-messages')
    if (typeof response.data.isAcceptingMessages === "boolean") {
      setValue("acceptMessage", response.data.isAcceptingMessages);
    }
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error(error)
      toast.error("Failed to accept message")
      
    }finally{
      setisSwitchLoading(false)
    }
  },[setValue])
  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setLoading(true)
    setisSwitchLoading(false)
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
    }finally{
      setLoading(false)
      setisSwitchLoading(false)
    }
  },[setLoading, setMessages])
  useEffect(()=>{
    if(!session || !session.user) {
      return;}
      fetchAcceptMessage()
      fetchMessages()
  },[session, fetchAcceptMessage, fetchMessages, setValue])
  const handleSwitchChange = async ()=>{
    try {
      const response = await axios.post<ApiResponse>('/api/accept-messages', {
        acceptMessages: !acceptMessage  })
        setValue('acceptMessage', !acceptMessage)
      toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      console.error("Error updating accept messages:", axiosError)
      toast.error(axiosError.response?.data.message ?? "Failed to update accept messages")
      
    }
  }
  const {username} = session?.user as User
  const baseUrl = `${window.location.protocol}//${window.location.host}`
  const profileUrl = `${baseUrl}/u/${username}`
  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
      .then(() => {
        toast.success("Link copied to clipboard")
      })
      .catch((error) => {
        console.error("Failed to copy link:", error)
        toast.error("Failed to copy link")
      })
  }
  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Please log in to view your dashboard.</p>
      </div>
    )
  }
  return (
     <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
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
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
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
  )
}

export default Dashboard