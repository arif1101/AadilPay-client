import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownCircle, ArrowUpCircle, Send, Wallet } from "lucide-react"
import { Link, useLocation } from "react-router"
import UserTransactions from "@/components/UserTransactions"
import { motion } from "framer-motion"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"

export default function WalletDashboard() {

  const location = useLocation()
  console.log(location)
    const {data : userData} = useUserInfoQuery(undefined)
    const balance = userData?.data?.wallet.balance
    console.log(userData?.data?.wallet.balance)
    
  return (
    <div className="max-w-7xl space-y-10">
      {/* Greeting */}
      <h2 className="text-4xl font-bold tracking-tight">
        Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">{userData?.data?.user?.name}</span>
      </h2>

      <div className="w-full flex flex-col gap-10">
        {/* top: Wallet + Actions */}
        <div className="space-y-8 lg:col-span-1">
          {/* Wallet Card */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Card className="relative bg-gradient-to-br from-pink-500 via-pink-400 to-pink-600 text-white shadow-2xl rounded-3xl overflow-hidden border border-white/20">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Wallet className="h-7 w-7 text-white drop-shadow-lg" /> 
                  Wallet Balance
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-6xl font-extrabold tracking-wide drop-shadow-lg">
                  {balance} ৳
                </p>
                <p className="mt-3 text-white/80 text-sm">Last updated: Just now</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { href: "add-money",icon: <ArrowDownCircle className="h-8 w-8" />, label: "Add Money" },
              { href: "cash-out",icon: <ArrowUpCircle className="h-8 w-8" />, label: "Cash Out" },
              {href: "send-money", icon: <Send className="h-8 w-8" />, label: "Send Money" },
            ].map((action, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 250 }}
              >
                <Link
               to={`/user/${action.href}`}
                  className="flex flex-col items-center justify-center h-28 w-[300px] border-2 rounded-2xl bg-white hover:bg-gradient-to-br from-pink-100 to-pink-200 hover:shadow-xl transition"
                >
                  <div className="p-3 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-md">
                    {action.icon}
                  </div>
                  <span className="text-sm font-semibold mt-2 text-gray-700">
                    {action.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* bottom: Transactions */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="p-8 border rounded-3xl shadow-xl bg-gradient-to-br from-white to-pink-50"
        >
          <div className="flex mb-8 items-center justify-between">
            <h3 className="text-2xl font-semibold text-gray-800">Transaction History</h3>
            <Button 
              className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-md rounded-xl"
            >
              <Link to="/user/transactions">See all</Link>
            </Button>
          </div>
          <UserTransactions />
        </motion.div>
      </div>
    </div>
  )
}
