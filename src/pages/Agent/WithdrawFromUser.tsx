/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Phone, DollarSign, Send } from "lucide-react"
import { useCashOutFromUserMutation } from "@/redux/features/agent/agent.api"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner"

// Validation schema
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const cashOutInfo = {
      userPhone: data.phone,
      amount: data.amount,
    }

    try {
      const result = await cashOutFromUser(cashOutInfo).unwrap()
      console.log(result)
      toast.success("Cash-Out successful")
    } catch (error: any) {
      toast.error(error?.data?.message || "Cash-Out failed")
    }
  }

  return (
    <div className="w-full mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold">Cash-Out from User</h1>
        <p className="text-sm opacity-90 mt-2">
          Securely withdraw money from a user account
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* Left: Form Section */}
        <div className="w-full lg:w-[60%] bg-white shadow-md rounded-2xl px-8 py-6 border border-orange-100">
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
                        <Phone className="absolute left-2 top-3 h-4 w-4  text-orange-500" />
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          className="pl-8 border-orange-300 focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </FormControl>
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
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="pl-8 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl py-2 text-lg shadow-sm transition-all duration-200"
              >
                <Send className="h-5 w-5" />
                Cash-Out from User
              </Button>
            </form>
          </Form>
        </div>

        {/* Right: FAQ Section */}
        <div className="w-full lg:w-[40%] bg-white shadow-md px-6 py-5 rounded-2xl border border-orange-100">
          <h2 className="text-2xl font-semibold mb-4">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full space-y-2">
            <AccordionItem value="q1" className="border-b border-orange-100">
              <AccordionTrigger className="text-orange-600 font-medium">
                What is the minimum cash out amount?
              </AccordionTrigger>
              <AccordionContent>
                The minimum cash out amount is <strong>1</strong>.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q2" className="border-b border-orange-100">
              <AccordionTrigger className="text-orange-600 font-medium">
                How long does it take to process?
              </AccordionTrigger>
              <AccordionContent>
                Cash outs are usually processed{" "}
                <strong>instantly</strong>, but may take up to a few minutes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="q3" className="border-b border-orange-100">
              <AccordionTrigger className="text-orange-600 font-medium">
                Are there any fees?
              </AccordionTrigger>
              <AccordionContent>
                A small transaction fee may apply depending on the amount.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
