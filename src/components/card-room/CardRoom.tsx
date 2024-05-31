import { Users } from "lucide-react";
import AvatarLink from "../avatar/AvatarLink";
import { Room, User } from "@prisma/client";
import Link from "next/link";
import { timeAgo } from "@/libs/utils";
import { getInfoRoom } from "@/database/rooms";

interface Props {
  room: Room & Participants;
}

interface Participants {
  participants: User[];
}

async function CardRoom({ room }: Props) {
  const roomFound = await getInfoRoom(room.id);

  return (
    <div className="bg-emerald-700 rounded-lg px-4 md:px-8 py-5 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <AvatarLink type="feed" user={roomFound?.host} />
        </div>
        <span className="text-xs md:text-sm text-slate-300">
          {timeAgo(room.createdAt).fromNow()}
        </span>
      </div>

      <Link
        href={`/room/${room.id}`}
        className="block text-lg mt-2 mb-4 hover:underline"
      >
        {room.name}
      </Link>

      <div className="flex justify-between items-center pt-2 border-t border-black/50">
        <div className="flex gap-2 items-center">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-sm text-slate-300">
            {room.participants.length} Joined
          </span>
        </div>
        <span className="bg-black/50 rounded-3xl text-sm py-1 px-3 capitalize">
          {roomFound?.topic?.name}
        </span>
      </div>
    </div>
  );
}

export default CardRoom;
