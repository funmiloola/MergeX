'use client'
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox"
import { useUser } from "./context";
export type Users = {
    email: string,
    id: number,
    name:string,
    gender: string,
    phone: number ,
    country: string,
  dateRegistered: string,
  avatar: string,
  city?: string,
    state?:string
}
export function useColumns(): ColumnDef<Users>[] {
  const {
    selectedUsers,
    setSelectedUsers,
    setSelectedUser
  } = useUser()
  
  return [
    {
      id: "select",

      header: ({ table }) => {
        const allRows = table.getRowModel().rows
        return (
         <Checkbox
          className="border border-gray-400"
          checked={selectedUsers.length === allRows.length}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedUsers(allRows.map((row) => row.original))
              }
              else {
                setSelectedUsers([])
            }
            }
            
          }
          aria-label="Select all"
        />
       )
        
      },

      cell: ({ row }) => {
        const user = row.original
const isChecked = selectedUsers.some((u) => u.id === user.id);
        return (
          <Checkbox
            className={`border border-gray-400  ${isChecked ? 'bg-blue-500! border-blue-500!':"bg-white"}`}
            checked={selectedUsers.some(
              (u) => u.id === user.id
            )}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedUsers((prev) => [
                  ...prev,
                  user,
                ])
                setSelectedUser(null)
              } else {
                setSelectedUsers((prev) =>
                  prev.filter(
                    (u) => u.id !== user.id
                  )
                )
              }
            }}
            aria-label="Select row"
             onClick={(e) => e.stopPropagation()}
          />
        )
      },

      enableSorting: false,
      enableHiding: false,
    },

    {
      id: "sn",
      header: "S/N",
      cell: ({ row }) => row.index + 1,
    },

    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex gap-2 items-center">
            <img src={user.avatar} alt="" className="rounded-full"/>
            <span>{ user.name}</span>
          </div>
        )
      }
    },
    {
    accessorKey: "email",
    header: "Email",
    },
   {
    accessorKey: "gender",
    header: "Gender",
    },
    {
    accessorKey: "phone",
    header: "Phone",
    },
     {
    accessorKey: "country",
    header: "Country",
    },
      {
    accessorKey: "dateRegistered",
    header: "Date Registered",
    },
  ]
}
