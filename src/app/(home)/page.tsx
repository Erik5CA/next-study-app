import ActivityList from "@/components/activity/ActivityList";
import ListRooms from "@/components/room/ListRooms";
import Search from "@/components/search/Search";
import { getRooms } from "@/database/rooms";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const { count } = await getRooms(query);
  return (
    <>
      <div>
        <Suspense>
          <Search type="feed" />
        </Suspense>

        <div className="md:hidden flex justify-center items-center gap-3 my-4">
          <Link
            href="/topics"
            className="border-[3px] border-emerald-400 text-emerald-400 font-bold text-xs md:text-sm rounded-3xl py-2 px-3"
          >
            Browser Topics
          </Link>
          <Link
            href="/activity"
            className="border-[3px] border-emerald-400 text-emerald-400 font-bold text-xs md:text-sm rounded-3xl py-2 px-3"
          >
            Recent Activities
          </Link>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h4 className="uppercase text-sm md:text-xl font-bold">
              study room
            </h4>
            <span className="text-emerald-400 text-sm ">
              {count} room available
            </span>
          </div>
          <Link
            href="/create-room"
            className="bg-emerald-500 py-3 px-2 md:px-3 rounded-md text-slate-600 flex items-center gap-1 hover:bg-emerald-800 hover:text-slate-400 transition-all"
          >
            <Plus />
            <span className="text-sm">Create Room</span>
          </Link>
        </div>

        <Suspense fallback={<h1>Loading...</h1>}>
          <ListRooms query={query} />
        </Suspense>
      </div>

      <ActivityList query={query} />
    </>
  );
}

export default HomePage;
