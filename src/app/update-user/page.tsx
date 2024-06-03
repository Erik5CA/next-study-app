import { updateUser } from "@/actions/user-actions";
import { getUser } from "@/database/user";
import { getServerSession } from "next-auth";
import Link from "next/link";

async function UpdateUser() {
  const session = await getServerSession();
  const user = await getUser(session?.user?.email || "");
  return (
    <form
      className="flex items-center p-5 mx-auto justify-center"
      action={updateUser}
    >
      <div className=" bg-emerald-700 rounded-md h-min">
        <div className="flex justify-between items-center bg-emerald-900 rounded-t-md p-3">
          <h3 className="uppercase text-sm">Edit your profile</h3>
        </div>
        <div className="p-5">
          <label htmlFor="name" className="text-sm text-slate-300">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
            defaultValue={user?.name}
          />

          <label htmlFor="bio" className="text-sm text-slate-300">
            Biographi
          </label>
          <textarea
            name="bio"
            className="w-full rounded-sm border border-white/50 bg-transparent text-base p-2 mb-2"
            defaultValue={user?.bio || ""}
          />

          <input
            type="hidden"
            name="userEmail"
            value={session?.user?.email || ""}
          />

          <div className="flex gap-2 justify-end">
            <button
              type="submit"
              className="bg-green-700 text-white font-bold rounded-md p-3 shadow-sm hover:bg-green-600"
            >
              Update
            </button>
            <Link
              href={`/profile/${user?.id}`}
              className="bg-teal-800 text-white font-bold rounded-md p-3 shadow-sm hover:bg-teal-700"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateUser;
