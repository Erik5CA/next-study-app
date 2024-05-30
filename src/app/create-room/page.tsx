import { createNewRoom } from "@/actions/room-actions";
import prisma from "@/libs/db";
import Link from "next/link";

async function getTopics() {
  const topics = await prisma.topic.findMany();
  return topics;
}

async function CreateRoom() {
  const topics = await getTopics();

  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <form
        className="bg-emerald-700 rounded-md max-w-xl"
        action={createNewRoom}
      >
        <h1 className="bg-emerald-900 text-xl font-bold rounded-t-md p-4">
          Create Room
        </h1>

        <div className="p-5">
          <label htmlFor="topic" className="text-sm text-slate-300">
            Room Topic
          </label>
          <input
            name="topic"
            type="text"
            list="topic-list"
            className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
          />
          <datalist id="topic-list">
            {topics.map((topic) => (
              <option value={topic.name} key={topic.id} />
            ))}
          </datalist>

          <label htmlFor="name" className="text-sm text-slate-300">
            Room Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
          />

          <label htmlFor="name" className="text-sm text-slate-300">
            Description
          </label>
          <textarea
            name="description"
            className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
          />

          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="bg-green-700 text-white font-bold rounded-md p-3 shadow-sm hover:bg-green-600"
            >
              Create
            </button>
            <Link
              href="/"
              className="bg-teal-800 text-white font-bold rounded-md p-3 shadow-sm hover:bg-teal-700"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateRoom;
