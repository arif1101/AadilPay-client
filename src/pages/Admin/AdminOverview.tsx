/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, ArrowRightLeft, CircleDollarSign } from "lucide-react"
import { useGetAgentsQuery, useGetTransactionsQuery, useGetUsersQuery, useGetWalletsQuery } from "@/redux/features/admin/admin.api"
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminOverview() {
  const { data: usersData, isLoading : userLoading } = useGetUsersQuery(undefined)
  const { data: agentsData, isLoading : agentLoading } = useGetAgentsQuery(undefined)
  const { data: txData, isLoading : txLoading } = useGetTransactionsQuery(undefined)
  const { data: walletsData , isLoading : walletLoading} = useGetWalletsQuery(undefined)

  // ✅ derive stats
  const totalUsers = usersData?.data?.length || 0
  const totalAgents = agentsData?.data?.length || 0
  const totalTransactions = txData?.data?.length || 0
  const totalVolume = txData?.data?.reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0
  const totalWalletBalance = walletsData?.data?.reduce((sum: number, w: any) => sum + (w.balance || 0), 0) || 0

  return (
<div className="p-6 space-y-8 bg-gray-50 min-h-screen">
  <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>

  {/* 🔹 Part 1: Balance Overview */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card className="shadow-md rounded-2xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gray-800">Total Wallet Balance</CardTitle>
        <CircleDollarSign className="h-6 w-6 text-orange-500" />
      </CardHeader>
      {walletLoading ? (
        <Skeleton className="h-8 w-32 rounded-md mx-auto">loading..</Skeleton>
      ) : (
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">{totalWalletBalance} BDT</p>
        </CardContent>
      )

      }

    </Card>

    <Card className="shadow-md rounded-2xl bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-gray-800">Total Transaction Volume</CardTitle>
        <ArrowRightLeft className="h-6 w-6 text-orange-500" />
      </CardHeader>
      {walletLoading ? (
        <Skeleton className="h-8 w-32 rounded-md mx-auto">loading..</Skeleton>
        ) : (
        <CardContent>
          <p className="text-3xl font-bold text-gray-900">{totalVolume} BDT</p>
        </CardContent>
        )
      }

    </Card>
  </div>

  {/* 🔹 Part 2: Tabs for Details */}
  <Tabs defaultValue="users" className="w-full">
    <TabsList className="grid w-full grid-cols-3 bg-orange-50 rounded-lg p-1">
      <TabsTrigger
        value="users"
        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
      >
        Users
      </TabsTrigger>
      <TabsTrigger
        value="agents"
        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
      >
        Agents
      </TabsTrigger>
      <TabsTrigger
        value="transactions"
        className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-md"
      >
        Transactions
      </TabsTrigger>
    </TabsList>

    {/* Users Tab */}
    <TabsContent value="users">
      <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800 text-left">Total Users</CardTitle>
            <p className="text-sm text-gray-500">Overview of registered users</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">{totalUsers}</span>
            <Users className="h-6 w-6 text-orange-500" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Phone</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {usersData?.data?.slice(0, 5).map((u: any, idx: number) => (
                  <tr
                    key={u._id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold">
                        {u.name.charAt(0)}
                      </div>
                      <span>{u.name}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-left">{u.phone}</td>
                    <td className="px-4 py-2 text-left">
                      <span
                        className={`px-2 py-1  rounded-full text-xs font-medium ${
                          u.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-3">
            <a href="/admin/manage-user" className="text-sm text-orange-600 hover:underline">
              View all users →
            </a>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Agents Tab */}
    <TabsContent value="agents">
      <Card className="shadow-lg rounded-2xl border border-gray-100 bg-white">
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">Total Agents</CardTitle>
            <p className="text-sm text-gray-500">Overview of registered agents</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-600">{totalAgents}</span>
            <UserCheck className="h-6 w-6 text-orange-500" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="rounded-md border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Phone</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Account</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {agentsData?.data?.slice(0, 5).map((a: any, idx: number) => (
                  <tr key={a._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-2 flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 font-semibold">
                        {a.name.charAt(0)}
                      </div>
                      <span>{a.name}</span>
                    </td>
                    <td className="px-4 py-2 text-gray-700 text-left">{a.phone}</td>
                    <td className="px-4 py-2 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.accountStatus === "APPROVED"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {a.accountStatus}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-left">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          a.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-right mt-3">
            <a href="/admin/manage-agent" className="text-sm text-orange-600 hover:underline">
              View all agents →
            </a>
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Transactions Tab */}
    <TabsContent value="transactions">
      <Card className="shadow-lg rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-orange-50">
        <CardHeader className="flex flex-row justify-between items-center border-b pb-3">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Transactions Overview
            </CardTitle>
            <p className="text-sm text-gray-500">
              Last {txData?.data?.length || 0} transactions recorded
            </p>
          </div>
          <div className="p-2 rounded-full bg-orange-100">
            <ArrowRightLeft className="h-6 w-6 text-orange-500" />
          </div>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="mb-4">
            <p className="text-4xl font-bold text-gray-900">{totalTransactions}</p>
            <p className="text-sm text-gray-500">Total Transactions</p>
          </div>
          <div className="space-y-3">
            {txData?.data?.slice(0, 5).map((tx: any) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-3 rounded-xl border hover:shadow-sm transition bg-white"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`p-2 rounded-full ${
                      tx.type === "send-money"
                        ? "bg-orange-100 text-orange-600"
                        : tx.type === "cash-out"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    💸
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-700 capitalize">
                      {tx.type.replace("-", " ")}
                    </p>
                    <p className="text-xs text-gray-500">
                      {tx.user?.name} → {tx.receiver?.name}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">{tx.amount} BDT</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</div>

  )
}
