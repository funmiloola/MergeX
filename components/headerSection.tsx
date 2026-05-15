"use client";
import { useUser } from "./context";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Merge from "./selectedUsers";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Users } from "./column";

export type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function Header({ value, onChange }: Props) {
  const { selectedUsers, open, setOpen,tableData } = useUser();

  return (
    <section className="px-4">
          <h1 className="text-3xl font-semibold flex gap-2 items-center">Users <span className="px-2 py-0.5 font-semibold bg-blue-50 rounded-full text-blue-500 text-xs ">{ tableData.length}</span></h1>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search users..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-[200px] md:w-md py-2! h-auto!"
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className={`cursor-pointer bg-blue-500! text-white!`}
              disabled={selectedUsers.length < 2}
            >
              Merge Users
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full md:max-w-[1000px]! p-0 [&>button]:hidden h-full">
            <SheetTitle></SheetTitle>
            <Merge />
          </SheetContent>
        </Sheet>
      </div>
    </section>
  );
}
