
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
import { useCashOutMutation } from "@/redux/features/user/user.api"
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

export function CashOut() {

  const [cashOut] = useCashOutMutation()
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      amount: 0,
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>)=>{

    const cashOutInfo = {
      agentNumber : data.phone,
      amount: data.amount
    }

    try{
      const result = await cashOut(cashOutInfo).unwrap()
      console.log(result)
      toast.success("Cash out successful!");
    }catch(error){
      const errorMessage = (error as { data?: { message?: string } })?.data?.message || "Something went wrong";

      if (errorMessage.toLowerCase().includes("phone")) {
        form.setError("phone", { type: "server", message: errorMessage });
      } else if (errorMessage.toLowerCase().includes("amount")) {
        form.setError("amount", { type: "server", message: errorMessage });
      } else {
        // General errors like "Insufficient balance"
        form.setError("root", { type: "server", message: errorMessage });
      }
    }

  }

  return (
    <div className="max-w-5xl w-full mx-auto p-6  gap-8 flex justify-between ">
      {/* Left: Cash Out Form */}
      <div className=" w-3/5">
        <h1 className="text-3xl font-bold mb-6">Cash Out</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Number</FormLabel>
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            {form.formState.errors.root && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button type="submit" className="w-full flex items-center gap-2 bg-orange-500 hover:bg-orange-600">
              <Send className="h-4 w-4" />
              Cash Out
            </Button>
          </form>
        </Form>
      </div>

      {/* Right: FAQ Section */}
      <div className="w-[30%]">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="q1">
            <AccordionTrigger>What is the minimum cash out amount?</AccordionTrigger>
            <AccordionContent>
              The minimum cash out amount is <strong>1</strong>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How long does it take to process?</AccordionTrigger>
            <AccordionContent>
              Cash outs are usually processed <strong>instantly</strong>, but may take up to a few minutes.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Are there any fees?</AccordionTrigger>
            <AccordionContent>
              A small transaction fee may apply depending on the amount.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
