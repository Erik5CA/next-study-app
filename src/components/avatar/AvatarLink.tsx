import Link from "next/link";
import Avatar from "./Avatar";
import clsx from "clsx";

interface Prop {
  type: "nav" | "feed" | "activity" | "profile";
  children?: React.ReactNode;
}

function AvatarLink({ type, children }: Prop) {
  const size = type === "profile";
  return (
    <Link
      href="/profile/1"
      className={clsx("flex gap-3 items-center font-medium", {
        "flex-col": type === "profile",
      })}
    >
      <Avatar size={size} />
      <div>
        <p
          className={clsx("text-white text-xs lg:text-sm", {
            hidden: type === "feed" || type === "activity",
          })}
        >
          Erik
        </p>
        <span className="text-green-500 font-medium text-xs block lg:text-sm hover:underline">
          @erik
        </span>
        {children}
      </div>
    </Link>
  );
}

export default AvatarLink;
