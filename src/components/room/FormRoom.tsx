"use client";
import Link from "next/link";
import { State, createNewRoom, updateRoom } from "@/actions/room-actions";
import { useFormState } from "react-dom";
import { Topic } from "@prisma/client";
import { RoomWithTopic } from "@/database/rooms";

function FormRoom({ room, topics }: { room?: RoomWithTopic; topics: Topic[] }) {
  const formAction = room ? updateRoom : createNewRoom;
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(formAction, initialState);

  return (
    //
    <form className="bg-emerald-700 rounded-md max-w-xl" action={dispatch}>
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
        {state.errors?.topic &&
          state.errors.topic.map((error) => (
            <p
              key={error}
              className="text-red-200 p-1 text-center bg-red-600/50 rounded-sm text-sm"
            >
              {error}
            </p>
          ))}

        <label htmlFor="name" className="text-sm text-slate-300">
          Room Name
        </label>
        <input
          name="name"
          type="text"
          className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
          defaultValue={room ? room.name : ""}
        />
        {state.errors?.name &&
          state.errors.name.map((error) => (
            <p
              key={error}
              className="text-red-200 p-1 text-center bg-red-600/50 rounded-sm text-sm"
            >
              {error}
            </p>
          ))}

        <label htmlFor="name" className="text-sm text-slate-300">
          Description
        </label>
        <textarea
          name="description"
          className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
          defaultValue={room?.description ? room?.description : ""}
        />
        {state?.message && (
          <p className="text-red-200 p-1 text-center bg-red-600/50 rounded-sm text-sm mb-2">
            {state.message}
          </p>
        )}

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
