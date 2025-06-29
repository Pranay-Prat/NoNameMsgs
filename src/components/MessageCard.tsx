'use client'
import React from 'react'
import { toast } from 'sonner'
import dayjs from 'dayjs'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
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
type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;  
}
const MessageCard = ({message , onMessageDelete}: MessageCardProps) => {
    const handleDeleteConfirm = async() => {
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
    <Card>
      <CardHeader>
        <div>
        <CardTitle>Card Title</CardTitle>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X className='w-5 h-5'/></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
        <div className="text-sm">
          {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
        </div>
      </CardHeader>
      <CardContent>
      </CardContent>
    </Card>
  )
}

export default MessageCard