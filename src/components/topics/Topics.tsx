import { ChevronDown } from "lucide-react";
import prisma from "@/libs/db";
import ListTopics from "./ListTopics";

async function getTopics() {
  const topics = await prisma.topic.findMany();
  const totalRooms = await prisma.room.count();
  const roomCounts = await prisma.room.groupBy({
    by: ["topicId"],
    _count: {
      id: true,
    },
  });
  return { topics, roomCounts, totalRooms };
}

async function Topics() {
  const { topics, roomCounts, totalRooms } = await getTopics();
  return (
    <div className="hidden md:flex flex-col p-3 gap-3 h-min sticky top-4">
      <h3 className="uppercase text-base font-semibold text-emerald-500">
        Browse Topic
      </h3>

      <ListTopics
        topics={topics}
        roomCounts={roomCounts}
        totalRooms={totalRooms}
      />

      <div className="flex gap-2 hover:underline">
        <p className="text-emerald-400">More</p>
        <ChevronDown className="text-emerald-400" />
      </div>
    </div>
  );
}

export default Topics;
