"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import AvatarLink from "../avatar/AvatarLink";
import Logout from "../buttons/Logout";
import { useSession } from "next-auth/react";
import { useState } from "react";
import clsx from "clsx";

interface sessionUser {
  name: string | null;
  email: string | null;
  id: string | null;
}

function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user as sessionUser;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <nav className="p-3 bg-emerald-600 w-full">
      <div className="max-w-[120rem] w-[90%] m-auto flex gap-8 lg:gap-28 items-center">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={30}
            height={30}
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <h1 className="font-bold text-xl text-white hidden lg:block hover:text-emerald-800">
            StudyBuddy
          </h1>
        </Link>

        <form className="hidden md:block">
          <label className="bg-emerald-950 py-3 px-4 flex items-center gap-4 rounded">
            <Search />
            <input
              type="text"
              placeholder="Search"
              className="w-[20rem] bg-transparent border-none outline-none text-white"
            />
          </label>
        </form>

        {status === "authenticated" ? (
          <>
            <div className="ml-auto relative">
              <div className="flex gap-3 items-center">
                <AvatarLink type="nav" user={user} />
                <button
                  className="bg-transparent border-none  cursor-pointer rounded hover:bg-emerald-900"
                  onClick={handleClick}
                >
                  <ChevronDown />
                </button>
              </div>
              <div
                className={clsx(
                  "absolute -bottom-11 right-0 bg-emerald-600 border border-white/50 rounded-md",
                  {
                    hidden: open === false,
                  }
                )}
              >
                <Logout />
              </div>
            </div>
          </>
        ) : (
          <div className="ml-auto">
            <Link
              href="/login"
              className="hover:bg-emerald-800 py-2 px-3 rounded-md"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
