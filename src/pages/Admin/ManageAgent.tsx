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

export default function ManageAgent() {
  const { data: agentData, isLoading, refetch } = useGetAgentsQuery(undefined)
  const [suspandAgent, { isLoading: suspending }] = useSuspandAgentMutation()
  const [approveAgent, { isLoading: approving }] = useApproveAgentMutation()

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2">Loading agents...</span>
      </div>
    )
  }

  return (
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
            {agentData?.data?.map((agent: any) => (
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
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
