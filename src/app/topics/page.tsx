import Search from "@/components/search/Search";
import { filterTopics } from "@/database/rooms";
import Link from "next/link";
import { Suspense } from "react";

async function TopicsPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query || "";
  const topics = await filterTopics(query);

  return (
    <div className="p-4 flex justify-center items-center">
      <div className="bg-emerald-700 rounded-md w-96">
        <h3 className="bg-emerald-900 uppercase text-sm p-4 rounded-t-md">
          Browser Topic
        </h3>
        <div className="p-5">
          <Suspense>
            <Search type="browse" />
          </Suspense>
          <div className="mt-2">
            {topics.length === 0 ? (
              <p className="text-base text-center text-slate-300">
                No topics found for{" "}
                <span className="italic font-bold">{query}</span>
              </p>
            ) : (
              topics.map((topic) => (
                <Link
                  href={`/?query=${topic.name}`}
                  key={topic.id}
                  className="text-slate-300 block border-b border-white/50 p-3 capitalize hover:bg-emerald-800 hover:text-green-600 transition-all"
                >
                  <div className="flex justify-between">
                    <p>{topic.name}</p>
                    <span>{topic._count.rooms}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicsPage;
