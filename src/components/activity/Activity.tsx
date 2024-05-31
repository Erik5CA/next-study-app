import AvatarLink from "../avatar/AvatarLink";
import { MessageWithUserRoom } from "@/database/rooms";
import { timeAgo } from "@/libs/utils";
import Link from "next/link";

function Activity({ message }: { message: MessageWithUserRoom }) {
  return (
    <div className="rounded-md border-[2px] border-slate-900 p-3 mb-3">
      <div className="flex gap-3 items-center font-medium text-gray-800">
        <AvatarLink type="activity" user={message.user}>
          <span className="text-slate-300 font-medium text-xs block lg:text-sm">
            {timeAgo(message.createdAt).fromNow()}
          </span>
        </AvatarLink>
      </div>
      <div className="text-xs lg:text-sm">
        <p className="text-slate-300 my-2 text-center">
          replied post{" "}
          <Link
            href={`/room/${message.room.id}`}
            className="text-emerald-400 hover:underline"
          >
            {message.room.name}
          </Link>
        </p>
        <div className="bg-slate-900/40 p-2 rounded-md">
          <p>{message.body}</p>
        </div>
      </div>
    </div>
  );
}

export default Activity;
