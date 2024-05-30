"use client";

import { signOut } from "next-auth/react";

function Logout() {
  return (
    <button
      onClick={() => signOut()}
      className="hover:bg-emerald-700 py-2 px-3 rounded-md"
    >
      Logout
    </button>
  );
}

export default Logout;
