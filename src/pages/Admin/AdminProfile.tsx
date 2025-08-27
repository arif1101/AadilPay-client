/* eslint-disable @typescript-eslint/no-explicit-any */

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

      await updateAdmin(payload).unwrap()
      toast.success("Profile updated successfully")
      refetch()
      reset({ ...values, password: "" })
    } catch (e: any) {
      if (e?.data?.message?.toLowerCase().includes("phone")) {
        toast.error("Phone number already exists. Try another one.")
      } else {
        toast.error(e?.data?.message || "Update failed")
      }
    }
  }
  
  useEffect(() => {
    refetch()
  }, [])


  if (isLoading) {
    return (
      <div className="w-full mx-auto p-8">
        <Card className="animate-pulse rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Loading profile…</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="h-4 w-40 bg-muted rounded" />
            <div className="h-4 w-64 bg-muted rounded" />
            <div className="h-4 w-52 bg-muted rounded" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isError) {
    return (
      // toast.success("login again"),
      // navigate("/login")
      <div className="max-w-4xl mx-auto p-8">
        <Card className="rounded-2xl shadow-md border-red-300">
          <CardHeader>
            <CardTitle className="text-red-600">Admin Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-500">Failed to load admin info.</p>
            <h1 className="text-xl font-semibold text-red-600">
              Changed number. Please login again.
            </h1>
            <Link
              to="/login"
              className="inline-block mt-3 text-orange-600 hover:underline"
            >
              Retry
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto md:p-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-orange-50 dark:bg-gray-800 rounded-xl p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg dark:data-[state=active]:bg-orange-400 dark:data-[state=active]:text-gray-900"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="edit"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-lg dark:data-[state=active]:bg-orange-400 dark:data-[state=active]:text-gray-900"
          >
            Update Profile
          </TabsTrigger>
        </TabsList>


        {/* Overview */}
        <TabsContent value="overview" className="mt-6">
          <Card className="rounded-2xl shadow-md border border-orange-100">
            <CardHeader className="bg-orange-50 rounded-t-2xl">
              <CardTitle className="text-orange-600 text-2xl">Admin Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <InfoRow label="Name" value={admin?.name} />
                <InfoRow label="Email" value={admin?.email || "—"} />
                <InfoRow label="Phone" value={admin?.phone} />
                <InfoRow label="Role" value={<Badge variant="secondary">{admin?.role || "ADMIN"}</Badge>} />
                <InfoRow label="Account Status" value={<Badge>{admin?.accountStatus || "APPROVED"}</Badge>} />
                <InfoRow
                  label="System Status"
                  value={
                    <Badge
                      className={
                        admin?.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {admin?.status || "ACTIVE"}
                    </Badge>
                  }
                />
                <InfoRow label="Created At" value={admin?.createdAt ? new Date(admin.createdAt).toLocaleString() : "—"} />
                <InfoRow label="Updated At" value={admin?.updatedAt ? new Date(admin.updatedAt).toLocaleString() : "—"} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Edit */}
        <TabsContent value="edit" className="mt-6">
          <Card className="rounded-2xl shadow-md border border-orange-100">
            <CardHeader className="bg-orange-50 rounded-t-2xl">
              <CardTitle className="text-orange-600 text-2xl">Update Account</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-6">
                  <FormField id="name" label="Name" register={register("name")} placeholder="Enter name" />
                  <FormField id="email" type="email" label="Email" register={register("email")} placeholder="Enter email" />
                  <FormField id="phone" label="Phone" register={register("phone")} placeholder="Enter phone" />
                  <FormField id="password" type="password" label="New Password (optional)" register={register("password")} placeholder="••••••••" />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                  >
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
                    className="rounded-lg"
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

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? "—"}</p>
    </div>
  )
}

function FormField({
  id,
  label,
  register,
  placeholder,
  type = "text",
}: {
  id: string
  label: string
  register: any
  placeholder: string
  type?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} {...register} placeholder={placeholder} className="rounded-lg" />
    </div>
  )
}
