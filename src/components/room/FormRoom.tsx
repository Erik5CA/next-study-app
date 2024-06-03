import Link from "next/link";
import prisma from "@/libs/db";
import { getRoomWithTopic } from "@/database/rooms";
import { createNewRoom, updateRoom } from "@/actions/room-actions";

async function getTopics() {
  const topics = await prisma.topic.findMany();
  return topics;
}

async function FormRoom({ id }: { id?: number }) {
  const topics = await getTopics();
  const room = id ? await getRoomWithTopic(id) : undefined;
  const formAction = room ? updateRoom : createNewRoom;

  return (
    <form className="bg-emerald-700 rounded-md max-w-xl" action={formAction}>
      <h1 className="bg-emerald-900 text-xl font-bold rounded-t-md p-4">
        {room ? "Update" : "Create"} Room
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
          defaultValue={room ? room.topic?.name : ""}
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
          defaultValue={room ? room.name : ""}
        />

        <label htmlFor="name" className="text-sm text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
          defaultValue={room?.description ? room?.description : ""}
        />

        <input type="hidden" name="roomId" value={room?.id} />

        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            className="bg-green-700 text-white font-bold rounded-md p-3 shadow-sm hover:bg-green-600"
          >
            {room ? "Update" : "Create"}
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
  );
}

export default FormRoom;
