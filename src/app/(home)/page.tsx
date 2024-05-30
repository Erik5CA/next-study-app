import ListRooms from "@/components/card-room/ListRooms";
import Search from "@/components/search/Search";
import { Plus } from "lucide-react";
import Link from "next/link";
import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";

async function getRooms() {
  const rooms = await prisma.room.findMany({
    include: {
      participants: true,
    },
  });
  return rooms;
}

export type RoomsWithParticipants = Prisma.PromiseReturnType<typeof getRooms>;

async function HomePage() {
  const rooms = await getRooms();
  return (
    <div>
      <Search />

      <div className="md:hidden flex justify-center items-center gap-3 my-4">
        <h3 className="border-[3px] border-emerald-500 text-emerald-500 font-bold text-xs md:text-sm rounded-3xl py-1 px-3">
          Browser Topics
        </h3>
        <h3 className="border-[3px] border-emerald-400 text-emerald-400 font-bold text-xs md:text-sm rounded-3xl py-1 px-3">
          Recent Activities
        </h3>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h4 className="uppercase text-sm md:text-xl font-bold">study room</h4>
          <span className="text-emerald-400 text-sm ">4 room available</span>
        </div>
        <Link
          href="/create-room"
          className="bg-emerald-500 py-3 px-2 md:px-3 rounded-md text-slate-600 flex items-center gap-1 hover:bg-emerald-800 hover:text-slate-400 transition-all"
        >
          <Plus />
          <span className="text-sm">Create Room</span>
        </Link>
      </div>

      <ListRooms rooms={rooms} />
    </div>
  );
}

export default HomePage;
