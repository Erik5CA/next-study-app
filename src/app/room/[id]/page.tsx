import { createNewMessage } from "@/actions/message-action";
import AvatarLink from "@/components/avatar/AvatarLink";
import ListMessages from "@/components/message/ListMessages";
import { getInfoRoom } from "@/database/rooms";
import { timeAgo } from "@/libs/utils";
import { Edit, Send, X } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { notFound } from "next/navigation";

async function RoomPage({ params }: { params: { id: string } }) {
  const roomId = parseInt(params.id);
  const room = await getInfoRoom(roomId);
  const session = await getServerSession();

  if (!room) {
    notFound();
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-[6fr_2fr] gap-10 md:px-10">
      <div className=" bg-emerald-700 rounded-md h-min">
        <div className="flex justify-between items-center bg-emerald-900 rounded-t-md p-3">
          <h3 className="uppercase text-sm">Study Room</h3>
          {session?.user?.email === room?.host?.email && (
            <div className="flex justify-center items-center gap-3">
              <Link href={`/update-room/${roomId}`}>
                <Edit />
              </Link>
              <Link href={`/delete-room/${roomId}`}>
                <X />
              </Link>
            </div>
          )}
        </div>

        <div className="p-4 md:p-6">
          <div className="flex justify-between">
            <h3 className="text-xl text-green-500 font-bold">{room?.name}</h3>
            <span className="text-sm text-slate-300">
              {" "}
              {timeAgo(room?.createdAt).fromNow()}
            </span>
          </div>
          <div>
            <h3 className="capitalize text-xs font-bold mb-1">Hosted by</h3>
            <AvatarLink type="feed" user={room?.host} />
          </div>

          <div className="bg-slate-900/50 py-1 px-3 text-sm rounded-3xl mt-1 w-max capitalize">
            <p>{room?.topic?.name}</p>
          </div>

          <ListMessages messages={room?.messages} />

          {session ? (
            <form
              className="w-full sticky bottom-0 flex justify-between items-center p-1 rounded-md bg-teal-600"
              action={createNewMessage}
            >
              <input type="hidden" name="roomId" value={room?.id} />
              <input
                type="text"
                name="body"
                title="Send"
                className="bg-transparent border-none w-[80%] outline-none p-1 text-sm placeholder:text-slate-300"
                placeholder="Write your message here..."
              />
              <button className="bg-teal-700 flex mr-2 justify-center items-center p-1 rounded-full shadow-sm">
                <Send />
              </button>
            </form>
          ) : (
            <p className="text-center text-slate-300 mt-3 font-bold">
              To send message you must login
            </p>
          )}
        </div>
      </div>

      <div className=" bg-emerald-700 rounded-md">
        <h3 className="bg-emerald-900 uppercase text-sm p-3 rounded-t-md">
          Participants
          <span className="text-sm text-slate-300">
            {" "}
            ({room?.participants.length} Joined)
          </span>
        </h3>

        <div className="p-5">
          {room?.participants.map((user) => (
            <div key={user.id} className="mb-4">
              <AvatarLink type="feed" user={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomPage;
