import { ChevronDown } from "lucide-react";
import prisma from "@/libs/db";
import ListTopics from "./ListTopics";
import Link from "next/link";

async function getTopics() {
  const topics = await prisma.topic.findMany({
    include: {
      _count: {
        select: {
          rooms: true,
        },
      },
    },
  });
  const totalRooms = await prisma.room.count();
  return { topics: topics.slice(0, 4), totalRooms };
}

async function Topics() {
  const { topics, totalRooms } = await getTopics();
  return (
    <div className="hidden md:flex flex-col p-3 gap-3 h-min sticky top-4">
      <h3 className="uppercase text-base font-semibold text-emerald-500">
        Browse Topic
      </h3>

      <ListTopics topics={topics} totalRooms={totalRooms} />

      <Link href="/topics" className="flex gap-2 hover:underline">
        <p className="text-emerald-400">More</p>
        <ChevronDown className="text-emerald-400" />
      </Link>
    </div>
  );
}

export default Topics;
