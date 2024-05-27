import AvatarLink from "@/components/avatar/AvatarLink";
import CardRoom from "@/components/card-room/CardRoom";
import Link from "next/link";

function ProfilePage() {
  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <AvatarLink type="profile" />
        <Link
          href="/update-user"
          className="border-[3px] border-emerald-400 text-emerald-400 font-bold text-xs md:text-sm rounded-3xl py-1 px-3"
        >
          Edit Profile
        </Link>
        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm text-emerald-400 uppercase">About</p>
          <p className="text-slate-400">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatibus quibusdam, iure doloribus temporibus omnis pariatur
            reprehenderit laudantium autem quis perferendis.
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="font-bold text-sm text-emerald-400 uppercase">
          Room hosted by Erik
        </p>

        <CardRoom />
      </div>
    </div>
  );
}

export default ProfilePage;
