import Avatar from "../avatar/Avatar";
import AvatarLink from "../avatar/AvatarLink";

function Activity() {
  return (
    <div className="rounded-md border-[2px] border-slate-900 p-3 mb-3">
      <div className="flex gap-3 items-center font-medium text-gray-800">
        <AvatarLink type="activity">
          <span className="text-slate-300 font-medium text-xs block lg:text-sm">
            2 weeks ago
          </span>
        </AvatarLink>
      </div>
      <div className="text-xs lg:text-sm">
        <p className="text-slate-300 mb-2 text-center">
          replied post{" "}
          <span className="text-emerald-400 hover:underline">
            Space to learn CSS
          </span>
        </p>
        <div className="bg-slate-900/40 p-2 rounded-md">
          <p>mensaje</p>
        </div>
      </div>
    </div>
  );
}

export default Activity;
