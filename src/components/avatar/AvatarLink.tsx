import Link from "next/link";
import Avatar from "./Avatar";
import clsx from "clsx";
import { User } from "@prisma/client";

interface sessionUser {
  name: string | null;
  email: string | null;
  id: string | null;
}
interface Prop {
  type: "nav" | "feed" | "activity" | "profile";
  children?: React.ReactNode;
  user?: sessionUser | User | null;
}

function AvatarLink({ type, children, user }: Prop) {
  const size = type === "profile";
  return (
    <Link
      href={`/profile/${user?.id}`}
      className={clsx("flex gap-3 items-center font-medium", {
        "flex-col": type === "profile",
      })}
    >
      <Avatar size={size} name={user?.name} />
      <div>
        <p
          className={clsx("text-white text-xs lg:text-sm", {
            hidden: type === "feed" || type === "activity",
          })}
        >
          {user?.name}
        </p>
        <span className="text-green-500 font-medium text-xs block lg:text-sm hover:underline">
          @{user?.name}
        </span>
        {children}
      </div>
    </Link>
  );
}

export default AvatarLink;
