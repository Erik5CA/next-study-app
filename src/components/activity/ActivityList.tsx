"use client";
import Activity from "./Activity";
import { useSearchParams } from "next/navigation";
import ListMessagesActivity from "./ListMessagesActivity";
import { Suspense } from "react";

function ActivityList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <div className="hidden md:block bg-emerald-700 rounded-md h-min sticky top-4">
      <h3 className="bg-emerald-900 uppercase text-sm p-3 rounded-t-md">
        Recent Activities
      </h3>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* <ListMessagesActivity query={query} /> */}
      {/* </Suspense> */}
    </div>
  );
}

export default ActivityList;
