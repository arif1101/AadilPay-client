import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, Wallet } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          About <span className="text-orange-600">Smart Wallet</span>
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Empowering millions with secure, fast, and reliable digital transactions.  
          Inspired by bKash’s simplicity, designed for the future of money.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-6 py-12">
        {[
          {
            title: "Our Mission",
            desc: "To make digital payments seamless, inclusive, and accessible to everyone in Bangladesh.",
            icon: <Wallet className="w-10 h-10 text-orange-600" />,
          },
          {
            title: "Our Vision",
            desc: "To build a cashless society where every transaction is just one tap away.",
            icon: <ShieldCheck className="w-10 h-10 text-orange-600" />,
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Card className="p-6 shadow-md hover:shadow-xl transition rounded-2xl">
              <CardContent className="flex flex-col items-center text-center space-y-4">
                {item.icon}
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="bg-orange-600 text-white py-16 mt-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 text-center gap-6">
          <div>
            <h3 className="text-4xl font-bold">1M+</h3>
            <p>Active Users</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">5,000+</h3>
            <p>Agents Nationwide</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">99.9%</h3>
            <p>Transaction Success Rate</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-20">
        <h2 className="text-3xl font-bold mb-6">Ready to experience the future of payments?</h2>
        <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
          Get Started
        </Button>
      </section>
    </div>
  )
}
