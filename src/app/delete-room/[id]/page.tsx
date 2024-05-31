import { deleteRoom } from "@/actions/room-actions";
import Delete from "@/components/delete/Delete";
import { getRoom } from "@/database/rooms";

async function DeleteRoom({ params }: { params: { id: string } }) {
  const roomId = parseInt(params.id);
  const room = await getRoom(roomId);

  if (!room)
    return (
      <div className="flex items-center p-5 mx-auto justify-center">
        <p>Room not found</p>
      </div>
    );

  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <Delete name={room?.name} id={room?.id} action={deleteRoom} />
    </div>
  );
}

export default DeleteRoom;
