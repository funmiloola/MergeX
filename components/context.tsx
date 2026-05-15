'use client'
import {
  createContext,
  useContext,
  useState,
} from "react"
import { userdata } from "./data"
import { Users } from "./column"

export type User = {
  id: number
  name: string
  email: string
 country: string
    phone: number
    gender: string
 dateRegistered:string
}

type UserContextType = {
   selectedUser: Users | null
  setSelectedUser: React.Dispatch<React.SetStateAction<Users | null>>
  selectedUsers: User[]
  setSelectedUsers: React.Dispatch<
    React.SetStateAction<User[]>
    >
  userdata: User[]
     tableData: Users[],
  setTableData: React.Dispatch<React.SetStateAction<Users[]>>
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  secondOpen: boolean
    setSecondOpen:React.Dispatch<React.SetStateAction<boolean>>

}

const UserContext = createContext<
  UserContextType | undefined
>(undefined)


export function UsersProvider({
  children,
}: {
  children:React.ReactNode
}) {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [tableData, setTableData] = useState<Users[]>(userdata)
  const [open, setOpen] = useState<boolean>(false)
  const [secondOpen,setSecondOpen] = useState<boolean>(false)
  const [selectedUser,setSelectedUser] = useState<Users | null>(null)
        return (
            <UserContext.Provider value={{ selectedUsers, setSelectedUsers,userdata,tableData,setTableData,open,setOpen,selectedUser,setSelectedUser,secondOpen,setSecondOpen }}>
                {children}
            </UserContext.Provider>
        )
    
}


export function useUser() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUsers must be used within UsersProvider")
    }
    return context
}