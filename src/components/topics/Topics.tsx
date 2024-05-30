import { ChevronDown } from "lucide-react";
import prisma from "@/libs/db";

async function getTopics() {
  const topics = await prisma.topic.findMany();
  const roomCounts = await prisma.room.groupBy({
    by: ["topicId"],
    _count: {
      id: true,
    },
  });
  console.log(roomCounts);
  return { topics, roomCounts };
}

async function Topics() {
  const { topics, roomCounts } = await getTopics();
  return (
    <div className="hidden md:flex flex-col p-3 gap-3 h-min sticky top-4">
      <h3 className="uppercase text-base font-semibold text-emerald-500">
        Browse Topic
      </h3>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center hover:bg-slate-900 hover:text-emerald-400 transition-all p-2 rounded-md cursor-pointer">
          <span className="text-slate-300">All</span>
          <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
            4
          </span>
        </div>
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            className="flex justify-between items-center hover:bg-slate-900 hover:text-emerald-400 transition-all p-2 rounded-md cursor-pointer"
          >
            <span className="text-slate-300 capitalize">{topic.name}</span>
            <span className="px-3 py-1 rounded-md text-emerald-400 bg-emerald-500/30">
              {roomCounts[index]._count.id}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 hover:underline">
        <p className="text-emerald-400">More</p>
        <ChevronDown className="text-emerald-400" />
      </div>
    </div>
  );
}

export default Topics;
