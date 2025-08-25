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
              {isLoading ? (
              Array.from({ length: itemsPerPage }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                      <TableCell className="text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ):(
              transactions.length > 0 ? (
                paginatedData.map((tx: any) => (
                  <TableRow key={tx._id}>
                    <TableCell>{tx.user?.name ?? "N/A"}</TableCell>
                    <TableCell>{tx.receiver?.name ?? "N/A"}</TableCell>
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
                      <Badge className="bg-green-200"
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
              )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
        {(() => {
          // Calculate start and end page for window
          let startPage = Math.max(1, currentPage);
          const endPage = Math.min(totalPages, currentPage + 2);

          // If near the end, shift window left
          if (endPage === totalPages && totalPages > 3) {
            startPage = Math.max(1, totalPages - 2);
          }

          const pageNumbers = [];
          for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i}
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </PaginationLink>
              </PaginationItem>
            );
          }

          return (
            <>
              {pageNumbers}
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
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
      
    </div>
  )
}
