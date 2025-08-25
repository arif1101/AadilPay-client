/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
import { useTransferMutation } from "@/redux/features/user/user.api"
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

export function SendMoney() {
  const [transfer] = useTransferMutation()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const transferInfo = {
      receiverNumber: data.phone,
      amount: data.amount,
    }

    try {
      const result = await transfer(transferInfo).unwrap()
      console.log(result)
      toast.success("Money sent successfully!")
    } catch (err: unknown) {
      // Safely extract error message from RTK Query
      let errorMessage = "Something went wrong"

      if (err && typeof err === "object" && "data" in err && err.data && typeof (err.data as any).message === "string") {
        errorMessage = (err.data as any).message
      }

      // Field-specific errors
      if (errorMessage.toLowerCase().includes("phone") || errorMessage.toLowerCase().includes("number")) {
        form.setError("phone", { type: "server", message: errorMessage })
      } else if (errorMessage.toLowerCase().includes("amount") || errorMessage.toLowerCase().includes("insufficient")) {
        form.setError("amount", { type: "server", message: errorMessage })
      } else {
        // Root-level error for general issues
        form.setError("root", { type: "server", message: errorMessage })
      }
    }
  }

  return (
    <div className="max-w-5xl w-full mx-auto p-6 gap-8 flex justify-between">
      {/* Left: Send Money Form */}
      <div className="w-3/5">
        <h1 className="text-3xl font-bold mb-6">Send Money</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receiver Phone</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Enter phone number" {...field} className="pl-8" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Root-level error display */}
            {form.formState.errors.root && (
              <p className="text-red-500 text-sm">{form.formState.errors.root.message}</p>
            )}

            <Button type="submit" className="w-full flex items-center gap-2 bg-orange-500">
              <Send className="h-4 w-4"/>
              Send Money
            </Button>
          </form>
        </Form>
      </div>

      {/* Right: FAQ */}
      <div className="w-[30%]">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>What is the minimum send amount?</AccordionTrigger>
            <AccordionContent>
              The minimum amount you can send is <strong>1</strong>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How long does sending money take?</AccordionTrigger>
            <AccordionContent>
              Transfers are usually processed <strong>instantly</strong>, but may take a few minutes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Are there any charges?</AccordionTrigger>
            <AccordionContent>
              A small transaction fee may apply depending on the amount.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
