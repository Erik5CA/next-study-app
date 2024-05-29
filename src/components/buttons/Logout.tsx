"use client";

import { signOut } from "next-auth/react";

function Logout() {
  return <button onClick={() => signOut()}>Logout</button>;
}

export default Logout;
