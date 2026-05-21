import { Suspense } from "react";
import TableClient from "./components";


export default function TablePage() {
  

  return (
    <div className="container mx-auto py-10 font-inter">
      <Suspense fallback={<div className="p-4 text-center">Loading table data...</div>}>
        <TableClient />
        </Suspense>
    </div>
  );
}
