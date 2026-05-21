"use client";

import { useState, useEffect } from "react";
import { useColumns } from "@/components/column";
import { DataTable } from "@/components/data-table";
import Header from "@/components/headerSection";
import { useUser } from "@/components/context";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function TableClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [globalFilter, setGlobalFilter] = useState<string>(search);
  const columns = useColumns();
  const { tableData, secondOpen, setSecondOpen, selectedUser } = useUser();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (globalFilter) {
      params.set("search", globalFilter);
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [globalFilter, pathname, router]);

  return (
    <div className="border border-black/20 rounded-2xl mx-auto py-10 font-inter ">
      <Header value={globalFilter} onChange={setGlobalFilter} />
      <div>
        <DataTable
          columns={columns}
          data={tableData}
          globalFilter={globalFilter}
        />
        <Sheet open={secondOpen} onOpenChange={setSecondOpen}>
          <SheetContent side="right" className="max-w-140! w-140!  font-inter!">
            <SheetHeader>
              <SheetTitle className="font-semibold!">User Profile</SheetTitle>
            </SheetHeader>

            {selectedUser && (
              <div className="px-4">
                <div className="flex flex-col gap-3 items-start justify-center">
                  <div>
                    <img
                      src={selectedUser.avatar}
                      alt="avatar"
                      className="rounded-full w-30 h-30"
                    />
                  </div>
                  <div>
                    <span className="text-gray-500">
                      User ID: {selectedUser.id}
                    </span>
                  </div>
                </div>
                <div className="grid grid-rows-3 grid-cols-2 gap-7 text-base pt-10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-gray-500">Name</span>
                    <span>{selectedUser.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="flex flex-col gap-0.5">
                      <span className="text-gray-500">Email</span>
                      <span className="">{selectedUser.email}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-col gap-1">
                      <span className="text-gray-500">Gender</span>
                      <span className="text-sm">{selectedUser.gender}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-col gap-1">
                      <span className="text-gray-500">Phone</span>
                      <span className="text-sm"> {selectedUser.phone}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-col gap-1">
                      <span className="text-gray-500">Country</span>
                      <span className="text-sm"> {selectedUser.country}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-col gap-1">
                      <span className=" text-gray-500">Date Registered</span>
                      <span>{selectedUser.dateRegistered}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-col gap-1">
                      <span className=" text-gray-500">City</span>
                      <span>{selectedUser.city}</span>
                    </p>
                  </div>
                  <div>
                    <p className="flex flex-col gap-1">
                      <span className=" text-gray-500">State</span>
                      <span>{selectedUser.state}</span>
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
