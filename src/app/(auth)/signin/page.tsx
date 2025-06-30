'use client'
import * as z from "zod"
import { signInSchema } from '@/schemas/signInSchema'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoaderCircle } from "lucide-react"

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true)
    const result = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    })
    if (result?.error) {
      console.error("Sign in error:", result.error)
      toast.error(result.error)
      setIsSubmitting(false)
    }
    if (result?.url) {
      toast.success("Signed in successfully")
      router.replace("/dashboard")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center">
      {/* Glowing Radial Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99, 102, 241, 0.25), transparent 70%), #000000",
        }}
      />
      
      {/* Form Card */}
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
            No-Name-Msgs
          </h1>
          <p className="mb-4 text-[#02172B]">Sign in to start getting fun messages</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#02172B]">Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#02172B]">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            New User?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signin
