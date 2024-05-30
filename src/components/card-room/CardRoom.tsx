import { Users } from "lucide-react";
import AvatarLink from "../avatar/AvatarLink";
import { Room, Topic, User } from "@prisma/client";
import prisma from "@/libs/db";
import dayjs from "dayjs";
import relativeTiem from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTiem);
interface Props {
  room: Room & Participants;
}

interface Participants {
  participants: User[];
}

async function CardRoom({ room }: Props) {
  let topic: Topic | null = null;
  let user: User | null = null;
  if (room.topicId && room.hostId) {
    topic = await prisma.topic.findFirst({
      where: {
        id: room.topicId,
      },
    });
    user = await prisma.user.findFirst({
      where: {
        id: room.hostId,
      },
    });
  }

  return (
    <div className="bg-emerald-700 rounded-lg px-4 md:px-8 py-5 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <AvatarLink type="feed" user={user} />
        </div>
        <span className="text-xs md:text-sm text-slate-300">
          {dayjs(room.createdAt).fromNow()}
        </span>
      </div>

      <div className="text-lg mt-2 mb-4 hover:underline">{room.name}</div>

      <div className="flex justify-between items-center pt-2 border-t border-black/50">
        <div className="flex gap-2 items-center">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-sm text-slate-300">
            {room.participants.length} Joined
          </span>
        </div>
        <span className="bg-black/50 rounded-3xl text-sm py-1 px-3 capitalize">
          {topic?.name}
        </span>
      </div>
    </div>
  );
}

export default CardRoom;
