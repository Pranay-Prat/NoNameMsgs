'use client'
import { Message } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessage'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
const dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, isLoading] = useState(false)
  const [isSwitchLoading, setSwitchLoading] = useState(false)
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }
  const {data:session} = useSession()
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema)
  })
  const {register, watch, setValue} = form;
  const acceptMessage = watch("acceptMessage")
  return (
    <div>
        dashboard
    </div>
  )
}

export default dashboard