
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Phone, DollarSign, Send } from "lucide-react"
import { useCashOutFromUserMutation } from "@/redux/features/agent/agent.api"

// Define validation schema
const formSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  amount: z
    .number({ error: "Amount must be a number." })
    .min(1, { message: "Amount must be at least 1." }),
})

export function WithdrawFromUser() {

  const [cashOutFromUser] = useCashOutFromUserMutation()
  console.log()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>)=>{
    console.log("cashout Money Payload:", data)

    const cashOutInfo = {
      userPhone : data.phone,
      amount: data.amount
    }

    const result = await cashOutFromUser(cashOutInfo).unwrap()
    console.log(result)

  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cash-Out from User</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Phone field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Number</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter phone number" {...field} className="pl-8" />
                  </div>
                </FormControl>
                <FormDescription>
                  Enter the phone number of the recipient.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Amount field */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pl-8"
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Minimum transfer amount is 1.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button type="submit" className="w-full flex items-center gap-2">
            <Send className="h-4 w-4" />
            Cash-Out from User
          </Button>
        </form>
      </Form>
    </div>
  )
}
