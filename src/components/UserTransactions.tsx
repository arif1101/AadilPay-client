/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTransactionQuery } from "@/redux/features/transactions/transaction.api"


export default function UserTransactions() {

    const {data } = useTransactionQuery(undefined)
    const transactions = data?.data
    console.log(transactions)
  
  return (
    <div>
      <Table>
        <TableHeader className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableHead>User</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {transactions?.map((item: any) => (
            <TableRow
              key={item.id}
              className="odd:bg-muted/50 odd:hover:bg-muted/50 border-none hover:bg-transparent"
            >
              <TableCell className="py-2.5 font-medium">{item.user?.name}</TableCell>
              <TableCell className="py-2.5">{item.receiver?.name}</TableCell>
              <TableCell className="py-2.5">{item.type}</TableCell>
              <TableCell className="py-2.5">{item.status}</TableCell>
              <TableCell className="py-2.5 text-right">
                {item.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <tbody aria-hidden="true" className="table-row h-2"></tbody>
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p className="text-muted-foreground mt-4 text-center text-sm">
        Striped table
      </p>
    </div>
  )
}
