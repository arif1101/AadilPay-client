/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTransactionQuery } from "@/redux/features/transactions/transaction.api"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function UserTransactions() {
  const { data, isLoading } = useTransactionQuery(undefined)
  const transactions = data?.data || []

  // 👇 States
  const [currentPage, setCurrentPage] = useState(1)
  const [typeFilter, setTypeFilter] = useState("ALL")
  const [dateRange, setDateRange] = useState({ from: "", to: "" })

  const itemsPerPage = 5

  // 👇 Filtering
  const filteredTransactions = transactions.filter((item: any) => {
    const typeMatch = typeFilter === "ALL" || item.type === typeFilter

    const date = new Date(item.createdAt)
    const fromDate = dateRange.from ? new Date(dateRange.from) : null
    const toDate = dateRange.to ? new Date(dateRange.to) : null

    const dateMatch =
      (!fromDate || date >= fromDate) &&
      (!toDate || date <= toDate)

    return typeMatch && dateMatch
  })

  // 👇 Pagination after filtering
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedData = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
<div className="space-y-6">
  {/* Filter Section */}
  <div className="flex flex-wrap gap-6 items-end justify-between bg-white p-4 rounded-2xl shadow-sm border border-orange-200">
    <div>
      <Label className="mb-2 text-orange-600">Type</Label>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-44 border-orange-300 focus:ring-orange-500 focus:border-orange-500">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="CASH_IN">Cash In</SelectItem>
          <SelectItem value="WITHDRAW">Withdraw</SelectItem>
          <SelectItem value="TRANSFER">Transfer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label className="mb-2 text-orange-600">From</Label>
      <Input
        type="date"
        className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
        value={dateRange.from}
        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
      />
    </div>
    <div>
      <Label className="mb-2 text-orange-600">To</Label>
      <Input
        type="date"
        className="border-orange-300 focus:ring-orange-500 focus:border-orange-500"
        value={dateRange.to}
        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
      />
    </div>
  </div>

  {/* Table */}
  <div className="overflow-hidden rounded-2xl shadow-sm border border-orange-200 bg-white">
    <Table>
      <TableHeader className="bg-orange-50">
        <TableRow className="hover:bg-orange-100/40">
          <TableHead className="text-center text-orange-700 font-semibold">User</TableHead>
          <TableHead className="text-center text-orange-700 font-semibold">Receiver</TableHead>
          <TableHead className="text-center text-orange-700 font-semibold">Type</TableHead>
          <TableHead className="text-center text-orange-700 font-semibold">Status</TableHead>
          <TableHead className="text-right text-orange-700 font-semibold">Balance</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          Array.from({ length: itemsPerPage }).map((_, i) => (
            <TableRow key={i} className="border-none">
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-24" /></TableCell>
              <TableCell><Skeleton className="h-4 w-20" /></TableCell>
              <TableCell><Skeleton className="h-4 w-16" /></TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableCell>
            </TableRow>
          ))
        ) : (
          paginatedData.map((item: any) => (
            <TableRow
              key={item._id}
              className="odd:bg-orange-50/30 hover:bg-orange-100/30 border-none transition-colors"
            >
              <TableCell className="py-3 font-medium">{item.user?.name}</TableCell>
              <TableCell className="py-3">{item.receiver?.name}</TableCell>
              <TableCell className="py-3">{item.type}</TableCell>
              <TableCell className="py-3">{item.status}</TableCell>
              <TableCell className="py-3 text-right font-semibold text-orange-600">
                {item.amount}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>

  {/* Pagination */}
  {!isLoading && totalPages > 1 && (
    <Pagination>
      <PaginationContent className="gap-2">
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={`rounded-xl px-3 py-1 border transition ${
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "border-orange-300 text-orange-600 hover:bg-orange-100"
            }`}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }).map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`rounded-xl px-3 py-1 transition ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white shadow-md"
                  : "border border-orange-300 text-orange-600 hover:bg-orange-100"
              }`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            className={`rounded-xl px-3 py-1 border transition ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "border-orange-300 text-orange-600 hover:bg-orange-100"
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )}
</div>

  )
}
