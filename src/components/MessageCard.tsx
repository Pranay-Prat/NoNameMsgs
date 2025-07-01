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
import { motion } from 'framer-motion' // Ensure motion is imported

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
      {/* Reduced padding (p-3 to p-2) and min-height (min-h-[140px] to min-h-[120px]) */}
      <Card className="relative min-h-[120px] flex flex-col justify-between p-2">
        <CardHeader className="p-0">
          {/* Slightly reduced title font size (text-base to text-sm) */}
          <CardTitle className="text-base font-bold">{message.content}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 p-0" />

        <CardFooter className="flex items-center justify-between p-0 mt-2">
          {/* Slightly reduced timestamp font size (text-xs to text-[0.7rem]) */}
          <span className="text-[0.7rem] text-muted-foreground">
            {dayjs(message.createdAt).format('MMM D, YYYY h:mm A')}
          </span>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              {/* Apply motion props directly to the Button for the cross icon */}
              <motion.button
                type="button" // Important: Specify type="button" to prevent form submission if this button is inside a form
             
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-destructive text-destructive-foreground hover:bg-destructive/90 h-8 w-8" // Replicated Button's destructive variant styles
                initial={false} // Prevents initial animation if not desired
                whileHover={{ scale: 1.1, rotate: 90 }} // Scale up and rotate on hover
                whileTap={{ scale: 0.9 }} // Shrink slightly on tap
                transition={{ duration: 0.15 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
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