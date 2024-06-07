import AvatarLink from "@/components/avatar/AvatarLink";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { getUserWithHostedRoomsAndParticipants } from "@/database/rooms";
import ListRoomUserHosted from "@/components/room/ListRoomUserHosted";
import ActivityList from "@/components/activity/ActivityList";
import { notFound } from "next/navigation";

async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession();
  const user = await getUserWithHostedRoomsAndParticipants(parseInt(params.id));

  if (!user) {
    notFound();
  }

  return (
    <>
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
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-bold text-sm text-emerald-400 uppercase">About</p>
          <p className="text-slate-400">
            {user?.bio ? user.bio : "Go to Edit Perfil to add Bio"}
          </p>
        </div>

        <div className="mt-4">
          <p className="font-bold text-sm text-emerald-400 uppercase">
            Room hosted by {user?.name}
          </p>
        </div>

        <ListRoomUserHosted rooms={user?.roomsHosted} />
      </div>

      <ActivityList query="" />
    </>
  );
}

export default ProfilePage;
