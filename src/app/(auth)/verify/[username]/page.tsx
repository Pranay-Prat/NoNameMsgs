'use client'
import { verifySchema } from '@/schemas/verifySchema'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
const VerifyAccount = () => {
  const router = useRouter()
  const params = useParams<{username:string}>()
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    
  })
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    //Write logic for resending of verification code

    try {
       const response =  await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code
       })
        toast.success(response.data.message) 
        router.replace(`signin`)
    } catch (error) {
        console.error("Error during verification:", error)
        const axiosError = error as AxiosError<ApiResponse>
        toast.error("An error occurred while verifying your account.")
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
            <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join No-Name-Msgs</h1>
          <p className="mb-4">Verify Your Account</p>
          <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="Code" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
        </div>

        </div>
        
    </div>
  )
}

export default VerifyAccount