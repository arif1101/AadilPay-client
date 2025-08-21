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
import { Link } from "react-router"

// ✅ Validation schema
const formSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number is too short")
    .max(15, "Phone number is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function LoginCard() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 p-4">
      <Card className="w-full max-w-md shadow-xl border border-pink-100 rounded-2xl bg-white">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-500">
            Login with your phone number and password
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
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
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <a
                        href="#"
                        className="text-sm text-pink-600 hover:underline"
                      >
                        Forgot?
                      </a>
                    </div>
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

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white font-semibold rounded-xl shadow-md transition-transform hover:scale-[1.02]"
              >
                Login
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full rounded-xl shadow-sm hover:bg-pink-50 border-pink-200 text-pink-600"
          >
            Login with Google
          </Button>
          <p className="text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-pink-600 font-medium hover:underline">Sign up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
