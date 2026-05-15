'use client'
import { useState } from "react"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
    useReactTable,
  RowSelectionState,
  getFilteredRowModel,
  getPaginationRowModel,
  Row
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUser } from "./context"
import { Users } from "./column"
import { Button } from "./ui/button"

interface DataTableProps {
  columns: ColumnDef<Users, unknown>[]
  data: Users[]
  globalFilter: string,
}
 
export function DataTable({
  columns,
  data,
  globalFilter,
}: DataTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const { setSecondOpen, setSelectedUser } = useUser()

  const table = useReactTable({
    data,
    columns,
    initialState: {
    pagination: {
      pageSize: 20,
    },
  },
      getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel:getPaginationRowModel(),
  state: {
    rowSelection,
        globalFilter,

  },
     enableRowSelection: true,
  })

  return (
    <>
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="font-semibold py-4 bg-gray-100">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody >
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={`hover:bg-blue-50! `}
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
    setSelectedUser(row.original)
    setSecondOpen(true)
  }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={`text-base py-3!  ${cell.column.id === "gender" && cell.getValue() === "Female" ? " text-red-600 ":""} ${cell.column.id === "gender" && cell.getValue() === "Male" ? " text-blue-500  ":""}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-base">
                No results.
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
        <div className="border-t py-4 text-right pr-4">
            Page{" "} {table.getState().pagination.pageIndex + 1} {" "} of {" "} {table.getPageCount()}
          </div>
    </div>
     <div className="flex gap-2 justify-end items-center pt-8 pr-4">
        <Button className="cursor-pointer bg-white! text-gray-800! border-gray-800! px-6! py-4!" onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()}>Prev</Button>
        <Button className="cursor-pointer px-6! py-4! bg-blue-500! " onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()}>Next</Button>
      </div>
      </>
  )
}