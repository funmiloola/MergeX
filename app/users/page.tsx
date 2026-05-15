'use client'
import { useUser } from "@/components/context"
import TableClient from "@/components/tableClient"


export default function TablePage() {
  const {tableData} = useUser()
 
  return (
    <div className="container mx-auto py-10 font-inter">
      <TableClient data={tableData} />
    </div>
  )
}