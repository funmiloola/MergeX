"use client";
import { useState } from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "./context";
import { Users } from "./column";
import { Button } from "./ui/button";

interface DataTableProps {
  columns: ColumnDef<Users, unknown>[];
  data: Users[];
  globalFilter: string;
}

const numbers:number[] = [5,10,20,50]

export function DataTable({ columns, data, globalFilter }: DataTableProps) {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [hidePage,setHidePage] = useState(false)
  const { setSecondOpen, setSelectedUser } = useUser();

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
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      globalFilter,
    },
    enableRowSelection: true,
  });

  return (
    <>
      <div className="overflow-hidden">
        <Table>
          <TableHeader className="border-b-3 border-b-black/30"> 
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold py-4 "
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="border-b-0">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={`hover:bg-blue-50! border-b-0`}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    setSelectedUser(row.original);
                    setSecondOpen(true);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`text-base py-3!`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-base"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between border py-4 px-3  mx-2 rounded-xl border-black/40 mt-3 ">
          <div >
            <div  className=" flex relative gap-2 items-center border py-2 px-2 w-fit  rounded-xl border-black/40  cursor-pointer"  onClick={()=>setHidePage(!hidePage)}>
            <span>{table.getState().pagination.pageSize}</span> 
            <img src="/icons8-expand-arrow-24.png" alt="" />
          </div>
          <div className={` flex-col gap-1 w-15 left-25 absolute bg-white z-10   border-gray-300 rounded-md shadow-xl px-4 py-1.5 ${hidePage ? 'flex':'hidden'}`}>
            {numbers.map((num,index) => (
              <div key={index} onClick={() => { table.setPageSize(num); setHidePage(!hidePage)}} className="cursor-pointer">{num}</div>
            ))} 
          </div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: table.getPageCount() },(_,index)=>(
              <Button className={`bg-white! text-gray-400! border-gray-700! ${index === table.getState().pagination.pageIndex ? "bg-black/60! text-white! border-black/60!":""}`} key={index} onClick={()=>table.setPageIndex(index)}>{ index + 1}</Button>
            ))}
        </div>
      </div>
         </div>
    </>
  );
}
