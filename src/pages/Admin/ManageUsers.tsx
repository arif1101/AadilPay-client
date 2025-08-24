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

export default function ManageUsers() {
  const { data: usersData, refetch } = useGetUsersQuery(undefined)
  const [blockWallet] = useBlockWalletMutation()
  const [activeWallet] = useActivekWalletMutation()
  const [selectedUser, setSelectedUser] = useState<any>(null)

  // console.log(usersData)

  const handleBlock = async (walletId: string) => {
    try {
      await blockWallet(walletId).unwrap()
      alert("Wallet blocked ✅")
      refetch() // refresh users
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
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div className="space-y-3">
        {usersData?.data?.map((user: any) => (
          <div
            key={user._id}
            className="flex justify-between items-center p-3 border rounded-lg shadow-sm"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <Dialog
              onOpenChange={(open) => {
                if (open) setSelectedUser(user)
                else setSelectedUser(null)
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>User & Wallet Info</DialogTitle>
                </DialogHeader>

                {selectedUser && (
                  <div className="space-y-3">
                    <p><strong>Name:</strong> {selectedUser?.name}</p>
                    <p><strong>Email:</strong> {selectedUser?.email}</p>
                    <p><strong>Phone:</strong> {selectedUser?.phone}</p>
                    <p>
                      <strong>Wallet Balance:</strong>{" "}
                      {selectedUser?.wallet?.balance} BDT
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {selectedUser?.wallet?.status === "ACTIVE"
                        ? "🟢 Active"
                        : "🔴 Blocked"}
                    </p>

                    <div className="flex gap-3 mt-4">
                      {selectedUser?.wallet?.status === "ACTIVE" ? (
                        <Button
                          variant="destructive"
                          onClick={() => handleBlock(selectedUser.wallet._id)}
                        >
                          Block Wallet
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleActive(selectedUser.wallet._id)}
                        >
                          Activate Wallet
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  )
}
