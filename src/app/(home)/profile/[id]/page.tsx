import AvatarLink from "@/components/avatar/AvatarLink";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getUserWithHostedRoomsAndParticipants } from "@/database/rooms";
import ListRoomUserHosted from "@/components/card-room/ListRoomUserHosted";

async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  const user = await getUserWithHostedRoomsAndParticipants(parseInt(params.id));

  return (
    <div>
      <div className="flex flex-col items-center gap-4">
        <AvatarLink type="profile" user={user} />
        {session?.user?.name === user?.name && (
          <Link
            href="/update-user"
            className="border-[3px] border-emerald-400 text-emerald-400 font-bold text-xs md:text-sm rounded-3xl py-1 px-3"
          >
            Edit Profile
          </Link>
        )}

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
          Room hosted by {user?.name}
        </p>
      </div>

      <ListRoomUserHosted rooms={user?.roomsHosted} />
    </div>
  );
}

export default ProfilePage;
