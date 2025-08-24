/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAgentTransactionsQuery } from "@/redux/features/agent/agent.api"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AgentTransactions() {
  const { data } = useAgentTransactionsQuery(undefined)
  const transactions = data?.data ?? []

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Agent Transactions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User Phone</TableHead>
                <TableHead>Receiver Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((tx: any) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.user?.phone ?? "N/A"}</TableCell>
                    <TableCell>{tx.receiver?.phone ?? "N/A"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          tx.type === "CASH_IN"
                            ? "default"
                            : tx.type === "CASH_OUT" || tx.type === "WITHDRAW"
                            ? "destructive"
                            : "secondary"
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
                    <TableCell>
                      {new Date(tx.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
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
