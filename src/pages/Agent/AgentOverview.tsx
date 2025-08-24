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

  const user = profile?.data?.user
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-bold">Agent Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">
              ৳ {wallet?.balance ?? 0}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash In</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-green-600">
              ৳ {cashIn}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Out</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-red-600">
              ৳ {cashOut}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map((tx: any) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.user?.name ?? "N/A"}</TableCell>
                    <TableCell>{tx.receiver?.name ?? "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.type === "CASH_IN" ? "default" : "destructive"
                        }
                      >
                        {tx.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.status === "success" ? "outline" : "secondary"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      ৳ {tx.amount}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
