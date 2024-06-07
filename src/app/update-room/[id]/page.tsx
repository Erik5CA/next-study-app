import FormRoom from "@/components/room/FormRoom";
import { getRoomWithTopic } from "@/database/rooms";
import prisma from "@/libs/db";
import { notFound } from "next/navigation";

async function getTopics() {
  const topics = await prisma.topic.findMany();
  return topics;
}

async function UpdateRoom({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const room = await getRoomWithTopic(id);
  const topics = await getTopics();

  if (!room) notFound();

  console.log(id);
  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <FormRoom room={room} topics={topics} />
    </div>
  );
}

export default UpdateRoom;
