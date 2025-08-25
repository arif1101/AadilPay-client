/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  useActivekWalletMutation,
  useBlockWalletMutation,
  useGetUsersQuery,
} from "@/redux/features/admin/admin.api"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wallet, Mail, Phone, User as UserIcon } from "lucide-react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination"

export default function ManageUsers() {
  const { data: usersData, refetch } = useGetUsersQuery(undefined)
  const [blockWallet] = useBlockWalletMutation()
  const [activeWallet] = useActivekWalletMutation()
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 1

  const totalUsers = usersData?.data?.length || 0
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  const paginatedUsers = usersData?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleBlock = async (walletId: string) => {
    try {
      await blockWallet(walletId).unwrap()
      alert("Wallet blocked ✅")
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  const handleActive = async (walletId: string) => {
    try {
      await activeWallet(walletId).unwrap()
      alert("Wallet activated ✅")
      refetch()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Manage Users
      </h1>

      <div className="grid gap-4">
        {paginatedUsers?.map((user: any) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="h-10 w-10 flex items-center justify-center rounded-full bg-orange-100 text-orange-700 font-semibold">
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {/* Name and Email */}
              <div className="flex flex-col">
                <p className="font-semibold text-lg text-left text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>


            <div className="flex items-center gap-3">
              <Badge
                className={
                  user?.wallet?.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }
              >
                {user?.wallet?.status}
              </Badge>

              <Dialog
                onOpenChange={(open) =>
                  open ? setSelectedUser(user) : setSelectedUser(null)
                }
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    View
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-lg rounded-2xl p-6 shadow-lg">
                  {selectedUser && (
                    <>
                      <DialogHeader className="mb-4">
                        <DialogTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                          <UserIcon className="w-6 h-6 text-orange-500" />
                          {selectedUser?.name}
                        </DialogTitle>
                        <p className="text-gray-500 text-sm">{selectedUser?.email}</p>
                      </DialogHeader>

                      <Separator />

                      <div className="grid gap-4 py-4">
                        <div className="flex items-center gap-3">
                          <Phone className="w-5 h-5 text-gray-500" />
                          <span>{selectedUser?.phone || "Not Provided"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Wallet className="w-5 h-5 text-gray-500" />
                          <span>
                            <strong>{selectedUser?.wallet?.balance}</strong> BDT
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-500" />
                          <Badge
                            className={
                              selectedUser?.wallet?.status === "ACTIVE"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {selectedUser?.wallet?.status}
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="flex justify-end gap-3 pt-4">
                        {selectedUser?.wallet?.status === "ACTIVE" ? (
                          <Button
                            variant="destructive"
                            className="rounded-lg"
                            onClick={() => handleBlock(selectedUser.wallet._id)}
                          >
                            Block Wallet
                          </Button>
                        ) : (
                          <Button
                            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                            onClick={() => handleActive(selectedUser.wallet._id)}
                          >
                            Activate Wallet
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

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
