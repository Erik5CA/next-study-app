import { Message } from "@prisma/client";
import AvatarLink from "../avatar/AvatarLink";
import { getInfoUser } from "@/database/rooms";
import { timeAgo } from "@/libs/utils";

async function MessageUser({ message }: { message: Message }) {
  const user = await getInfoUser(message.userId);
  return (
    <div className="px-2 border-l-2 border-green-500 my-2">
      <div className="flex justify-between items-center gap-1">
        <AvatarLink type="message" user={user} />
        <span className="text-sm text-slate-300">
          {timeAgo(message.createdAt).fromNow()}
        </span>
      </div>
      <p className="text-sm lg:text-base text-slate-200 mt-1">{message.body}</p>
    </div>
  );
}

export default MessageUser;
