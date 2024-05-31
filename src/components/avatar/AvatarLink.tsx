import Link from "next/link";
import Avatar from "./Avatar";
import clsx from "clsx";
import { User } from "@prisma/client";
import { cn } from "@/libs/utils";

interface sessionUser {
  name: string | null;
  email: string | null;
  id: string | null;
}
interface Prop {
  type: "nav" | "feed" | "activity" | "profile" | "message";
  children?: React.ReactNode;
  user?: sessionUser | User | null;
}

function AvatarLink({ type, children, user }: Prop) {
  return (
    <Link
      href={`/profile/${user?.id}`}
      className={clsx("flex gap-3 items-center font-medium", {
        "flex-col": type === "profile",
      })}
    >
      <Avatar type={type} name={user?.name} />
      <div>
        <p
          className={clsx("text-white text-xs lg:text-sm", {
            hidden:
              type === "feed" || type === "activity" || type === "message",
          })}
        >
          {user?.name}
        </p>
        <span
          className={cn(
            "text-green-500 font-medium text-xs block lg:text-sm hover:underline",
            {
              "lg:text-xs": type === "message",
            }
          )}
        >
          @{user?.name}
        </span>
        {children}
      </div>
    </Link>
  );
}

export default AvatarLink;
