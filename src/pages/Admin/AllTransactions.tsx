/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGetTransactionsQuery } from "@/redux/features/admin/admin.api"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

export default function AllTransactions() {
  const [search, setSearch] = useState("")
const [status, setStatus] = useState("all")
const [type, setType] = useState("all")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [page, setPage] = useState(1)

  const { data: transactionsData, isLoading } = useGetTransactionsQuery(undefined)
  const allTransactions = transactionsData?.data ?? []

  // Filtering
  const filtered = allTransactions.filter((tx: any) => {
    return (
      (search
        ? tx.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
          tx.receiver?.name?.toLowerCase().includes(search.toLowerCase())
        : true) &&
      (status !== "all" ? tx.status === status : true) &&
      (type !== "all" ? tx.type === type : true) &&
      (minAmount ? tx.amount >= parseFloat(minAmount) : true) &&
      (maxAmount ? tx.amount <= parseFloat(maxAmount) : true)
    )
  })

  console.log(filtered)


  // Pagination
  const pageSize = 10
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(filtered.length / pageSize)

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        Transactions{" "}
        <span className="text-gray-500 text-lg">
          ({allTransactions.length})
        </span>
      </h1>

      {/* Filters */}
      <Card className="shadow-lg border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg text-orange-600">
            Filter Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <Input
              placeholder="Search by user/receiver..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">✅ Success</SelectItem>
                <SelectItem value="failed">❌ Failed</SelectItem>
                <SelectItem value="pending">⏳ Pending</SelectItem>
              </SelectContent>
            </Select>

            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="TRANSFER">Transfer</SelectItem>
                <SelectItem value="DEPOSIT">Deposit</SelectItem>
                <SelectItem value="WITHDRAW">Withdraw</SelectItem>
              </SelectContent>
            </Select>


            <Input
              type="number"
              placeholder="Min Amount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />

            <Input
              type="number"
              placeholder="Max Amount"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-orange-600">
            Transactions List
          </CardTitle>
        </CardHeader>
        { isLoading ? (
        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                <TableCell><Skeleton className="h-4 w-14" /></TableCell>
                <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                <TableCell><Skeleton className="h-4 w-28" /></TableCell>
              </TableRow>
            ))
          ) : paginated.length > 0 ? (
            paginated.map((tx: any) => (
              <TableRow key={tx._id} className="hover:bg-orange-50 transition">
                <TableCell className="text-gray-500">{tx._id.slice(-6)}</TableCell>
                <TableCell className="font-medium">{tx.type}</TableCell>
                <TableCell
                  className={`font-semibold ${
                    tx.status === "success"
                      ? "text-green-600"
                      : tx.status === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {tx.status.toUpperCase()}
                </TableCell>
                <TableCell className="font-semibold text-orange-600">
                  ${tx.amount}
                </TableCell>
                <TableCell>
                  <p className="font-medium">{tx.user?.name}</p>
                  <p className="text-xs text-gray-500">{tx.user?.phone}</p>
                </TableCell>
                <TableCell>
                  <p className="font-medium">{tx.receiver?.name}</p>
                  <p className="text-xs text-gray-500">{tx.receiver?.phone}</p>
                </TableCell>
                <TableCell>{new Date(tx.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-400">
                No transactions found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        ) : (
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-50">
                <TableHead>Txn ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Receiver</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((tx: any) => (
                <TableRow
                  key={tx._id}
                  className="hover:bg-orange-50 transition"
                >
                  <TableCell className="text-gray-500">
                    {tx._id.slice(-6)}
                  </TableCell>
                  <TableCell className="font-medium">{tx.type}</TableCell>
                  <TableCell
                    className={`font-semibold ${
                      tx.status === "success"
                        ? "text-green-600"
                        : tx.status === "failed"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {tx.status.toUpperCase()}
                  </TableCell>
                  <TableCell className="font-semibold text-orange-600">
                    ${tx.amount}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{tx.user?.name}</p>
                    <p className="text-xs text-gray-500">{tx.user?.phone}</p>
                  </TableCell>
                  <TableCell>
                    <p className="font-medium">{tx.receiver?.name}</p>
                    <p className="text-xs text-gray-500">
                      {tx.receiver?.phone}
                    </p>
                  </TableCell>
                  <TableCell>
                    {new Date(tx.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        )
        }

      </Card>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="border-orange-300 text-orange-600"
        >
          Prev
        </Button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="border-orange-300 text-orange-600"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
