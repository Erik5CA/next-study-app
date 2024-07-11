import AvatarLink from "../avatar/AvatarLink";
import { MessageWithUser } from "@/database/rooms";
import { timeAgo } from "@/libs/utils";

function MessageUser({ message }: { message: MessageWithUser }) {
  // const user = await getInfoUser(message.userId);
  return (
    <div className="px-2 border-l-2 border-green-500 my-2">
      <div className="flex justify-between items-center gap-1">
        <AvatarLink type="message" user={message.user} />
        <span className="text-sm text-slate-300">
          {timeAgo(message.createdAt).fromNow()}
        </span>
      </div>
      <p className="text-sm lg:text-base text-slate-200 mt-1">{message.body}</p>
    </div>
  );
}

export default MessageUser;
