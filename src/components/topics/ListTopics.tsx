"use client";
import { Topic } from "@prisma/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";

interface Props {
  topics: Topic[];
  roomCounts: any[];
  totalRooms: number;
}

function ListTopics({ topics, roomCounts, totalRooms }: Props) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <div className="flex flex-col gap-3">
      <Link
        href="/"
        className="flex justify-between items-center hover:bg-slate-900 hover:text-emerald-400 transition-all p-2 rounded-md cursor-pointer"
      >
        <span
          className={clsx("text-slate-300", {
            "font-bold text-emerald-600": query === "",
          })}
        >
          All
        </span>
        <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
          {totalRooms}
        </span>
      </Link>
      {topics.map((topic, index) => (
        <Link
          href={`/?query=${topic.name}`}
          key={topic.id}
          className="flex justify-between items-center hover:bg-slate-900 hover:text-emerald-400 transition-all p-2 rounded-md cursor-pointer"
        >
          <span
            className={clsx("text-slate-300 capitalize", {
              "font-bold text-emerald-600": query === topic.name,
            })}
          >
            {topic.name}
          </span>
          <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
            {roomCounts[index]._count.id}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default ListTopics;
