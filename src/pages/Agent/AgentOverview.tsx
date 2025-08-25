/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useTransactionQuery } from "@/redux/features/transactions/transaction.api"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AgentDashboard() {
  const { data: profile } = useUserInfoQuery(undefined)
  const { data: txData } = useTransactionQuery(undefined)

  // const user = profile?.data?.user
  const wallet = profile?.data?.wallet
  const transactions = txData?.data ?? []

  // Summary values
  const cashIn = transactions
    .filter((t: any) => t.type === "CASH_IN")
    .reduce((sum: number, t: any) => sum + t.amount, 0)

  const cashOut = transactions
    .filter((t: any) => t.type === "WITHDRAW")
    .reduce((sum: number, t: any) => sum + t.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-8 space-y-8">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-orange-600">
          Agent Dashboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Manage your wallet, cash in/out, and track transactions
        </p>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg">Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              ৳ {wallet?.balance ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg">Cash In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              ৳ {cashIn}
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition">
          <CardHeader>
            <CardTitle className="text-lg">Cash Out</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-600">
              ৳ {cashOut}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50">
                  <TableHead>User</TableHead>
                  <TableHead>Receiver</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.slice(0, 5).map((tx: any, i: number) => (
                    <TableRow
                      key={tx._id}
                      className={i % 2 === 0 ? "bg-white" : "bg-orange-50/30"}
                    >
                      <TableCell>{tx.user?.name ?? "N/A"}</TableCell>
                      <TableCell>{tx.receiver?.name ?? "N/A"}</TableCell>
                      <TableCell>
                        <Badge
                          className="capitalize"
                          variant={tx.type === "CASH_IN" ? "default" : "destructive"}
                        >
                          {tx.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className="capitalize border-orange-500 text-orange-600"
                          variant={tx.status === "success" ? "outline" : "secondary"}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ৳ {tx.amount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
