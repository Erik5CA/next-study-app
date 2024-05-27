import { Users } from "lucide-react";
import Avatar from "../avatar/Avatar";
import AvatarLink from "../avatar/AvatarLink";

function CardRoom() {
  return (
    <div className="bg-emerald-700 rounded-lg px-4 md:px-8 py-5 mt-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <AvatarLink type="feed" />
        </div>
        <span className="text-xs md:text-sm text-slate-300">
          1 week, 6 days days ago
        </span>
      </div>

      <div className="text-lg mt-2 mb-4 hover:underline">
        Space to learn CSS
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-black/50">
        <div className="flex gap-2 items-center">
          <Users className="w-4 h-4 text-green-500" />
          <span className="text-sm text-slate-300">1 Joined</span>
        </div>
        <span className="bg-black/50 rounded-3xl text-xs py-1 px-3">CSS</span>
      </div>
    </div>
  );
}

export default CardRoom;
