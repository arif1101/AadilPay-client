import { useState } from "react"

export default function AllTransactions() {
  // 🔹 State for filters
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [category, setCategory] = useState("")
  const [minAmount, setMinAmount] = useState("")
  const [maxAmount, setMaxAmount] = useState("")
  const [page, setPage] = useState(1)

  // 🔹 Dummy data (replace with API call)
  const transactions = [
    { id: 1, category: "Deposit", status: "SUCCESS", amount: 200, date: "2025-08-20" },
    { id: 2, category: "Withdraw", status: "FAILED", amount: 150, date: "2025-08-21" },
    { id: 3, category: "Transfer", status: "PENDING", amount: 300, date: "2025-08-22" },
    { id: 4, category: "Deposit", status: "SUCCESS", amount: 100, date: "2025-08-23" },
  ]

  // 🔹 Filtering logic
  const filtered = transactions.filter((tx) => {
    return (
      (search ? tx.category.toLowerCase().includes(search.toLowerCase()) : true) &&
      (status ? tx.status === status : true) &&
      (category ? tx.category === category : true) &&
      (minAmount ? tx.amount >= parseFloat(minAmount) : true) &&
      (maxAmount ? tx.amount <= parseFloat(maxAmount) : true)
    )
  })

  // 🔹 Pagination
  const pageSize = 2
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)
  const totalPages = Math.ceil(filtered.length / pageSize)

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Transactions</h1>

      {/* Search + Filters */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select>

        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border px-2 py-1 rounded">
          <option value="">All Categories</option>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
          <option value="Transfer">Transfer</option>
        </select>

        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border px-2 py-1 rounded"
        />

        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Transactions Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Date</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((tx) => (
            <tr key={tx.id}>
              <td className="border px-2 py-1">{tx.id}</td>
              <td className="border px-2 py-1">{tx.category}</td>
              <td className="border px-2 py-1">{tx.status}</td>
              <td className="border px-2 py-1">${tx.amount}</td>
              <td className="border px-2 py-1">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1 border rounded">
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1 border rounded">
          Next
        </button>
      </div>
    </div>
  )
}
