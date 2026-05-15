"use client";

import { useState } from "react";
import { useColumns, Users } from "./column";
import { DataTable } from "./data-table";
import Header from "./headerSection";
import { useUser } from "./context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type TableClientProps = {
  data: Users[];
};

export default function TableClient({ data }: TableClientProps) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const columns = useColumns();
  const { tableData, secondOpen, setSecondOpen, selectedUser } = useUser();
  return (
    <div className="container mx-auto py-10 font-inter">
      <Header value={globalFilter} onChange={setGlobalFilter} />
      <div>
        <DataTable
          columns={columns}
          data={tableData}
          globalFilter={globalFilter}
        />
        <Sheet open={secondOpen} onOpenChange={setSecondOpen}>
          <SheetContent side="right" className="w-[400px] font-inter!">
            <SheetHeader>
              <SheetTitle className="font-semibold!">User Profile</SheetTitle>
            </SheetHeader>

            {selectedUser && (
              <div className="px-4">
                <div className="flex gap-3 items-start">
                  <div>
                    <img src="/icons8-user-50.png" alt="" />
                  </div>
                  <p className="flex flex-col gap-1">
                    <span className="text-xl">{selectedUser.name}</span>
                    <span className="text-gray-500">User ID: {selectedUser.id}</span>
                </p>
                </div>
                <div className="flex flex-col gap-1 text-base pt-10">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div>
                    <img src="/icons8-email-25 (1).png" alt="" />
                    </div>
                    
                <p className="flex flex-col gap-0.5">
                  <span>Email</span>
                  <span className="text-blue-400 text-sm">{selectedUser.email}</span>
                  </p>
                  </div>
                  <div className="flex items-center gap-3 border-b pb-4 pt-2">
                    <div>
                      <img src="/icons8-gender-26.png" alt="" className="w-7 h-4"/>
                    </div>
                <p className="flex flex-col gap-1">
                  <span>Gender</span>
                  <span className="text-sm">{selectedUser.gender}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 border-b pb-4 pt-2">
                    <div>
                      <img src="/icons8-phone-50.png" alt="" className="w-6 h-6"/>
                    </div>
<p className="flex flex-col gap-1">
                  <span>Phone</span>
                  <span className="text-sm"> {selectedUser.phone}</span>
                </p>
                  </div>
                  <div  className="flex items-center gap-3 border-b pb-4 pt-2">
                    <div>
                    <img src="/icons8-country-48.png" alt="" className="w-6 h-6"/>
                    </div> 
                    <p className="flex flex-col gap-1">
                  <span>Country</span>
                  <span className="text-sm"> {selectedUser.country}</span>
                </p>
                </div>
                  <div className="flex items-center gap-3 pt-2">
                    <div>
                      <img src="/icons8-country-48.png" alt="" className="w-6 h-6"/>
                    </div>
                     <p className="flex flex-col gap-1">
                  <span className="text-sm">Date Registered</span>
                  <span>{selectedUser.dateRegistered}</span>
                </p>
                </div>
               
                </div>
                </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
