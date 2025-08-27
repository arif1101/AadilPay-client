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
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

export default function ManageUsers() {
  const { data: usersData,isLoading , refetch } = useGetUsersQuery(undefined)
  const [blockWallet] = useBlockWalletMutation()
  const [activeWallet] = useActivekWalletMutation()
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalUsers = usersData?.data?.length || 0
  const totalPages = Math.ceil(totalUsers / itemsPerPage)

  const paginatedUsers = usersData?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleBlock = async (walletId: string) => {
    try {
      await blockWallet(walletId).unwrap()
      toast.success("User blocked successfully")
      refetch()
    } catch (err) {
      console.error(err)
      toast.error("something wrong")
    }
  }

  const handleActive = async (walletId: string) => {
    try {
      await activeWallet(walletId).unwrap()
      toast.success("User Active successfully")
      refetch()
    } catch (err) {
      console.error(err)
      toast.error("something wrong")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Manage Users
      </h1>

      <div className="grid gap-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-white border rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <Skeleton className="h-10 w-10 rounded-full" />

                {/* Name + Email */}
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-md" />
              </div>
            </div>
          ))
        ) : (
          paginatedUsers?.map((user: any) => (
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
        ))
        )
        }
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
