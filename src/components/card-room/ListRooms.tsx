import CardRoom from "./CardRoom";
import { getRooms } from "@/database/rooms";

interface Props {
  query: string;
}

async function ListRooms({ query }: Props) {
  const { rooms, count } = await getRooms(query);

  return (
    <div>
      {count !== 0 ? (
        <>
          {rooms?.map((room) => (
            <CardRoom room={room} key={room.id} />
          ))}
        </>
      ) : (
        <div className="bg-emerald-600 text-center p-4 mt-3 rounded-md">
          <p className="text-sm font-semibold">
            No rooms found for <span className="italic">{query}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default ListRooms;
