import prisma from "@/libs/db";
import CardRoom from "./CardRoom";
import { Room, User, Prisma } from "@prisma/client";
import { RoomsWithParticipants } from "@/app/(home)/page";

interface Props {
  rooms: RoomsWithParticipants | undefined;
}

async function ListRooms({ rooms }: Props) {
  console.log(rooms);
  return (
    <div>
      {rooms?.map((room) => (
        <CardRoom room={room} key={room.id} />
      ))}
    </div>
  );
}

export default ListRooms;
