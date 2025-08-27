/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useApproveAgentMutation, useGetAgentsQuery, useSuspandAgentMutation } from "@/redux/features/admin/admin.api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Loader2, ShieldCheck, ShieldX } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { useState } from "react"

export default function ManageAgent() {
  const { data: agentData, isLoading, refetch } = useGetAgentsQuery(undefined)
  const [suspandAgent, { isLoading: suspending }] = useSuspandAgentMutation()
  const [approveAgent, { isLoading: approving }] = useApproveAgentMutation()
  // pagination 
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalAgents = agentData?.data?.length || 0
  const totalPages = Math.ceil(totalAgents / itemsPerPage)
  
  const paginatedAgents = agentData?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleApprove = async (id: string) => {
    try {
      await approveAgent(id).unwrap()
      toast.success("Agent approved successfully ✅")
      refetch()
    } catch (err) {
      toast.error("Failed to approve agent ❌")
    }
  }

  const handleSuspand = async (id: string) => {
    try {
      await suspandAgent(id).unwrap()
      toast.success("Agent suspended successfully ⚠️")
      refetch()
    } catch (err) {
      toast.error("Failed to suspend agent ❌")
    }
  }

  return (
    <div>
    <Card className="shadow-xl border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Manage Agents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Show 5 skeleton rows while loading
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-12" /></TableCell>
                  <TableCell className="text-center">
                    <Skeleton className="h-8 w-20 rounded-md mx-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              paginatedAgents?.map((agent: any) => (
                <TableRow key={agent._id}>
                  <TableCell className="font-medium text-left">{agent.name}</TableCell>
                  <TableCell className="text-left">{agent.phone}</TableCell>
                  <TableCell className="text-left">
                    {agent.accountStatus === "APPROVED" ? (
                      <Badge variant="default">Approved</Badge>
                    ) : (
                      <Badge variant="destructive">Suspended</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-left">{agent.commissionRate}%</TableCell>
                  <TableCell className="text-center space-x-2">
                    {agent.accountStatus === "APPROVED" ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleSuspand(agent._id)}
                        disabled={suspending}
                      >
                        {suspending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <ShieldX className="h-4 w-4 mr-1" />
                            Suspend
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        className="bg-green-500 text-black hover:bg-green-500"
                        variant="default"
                        size="sm"
                        onClick={() => handleApprove(agent._id)}
                        disabled={approving}
                      >
                        {approving ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="h-4 w-4 mr-1" />
                            Approve
                          </>
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  {/* pagination  */}
{/* Pagination */}
{totalPages > 1 && (
  <div className="mt-6 flex justify-center">
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* Sliding window */}
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

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  </div>
)}



    </div>

  )
}
