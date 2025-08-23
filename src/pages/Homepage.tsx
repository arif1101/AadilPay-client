
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Wallet, Shield, Smartphone, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-600 text-white py-24 px-6 text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg"
        >
          Your Money, Your Power
        </motion.h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-90">
          A secure, fast and modern wallet system built for Bangladesh.  
          Send, save, and spend smarter with just one app.
        </p>
        <div className="flex gap-4 justify-center mt-10">
          <Button size="lg" className="bg-white text-pink-600 font-semibold hover:bg-gray-100 rounded-xl px-8 py-6">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 rounded-xl px-8 py-6">
            Download App
          </Button>
        </div>

        {/* Hero background elements */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-400/20 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white to-pink-50">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
          Why Choose <span className="text-pink-600">Our Wallet?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            { icon: Wallet, title: "Instant Transfer", desc: "Send and receive money instantly, anytime, anywhere." },
            { icon: Shield, title: "Bank-Level Security", desc: "Your transactions are encrypted with the highest standards." },
            { icon: Smartphone, title: "User Friendly", desc: "Beautiful, intuitive interface designed for everyone." },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-pink-100 rounded-full blur-2xl" />
              <feature.icon className="h-12 w-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 mt-3">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white">
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <motion.div whileHover={{ scale: 1.05 }}>
            <h3 className="text-5xl font-extrabold">500K+</h3>
            <p className="mt-2 opacity-90">Happy Users</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <h3 className="text-5xl font-extrabold">120K+</h3>
            <p className="mt-2 opacity-90">Active Agents</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }}>
            <h3 className="text-5xl font-extrabold">1M+</h3>
            <p className="mt-2 opacity-90">Transactions</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-16">
          Wallet Plans <span className="text-pink-600">for Everyone</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: "Basic Wallet", price: "50৳", color: "from-pink-100 to-pink-50" },
            { title: "Smart Wallet", price: "150৳", color: "from-pink-200 to-pink-100" },
            { title: "Premium Wallet", price: "500৳", color: "from-fuchsia-200 to-pink-100" },
          ].map((plan, i) => (
            <Card key={i} className={`bg-gradient-to-br ${plan.color} shadow-lg rounded-3xl`}>
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-pink-600">{plan.price}</p>
                <Button className="mt-6 w-full rounded-xl bg-pink-600 hover:bg-pink-700">Choose Plan</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gradient-to-b from-pink-50 to-white">
        <h2 className="text-4xl font-bold text-center mb-16">
          Loved by <span className="text-pink-600">Thousands</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            { name: "Rahim, Dhaka", text: "Super fast and easy! I can send money to my family instantly." },
            { name: "Ayesha, Chittagong", text: "Best wallet app! Security and simplicity in one." },
          ].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-white shadow-xl rounded-3xl border-l-4 border-pink-500"
            >
              <p className="text-gray-600 italic">“{t.text}”</p>
              <p className="mt-4 font-semibold text-pink-600">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-gradient-to-r from-pink-600 via-fuchsia-600 to-rose-500 text-white text-center overflow-hidden">
        <div className="absolute -top-10 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to experience the future of payments?
          </h2>
          <p className="max-w-2xl mx-auto mb-10 opacity-90">
            Join thousands of users already sending money smarter with our wallet.
          </p>
          <Button size="lg" className="bg-white text-pink-600 font-semibold hover:bg-gray-100 rounded-xl px-10 py-6">
            Create Account Now
          </Button>
        </div>
      </section>
    </div>
  )
}
