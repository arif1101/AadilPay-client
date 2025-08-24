/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserCheck, ArrowRightLeft, CircleDollarSign } from "lucide-react"
import { useGetAgentsQuery, useGetTransactionsQuery, useGetUsersQuery, useGetWalletsQuery } from "@/redux/features/admin/admin.api"

export default function AdminOverview() {
  const { data: usersData } = useGetUsersQuery(undefined)
  const { data: agentsData } = useGetAgentsQuery(undefined)
  const { data: txData } = useGetTransactionsQuery(undefined)
  const { data: walletsData } = useGetWalletsQuery(undefined)

  // ✅ derive stats
  const totalUsers = usersData?.data?.length || 0
  const totalAgents = agentsData?.data?.length || 0
  const totalTransactions = txData?.data?.length || 0
  const totalVolume = txData?.data?.reduce((sum: number, tx: any) => sum + tx.amount, 0) || 0
  const totalWalletBalance = walletsData?.data?.reduce((sum: number, w: any) => sum + (w.balance || 0), 0) || 0

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* 🔹 Part 1: Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Wallet Balance</CardTitle>
            <CircleDollarSign className="h-6 w-6 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalWalletBalance} BDT</p>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Transaction Volume</CardTitle>
            <ArrowRightLeft className="h-6 w-6 text-purple-500" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalVolume} BDT</p>
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Part 2: Tabs for Details */}
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card className="shadow-lg rounded-2xl border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
                <p className="text-sm text-gray-500">Overview of registered users</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{totalUsers}</span>
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
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
                        {/* Avatar + Name */}
                        <td className="px-4 py-2 flex items-center gap-2">
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                            {u.name.charAt(0)}
                          </div>
                          <span>{u.name}</span>
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-2 text-gray-700">{u.phone}</td>

                        {/* Status */}
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
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

              {/* Link to more */}
              <div className="text-right mt-3">
                <a
                  href="/admin/users"
                  className="text-sm text-blue-600 hover:underline"
                >
                  View all users →
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        {/* Agents Tab */}
        <TabsContent value="agents">
          <Card className="shadow-lg rounded-2xl border border-gray-100">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-lg font-semibold">Total Agents</CardTitle>
                <p className="text-sm text-gray-500">Overview of registered agents</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{totalAgents}</span>
                <UserCheck className="h-6 w-6 text-green-500" />
              </div>
            </CardHeader>

            <CardContent>
              <div className="rounded-md border border-gray-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Name</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Phone</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Account</th>
                      <th className="px-4 py-2 text-left font-medium text-gray-600">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentsData?.data?.slice(0, 5).map((a: any, idx: number) => (
                      <tr
                        key={a._id}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        {/* Avatar + Name */}
                        <td className="px-4 py-2 flex items-center gap-2">
                          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold">
                            {a.name.charAt(0)}
                          </div>
                          <span>{a.name}</span>
                        </td>

                        {/* Phone */}
                        <td className="px-4 py-2 text-gray-700">{a.phone}</td>

                        {/* Account Status */}
                        <td className="px-4 py-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              a.accountStatus === "APPROVED"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                          >
                            {a.accountStatus}
                          </span>
                        </td>

                        {/* Active/Inactive Status */}
                        <td className="px-4 py-2">
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

              {/* Link to more */}
              <div className="text-right mt-3">
                <a
                  href="/admin/agents"
                  className="text-sm text-green-600 hover:underline"
                >
                  View all agents →
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
<TabsContent value="transactions">
  <Card className="shadow-lg rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50">
    <CardHeader className="flex flex-row justify-between items-center border-b pb-3">
      <div>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Transactions Overview
        </CardTitle>
        <p className="text-sm text-gray-500">
          Last {txData?.data?.length || 0} transactions recorded
        </p>
      </div>
      <div className="p-2 rounded-full bg-purple-100">
        <ArrowRightLeft className="h-6 w-6 text-purple-600" />
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
                    ? "bg-blue-100 text-blue-600"
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
            <p className="text-sm font-semibold text-gray-800">
              {tx.amount} BDT
            </p>
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
