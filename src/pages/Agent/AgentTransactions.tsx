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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function AgentTransactions() {

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  
  const { data, isLoading } = useAgentTransactionsQuery(undefined)
  const transactions = data?.data ?? []

  // pagination 
  const totalPages = Math.ceil(transactions.length / itemsPerPage)
  const paginatedData = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  console.log(paginatedData)

  const handlePageChange = (page: number) => {
    if(page >=1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="md:p-6 space-y-6 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mx-auto">
          Agent Transactions
        </h1>
      </div>

      <Card className="shadow-lg border border-orange-100 dark:border-gray-700">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white dark:from-orange-600 dark:to-orange-700 rounded-t-xl border-2 -mt-6">
          <CardTitle className="text-lg font-semibold">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-orange-100/60 dark:bg-gray-700/40">
                <TableHead className="font-semibold text-orange-700 dark:text-orange-400 text-center">User Phone</TableHead>
                <TableHead className="font-semibold text-orange-700 dark:text-orange-400 text-center">Receiver Phone</TableHead>
                <TableHead className="font-semibold text-orange-700 dark:text-orange-400 text-center">Type</TableHead>
                <TableHead className="font-semibold text-orange-700 dark:text-orange-400 text-center">Status</TableHead>
                <TableHead className="font-semibold text-orange-700 dark:text-orange-400 text-right">Amount</TableHead>
                <TableHead className="font-semibold text-orange-700 dark:text-orange-400 text-center">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? Array.from({ length: itemsPerPage }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    </TableRow>
                  ))
                : transactions.length > 0
                ? paginatedData.map((tx: any) => (
                    <TableRow key={tx._id} className="hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors">
                      <TableCell>{tx.user?.name ?? "N/A"}</TableCell>
                      <TableCell>{tx.receiver?.name ?? "N/A"}</TableCell>
                      <TableCell>
                        <Badge
                          className={`capitalize ${
                            tx.type === "CASH_IN"
                              ? "bg-orange-500 text-white"
                              : tx.type === "CASH_OUT" || tx.type === "WITHDRAW"
                              ? "bg-red-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`capitalize ${
                            tx.status === "success"
                              ? "bg-green-500 text-white"
                              : "bg-gray-400 text-white"
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-orange-600 dark:text-orange-400">
                        ৳ {tx.amount}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(tx.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 dark:text-gray-400 py-6">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={`${
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-orange-100 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400"
                }`}
              />
            </PaginationItem>

            {(() => {
              let startPage = Math.max(1, currentPage);
              const endPage = Math.min(totalPages, currentPage + 2);
              if (endPage === totalPages && totalPages > 3) startPage = Math.max(1, totalPages - 2);

              return (
                <>
                  {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                    const page = startPage + i;
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          className={`${
                            currentPage === page
                              ? "bg-orange-500 text-white"
                              : "hover:bg-orange-100 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400"
                          }`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  {endPage < totalPages && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              );
            })()}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "hover:bg-orange-100 dark:hover:bg-gray-700 text-orange-600 dark:text-orange-400"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
