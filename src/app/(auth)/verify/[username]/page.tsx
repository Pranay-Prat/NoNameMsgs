'use client'
import { verifySchema } from '@/schemas/verifySchema'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from "framer-motion"

const VerifyAccount = () => {
  const router = useRouter()
  const params = useParams<{ username: string }>()

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
      })
      toast.success(response.data.message)
      router.replace(`/signin`)
    } catch (error) {
      console.error("Error during verification:", error)
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || "An error occurred while verifying your account.")
    }
  }

  return (
    <div className="min-h-screen w-full relative bg-black flex items-center justify-center">
      {/* Background Glow */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />

      {/* Animated Form Box */}
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-[#F9FAFB] rounded-xl shadow-lg relative z-10"
        initial={{ borderColor: "#F9FAFB", boxShadow: "0 0 0px #01B1CF" }}
        whileHover={{
          borderColor: "#01B1CF",
          boxShadow: "0 0 20px #01B1CF",
          transition: { duration: 0.3 },
        }}
        style={{ borderWidth: "2px", borderStyle: "solid" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-[#02172B]">
            Join No-Name-Msgs
          </h1>
          <p className="mb-4 text-[#02172B]">Verify Your Account</p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#02172B]">Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </Form>
        </div>
      </motion.div>
    </div>
  )
}

export default VerifyAccount
