import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Wallet, Shield, Smartphone, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
  <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 text-white dark:from-orange-700 dark:via-orange-800 dark:to-red-700 py-24 px-6 text-center overflow-hidden">
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
      <Button
        size="lg"
        className="bg-white text-orange-600 font-semibold hover:bg-gray-100 dark:bg-gray-800 dark:text-orange-400 dark:hover:bg-gray-700 rounded-xl px-8 py-6 shadow-lg"
      >
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <Button
        size="lg"
        variant="outline"
        className="border-white bg-black text-white hover:bg-white/20 hover:text-white dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-xl px-8 py-6"
      >
        Download App
      </Button>
    </div>

    {/* Hero background elements */}
    <div className="absolute top-0 left-0 w-60 h-60 bg-white/10 dark:bg-gray-700/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-400/20 dark:bg-orange-700/20 rounded-full blur-3xl" />
  </section>

{/* Features Section */}
<section className="py-24 px-6 bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
  <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
    Why Choose <span className="text-orange-600">Our Wallet?</span>
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
        className="p-8 rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl transition relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-100 dark:bg-orange-900/30 rounded-full blur-2xl" />
        <feature.icon className="h-12 w-12 text-orange-600 mb-4" />
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mt-3">{feature.desc}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* Stats Section */}
<section className="relative py-24 px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white dark:from-gray-800 dark:to-gray-900">
  <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
  <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
    {[
      { value: "500K+", label: "Happy Users" },
      { value: "120K+", label: "Active Agents" },
      { value: "1M+", label: "Transactions" },
    ].map((stat, i) => (
      <motion.div key={i} whileHover={{ scale: 1.05 }}>
        <h3 className="text-5xl font-extrabold">{stat.value}</h3>
        <p className="mt-2 opacity-90">{stat.label}</p>
      </motion.div>
    ))}
  </div>
</section>


{/* Pricing Section */}
<section
  id="pricing"
  className="py-24 px-6 bg-white dark:bg-gray-900"
>
  <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
    Wallet Plans <span className="text-orange-600">for Everyone</span>
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[
      { title: "Basic Wallet", price: "50৳", color: "from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-700" },
      { title: "Smart Wallet", price: "150৳", color: "from-orange-200 to-orange-100 dark:from-gray-700 dark:to-gray-600" },
      { title: "Premium Wallet", price: "500৳", color: "from-red-200 to-orange-100 dark:from-gray-700 dark:to-gray-600" },
    ].map((plan, i) => (
      <Card
        key={i}
        className={`bg-gradient-to-br ${plan.color} shadow-lg rounded-3xl`}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
            {plan.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-4xl font-bold text-orange-600">{plan.price}</p>
          <Button className="mt-6 w-full rounded-xl bg-orange-600 hover:bg-orange-700">
            Choose Plan
          </Button>
        </CardContent>
      </Card>
    ))}
  </div>
</section>

{/* Testimonials */}
<section className="py-24 px-6 bg-gradient-to-b from-orange-50 to-white dark:from-gray-800 dark:to-gray-900">
  <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 dark:text-white">
    Loved by <span className="text-orange-600">Thousands</span>
  </h2>
  <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
    {[
      { name: "Rahim, Dhaka", text: "Super fast and easy! I can send money to my family instantly." },
      { name: "Ayesha, Chittagong", text: "Best wallet app! Security and simplicity in one." },
    ].map((t, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.02 }}
        className="p-8 bg-white dark:bg-gray-800 shadow-xl rounded-3xl border-l-4 border-orange-500"
      >
        <p className="text-gray-600 dark:text-gray-300 italic">“{t.text}”</p>
        <p className="mt-4 font-semibold text-orange-600">{t.name}</p>
      </motion.div>
    ))}
  </div>
</section>

{/* CTA Section */}
<section className="relative py-24 px-6 bg-gradient-to-r from-orange-600 via-red-600 to-orange-500 text-white text-center overflow-hidden dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <div className="absolute -top-10 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
  <div className="relative z-10">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
      Ready to experience the future of payments?
    </h2>
    <p className="max-w-2xl mx-auto mb-10 opacity-90">
      Join thousands of users already sending money smarter with our wallet.
    </p>
    <Button
      size="lg"
      className="bg-white text-orange-600 font-semibold hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 rounded-xl px-10 py-6"
    >
      Create Account Now
    </Button>
  </div>
</section>

    </div>
  )
}
