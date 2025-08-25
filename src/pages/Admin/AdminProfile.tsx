/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useGetAdminQuery, useUpdateAdminMutation } from "@/redux/features/admin/admin.api"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router"

type FormValues = {
  name: string
  email: string
  phone: string
  password?: string
}

export default function AdminProfile() {
  const { data: adminInfo, isLoading, isError, refetch } = useGetAdminQuery(undefined)
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation()

  // support both {data: {...}} or direct object
  const admin = adminInfo?.data ?? adminInfo ?? {}

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: admin?.name || "",
      email: admin?.email || "",
      phone: admin?.phone || "",
      password: "",
    },
  })

  useEffect(() => {
    if (admin?.name) {
      reset({
        name: admin.name || "",
        email: admin.email || "",
        phone: admin.phone || "",
        password: "",
      })
    }
  }, [admin, reset])

const onSubmit = async (values: FormValues) => {
  try {
    const payload: Partial<FormValues> = {}
    if (values.name && values.name !== admin.name) payload.name = values.name
    if (values.email && values.email !== admin.email) payload.email = values.email
    if (values.phone && values.phone !== admin.phone) payload.phone = values.phone
    if (values.password) payload.password = values.password

    if (Object.keys(payload).length === 0) {
      toast.info("Nothing to update")
      return
    }

    const res = await updateAdmin(payload).unwrap()

    toast.success("Profile updated successfully")

    // only refetch if update succeeded
    refetch()

    // reset form with new values (keep password blank)
    reset({ ...values, password: "" })
  } catch (e: any) {
    // ✅ if phone is duplicate, show better message
    if (e?.data?.message?.toLowerCase().includes("phone")) {
      toast.error("Phone number already exists. Try another one.")
    } else {
      toast.error(e?.data?.message || "Update failed")
    }
  }
}


  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <Card className="animate-pulse">
          <CardHeader>
            <CardTitle>Loading admin profile…</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-5 w-40 bg-muted rounded mb-3" />
            <div className="h-5 w-64 bg-muted rounded mb-3" />
            <div className="h-5 w-52 bg-muted rounded" />
          </CardContent>
        </Card>
      </div>
    )
  }

if (isError) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">Failed to load admin info.</p>
          <h1 className="text-xl text-destructive">changed Number please Login-in again</h1>
          <Link to="/login" className="mt-3">Retry</Link>
        </CardContent>
      </Card>
    </div>
  )
}


  return (
    <div className=" w-full mx-auto p-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="edit">Update Profile</TabsTrigger>
        </TabsList>

        {/* Overview */}
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow label="Name" value={admin?.name} />
                <InfoRow label="Email" value={admin?.email || "—"} />
                <InfoRow label="Phone" value={admin?.phone} />
                <InfoRow label="Role" value={<Badge variant="secondary">{admin?.role || "ADMIN"}</Badge>} />
                <InfoRow label="Account Status" value={<Badge>{admin?.accountStatus || "APPROVED"}</Badge>} />
                <InfoRow label="System Status" value={<Badge variant={admin?.status === "ACTIVE" ? "default" : "destructive"}>{admin?.status || "ACTIVE"}</Badge>} />
                <InfoRow label="Created At" value={admin?.createdAt ? new Date(admin.createdAt).toLocaleString() : "—"} />
                <InfoRow label="Updated At" value={admin?.updatedAt ? new Date(admin.updatedAt).toLocaleString() : "—"} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit */}
        <TabsContent value="edit" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Update Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} placeholder="Enter name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="Enter email" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" {...register("phone")} placeholder="Enter phone" />
                  </div>
                  <div>
                    <Label htmlFor="password">New Password (optional)</Label>
                    <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={isUpdating}>
                    {isUpdating ? "Saving…" : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      reset({
                        name: admin?.name || "",
                        email: admin?.email || "",
                        phone: admin?.phone || "",
                        password: "",
                      })
                    }
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InfoRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? "—"}</p>
    </div>
  )
}
