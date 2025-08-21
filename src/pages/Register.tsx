import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// ✅ Validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().min(1, "Please select a role"),
})

export default function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      role: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <Card className="w-full max-w-md shadow-xl border border-pink-100 rounded-2xl bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-500">
            Register with your details to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+8801XXXXXXXXX"
                        className="focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="focus:ring-2 focus:ring-pink-400 focus:border-pink-400 rounded-xl"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400">
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">AGENT</SelectItem>
                          <SelectItem value="admin">USER</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Register Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-pink-400 hover:from-pink-700 hover:to-pink-500 text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-[1.02]"
              >
                Register
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="#" className="text-pink-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
