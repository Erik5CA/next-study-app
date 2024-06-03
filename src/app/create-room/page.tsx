import { createNewRoom } from "@/actions/room-actions";
import FormRoom from "@/components/room/FormRoom";
import Link from "next/link";

async function CreateRoom() {
  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <FormRoom />
    </div>
  );
}

export default CreateRoom;
