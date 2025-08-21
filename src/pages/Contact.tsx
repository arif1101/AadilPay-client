
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white dark:from-gray-900 dark:to-gray-950">
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white"
        >
          Get in <span className="text-pink-600">Touch</span>
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions, feedback, or need support? We’d love to hear from you.  
          Fill out the form or use the contact details below.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 pb-20">
        
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-md rounded-2xl p-6">
            <CardContent className="space-y-4">
              <Input type="text" placeholder="Your Name" />
              <Input type="email" placeholder="Your Email" />
              <Input type="text" placeholder="Subject" />
              <Textarea placeholder="Your Message" className="min-h-[120px]" />
              <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {[
            {
              icon: <Phone className="w-6 h-6 text-pink-600" />,
              title: "Phone",
              detail: "+880 1XXX-XXXXXX",
            },
            {
              icon: <Mail className="w-6 h-6 text-pink-600" />,
              title: "Email",
              detail: "support@smartwallet.com",
            },
            {
              icon: <MapPin className="w-6 h-6 text-pink-600" />,
              title: "Office",
              detail: "Dhaka, Bangladesh",
            },
          ].map((item, i) => (
            <Card key={i} className="p-6 rounded-2xl shadow hover:shadow-xl transition">
              <CardContent className="flex items-start gap-4">
                {item.icon}
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300">{item.detail}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>

      {/* Optional Map */}
      <div className="w-full h-64 md:h-96">
        <iframe
          className="w-full h-full rounded-t-2xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902777!2d90.3915!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8946f4d21%3A0x6c6f35d!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  )
}
