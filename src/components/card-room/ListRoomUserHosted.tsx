import { Room } from "@prisma/client";
import CardRoom from "./CardRoom";
import { RoomsWithParticipants } from "@/database/rooms";

function ListRoomUserHosted({ rooms }: { rooms: RoomsWithParticipants }) {
  return (
    <div>
      {rooms?.map((room) => (
        <CardRoom room={room} key={room.id} />
      ))}
    </div>
  );
}

export default ListRoomUserHosted;
