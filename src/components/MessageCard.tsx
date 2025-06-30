'use client'
import React from 'react'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { X } from 'lucide-react'
import { Message } from '@/model/User'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { motion } from 'framer-motion'

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
}

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      if (response.status === 200) {
        toast.success("Message deleted successfully")
        const messageId = message._id as string
        onMessageDelete(messageId)
      } else {
        toast.error("Failed to delete message")
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error deleting message:", error)
      toast.error(axiosError.response?.data.message || "An error occurred while deleting the message")
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative min-h-[140px] flex flex-col justify-between p-3">
        <CardHeader className="p-0">
          <CardTitle className="text-base">{message.content}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 p-0" />

        <CardFooter className="flex items-center justify-between p-0 mt-2">
          <span className="text-xs text-muted-foreground">
            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="destructive">
                <X className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the message and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default MessageCard
