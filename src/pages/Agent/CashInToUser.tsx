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
import { useCashInToUserMutation } from "@/redux/features/agent/agent.api"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { toast } from "sonner"

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

export function CashInToUser() {
  const [cashInToUser] = useCashInToUserMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Send Money Payload:", data)

    const cashInInfo = {
      userPhone: data.phone,
      amount: data.amount,
    }

    try {
      const result = await cashInToUser(cashInInfo).unwrap()
      console.log(result)
      toast.success("Cash-In successfully")
    } catch (error: any) {
      toast.error(error?.data?.message || "Cash-In failed")
    }
  }

  return (
    <div className="w-full mx-auto p-6 space-y-8">

      <div className="text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold">Cash-In to User</h1>
        <p className="text-sm opacity-90 mt-2">
          Securely withdraw money from a user account
        </p>
      </div>

      <div className="w-full flex flex-col gap-8 justify-between lg:flex-row">
        {/* Form Section */}
        <div className="w-full lg:w-[60%] bg-white shadow-lg px-8 py-6 rounded-2xl border border-gray-100">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">User Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-2 top-3 h-4 w-4 text-orange-500" />
                        <Input
                          placeholder="Enter phone number"
                          {...field}
                          className="pl-8 border-orange-300 focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Amount field */}
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Amount</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-3 h-4 w-4 text-orange-500" />
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="pl-8 border-orange-300 focus:ring-2 focus:ring-orange-500"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 shadow-md rounded-lg"
              >
                <Send className="h-4 w-4" />
                Cash-In to User
              </Button>
            </form>
          </Form>
        </div>

        {/* FAQ Section */}
        <div className="w-full lg:w-[40%] bg-gray-50 shadow-sm px-6 py-6 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-orange-600 font-medium">
                What is the minimum cash-in amount?
              </AccordionTrigger>
              <AccordionContent>
                The minimum cash-in amount is <strong>1</strong>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-orange-600 font-medium">
                How long does it take to process?
              </AccordionTrigger>
              <AccordionContent>
                Cash-ins are usually processed{" "}
                <strong className="text-green-600">instantly</strong>, but may
                take up to a few minutes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-orange-600 font-medium">
                Are there any fees?
              </AccordionTrigger>
              <AccordionContent>
                A small <strong>transaction fee</strong> may apply depending on
                the amount.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
