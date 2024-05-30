"use client";
import Image from "next/image";
import { clsx } from "clsx";

interface Props {
  size?: boolean;
  name?: string | null;
}

function Avatar({ size, name }: Props) {
  // console.log(size);
  return (
    <div className="relative inline-block rounded-full border-[2px] border-blue-600 z-0">
      <Image
        src={`https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${name}`}
        alt="avatar"
        width={20}
        height={20}
        className={clsx("w-8 h-8 rounded-full lg:w-10 lg:h-10", {
          "w-15 h-15 lg:w-15 lg:h-15": size === true,
        })}
      />
      <span className="absolute bottom-0 -right-2 z-50 border-[4px] border-emerald-600 bg-green-500 w-4 h-4 rounded-full"></span>
    </div>
  );
}

export default Avatar;
