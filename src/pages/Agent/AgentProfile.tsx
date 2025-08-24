"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { ShieldCheck, Smartphone, User, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// schemas
const infoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(11, "Phone number must be valid"),
})

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function AgentProfile() {

  const { data: agentInfo } = useUserInfoQuery(undefined)
  const user = agentInfo?.data?.user
  const wallet = agentInfo?.data?.wallet

  // forms
  const infoForm = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: { name: "", phone: "" },
  })
  const passForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Agent Profile</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="update">Update Info</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        {/* Profile Info */}
        <TabsContent value="profile">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <p>
                    <strong>Name:</strong> {user?.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  <p>
                    <strong>Phone:</strong> {user?.phone}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-purple-500" />
                  <p>
                    <strong>Account Status:</strong>{" "}
                    <Badge
                      variant={
                        user?.accountStatus === "APPROVED"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {user?.accountStatus}
                    </Badge>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                  <p>
                    <strong>Role:</strong> {user?.role}
                  </p>
                </div>
              </div>

              {/* Wallet Info */}
              <div className="mt-4 p-4 border rounded-lg bg-gray-50 flex items-center gap-3">
                <Wallet className="h-6 w-6 text-emerald-600" />
                <div>
                  <p className="text-lg font-semibold">
                    Wallet Balance: {wallet?.balance} BDT
                  </p>
                  <Badge
                    variant={
                      wallet?.status === "ACTIVE" ? "outline" : "destructive"
                    }
                  >
                    {wallet?.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Update Profile */}
        <TabsContent value="update">
          <Card>
            <CardHeader>
              <CardTitle>Update Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...infoForm}>
                <form
                  onSubmit={infoForm.handleSubmit((v) =>
                    console.log("Update Info:", v)
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={infoForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={infoForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="017xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Save Changes</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Change Password */}
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...passForm}>
                <form
                  onSubmit={passForm.handleSubmit((v) =>
                    console.log("Password Change:", v)
                  )}
                  className="space-y-4"
                >
                  <FormField
                    control={passForm.control}
                    name="oldPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Password</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
