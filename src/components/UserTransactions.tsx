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
  <div className="flex flex-wrap gap-6 items-end justify-between bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-sm border border-orange-200 dark:border-orange-700">
    <div>
      <Label className="mb-2 text-orange-600 dark:text-orange-400">Type</Label>
      <Select value={typeFilter} onValueChange={setTypeFilter}>
        <SelectTrigger className="w-44 border-orange-300 dark:border-orange-600 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400">
          <SelectValue placeholder="Filter by type" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <SelectItem value="ALL">All</SelectItem>
          <SelectItem value="CASH_IN">Cash In</SelectItem>
          <SelectItem value="CASH_OUT">Cash Out</SelectItem>
          <SelectItem value="TRANSFER">Transfer</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label className="mb-2 text-orange-600 dark:text-orange-400">From</Label>
      <Input
        type="date"
        className="border-orange-300 dark:border-orange-600 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        value={dateRange.from}
        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
      />
    </div>

    <div>
      <Label className="mb-2 text-orange-600 dark:text-orange-400">To</Label>
      <Input
        type="date"
        className="border-orange-300 dark:border-orange-600 focus:ring-orange-500 focus:border-orange-500 dark:focus:ring-orange-400 dark:focus:border-orange-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        value={dateRange.to}
        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
      />
    </div>
  </div>


  {/* Table */}
<div className="overflow-hidden rounded-2xl shadow-sm border border-orange-200 dark:border-orange-700 bg-white dark:bg-gray-900">
  <Table>
    <TableHeader className="bg-orange-50 dark:bg-gray-800">
      <TableRow className="hover:bg-orange-100/40 dark:hover:bg-gray-700/50">
        <TableHead className="text-center text-orange-700 dark:text-orange-400 font-semibold">User</TableHead>
        <TableHead className="text-center text-orange-700 dark:text-orange-400 font-semibold">Receiver</TableHead>
        <TableHead className="text-center text-orange-700 dark:text-orange-400 font-semibold">Type</TableHead>
        <TableHead className="text-center text-orange-700 dark:text-orange-400 font-semibold">Status</TableHead>
        <TableHead className="text-right text-orange-700 dark:text-orange-400 font-semibold">Balance</TableHead>
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
            className="odd:bg-orange-50/30 dark:odd:bg-gray-800 hover:bg-orange-100/30 dark:hover:bg-gray-700/50 border-none transition-colors"
          >
            <TableCell className="py-3 font-medium text-gray-900 dark:text-gray-100">{item.user?.name}</TableCell>
            <TableCell className="py-3 text-gray-900 dark:text-gray-100">{item.receiver?.name}</TableCell>
            <TableCell className="py-3 text-gray-900 dark:text-gray-100">{item.type}</TableCell>
            <TableCell className="py-3 text-gray-900 dark:text-gray-100">{item.status}</TableCell>
            <TableCell className="py-3 text-right font-semibold text-orange-600 dark:text-orange-400">
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

        {(() => {
          const windowSize = Math.min(3, totalPages); // show up to 3 pages
          const startPage = Math.max(
            1,
            Math.min(currentPage, totalPages - windowSize + 1) // start at current, clamp to end
          );

          return Array.from({ length: windowSize }, (_, i) => {
            const page = startPage + i;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          });
        })()}

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
