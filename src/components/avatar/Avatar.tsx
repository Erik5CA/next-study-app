// "use client";
import { cn } from "@/libs/utils";
import Image from "next/image";

interface Props {
  type?: string;
  name?: string | null;
}

function Avatar({ type, name }: Props) {
  // console.log(size);

  return (
    <div className="relative inline-block rounded-full border-[2px] border-blue-600 z-0">
      <Image
        src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${name}`}
        alt="avatar"
        width={20}
        height={20}
        className={cn("w-8 h-8 rounded-full", {
          "w-14 h-14": type === "profile",
          "w-6 h-6": type === "message",
        })}
      />
      <span className="absolute bottom-0 -right-2 z-50 border-[4px] border-emerald-600 bg-green-500 w-4 h-4 rounded-full"></span>
    </div>
  );
}

export default Avatar;
