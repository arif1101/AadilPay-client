import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function UserOverviewLoader() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Receiver</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i} className="animate-pulse">
              <TableCell className="py-2.5">
                <div className="h-4 w-24 bg-muted rounded" />
              </TableCell>
              <TableCell className="py-2.5">
                <div className="h-4 w-28 bg-muted rounded" />
              </TableCell>
              <TableCell className="py-2.5">
                <div className="h-4 w-16 bg-muted rounded" />
              </TableCell>
              <TableCell className="py-2.5">
                <div className="h-4 w-20 bg-muted rounded" />
              </TableCell>
              <TableCell className="py-2.5 text-right">
                <div className="h-4 w-12 bg-muted rounded ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
