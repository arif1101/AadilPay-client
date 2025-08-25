"use client"

import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import UpdateAdminModal from "@/components/user/UpdateAdminModal"
import { Link } from "react-router"

export default function UserProfile() {
  const { data: userProfile } = useUserInfoQuery(undefined)
  const user = userProfile?.data?.user
  const wallet = userProfile?.data?.wallet
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Info */}
        <Card className="shadow-xl border rounded-2xl">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="size-16">
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-xl">
                {user.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-4">
                <CardTitle className="text-2xl font-semibold">{user.name}</CardTitle>
                <Badge variant="secondary" className="mt-2 text-green-500">
                {user.role}
              </Badge>
              </div>
              <p className="text-muted-foreground text-sm  text-left">{user.phone}</p>
              {
                user?.email && (
                  <p className="text-muted-foreground text-sm  text-left">{user.email}</p>
                )
              }
              <p className="text-xs text-muted-foreground text-left">
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account Status</span>
              <Badge
                variant={user.accountStatus === "APPROVED" ? "default" : "destructive"}
              >
                {user.accountStatus}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profile Status</span>
              <Badge variant="outline">{user.status}</Badge>
            </div>
            <Separator />
            <UpdateAdminModal user={user} />
          </CardContent>
        </Card>

        {/* Wallet Info */}
        <Card className="shadow-xl border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Balance</span>
              <span className="text-3xl font-bold text-primary">
                ৳ {wallet.balance.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Wallet Status</span>
              <Badge variant="outline">{wallet.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commission Rate</span>
              <span className="font-medium">{user.commissionRate}%</span>
            </div>
            <Separator />
            <div className="flex justify-end gap-3">
              <Button variant="outline"><Link to={"/user/transactions"}>View Transactions</Link></Button>
              <Button className="text-white bg-orange-500 hover:bg-orange-600"><Link to={"/user/send-money"}>Send Money</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
