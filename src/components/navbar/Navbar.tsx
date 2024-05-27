import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import Avatar from "../avatar/Avatar";
import AvatarLink from "../avatar/AvatarLink";

function Navbar() {
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

        <div className="ml-auto relative">
          <div className="flex gap-3 items-center">
            <AvatarLink type="nav" />
            <button className="bg-transparent border-none  cursor-pointer rounded hover:bg-emerald-900">
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
