"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

function Logout() {
  return (
    <div
      className="flex justify-center items-center gap-4 hover:bg-emerald-700 py-2 px-3 rounded-md cursor-pointer"
      onClick={() =>
        signOut({
          callbackUrl: "/",
          redirect: true,
        })
      }
    >
      <LogOut />
      <button>Logout</button>
    </div>
  );
}

export default Logout;
