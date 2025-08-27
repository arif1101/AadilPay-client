/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useUpdateUserMutation } from "@/redux/features/user/user.api"
import { toast } from "sonner"
import { ShieldCheck, Smartphone, User, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// --- Schemas ---
const infoSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
}).refine(
  (data) => data.name || data.email,
  { message: "You must provide either name or email" }
)

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })


export default function AgentProfile() {
  const { data: agentInfo } = useUserInfoQuery(undefined)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const user = agentInfo?.data?.user
  const wallet = agentInfo?.data?.wallet

  // --- Forms ---
  const infoForm = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })

const passForm = useForm<z.infer<typeof passwordSchema>>({
  resolver: zodResolver(passwordSchema),
  defaultValues: { newPassword: "", confirmPassword: "" },
})

  // --- Handlers ---
  const handleInfoSubmit = async (values: z.infer<typeof infoSchema>) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== "" && v !== undefined)
    );
    if (Object.keys(filteredValues).length === 0) {
      toast.error("Please enter at least name or email")
      return;
    }

    try {
      await updateUser(filteredValues).unwrap();
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile");
    }
  };


const handlePasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
  try {
    const payload = { password: values.newPassword }
    const result = await updateUser(payload).unwrap()
    console.log(result)
    passForm.reset()
    toast.success("Password updated successfully")
  } catch (err: any) {
    toast.error(err?.data?.message || "Failed to update password")
  }
}


  return (
    <div className="md:p-8 w-full mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-orange-600">Agent Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your personal details, wallet, and security settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-3 w-full rounded-xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="update">Update Info</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
        </TabsList>

        {/* Profile Info */}
        <TabsContent value="profile">
          <Card className="shadow-md hover:shadow-lg transition rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <p>
                    <strong>Name:</strong> {user?.name}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-blue-500" />
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-green-500" />
                  <p>
                    <strong>Phone:</strong> {user?.phone}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-purple-500" />
                  <p>
                    <strong>Status:</strong>{" "}
                    <Badge
                      className={
                        user?.accountStatus === "APPROVED"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {user?.accountStatus}
                    </Badge>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-orange-500" />
                  <p>
                    <strong>Role:</strong> {user?.role}
                  </p>
                </div>
              </div>

              {/* Wallet Info */}
              <div className="p-5 border rounded-2xl bg-orange-50 flex items-center gap-4">
                <Wallet className="h-6 w-6 text-emerald-600" />
                <div>
                  <p className="text-lg font-semibold text-orange-700">
                    Wallet Balance: {wallet?.balance} BDT
                  </p>
                  <Badge
                    className={
                      wallet?.status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }
                  >
                    {wallet?.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Update Name + Email */}
        <TabsContent value="update">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Update Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...infoForm}>
                <form
                  onSubmit={infoForm.handleSubmit(handleInfoSubmit)}
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Change Password */}
        <TabsContent value="password">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-xl">Change Password</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...passForm}>
                <form
                  onSubmit={passForm.handleSubmit(handlePasswordSubmit)}
                  className="space-y-4"
                >
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
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
