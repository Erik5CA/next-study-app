import FormRoom from "@/components/room/FormRoom";
import prisma from "@/libs/db";

async function getTopics() {
  const topics = await prisma.topic.findMany();
  return topics;
}

async function CreateRoom() {
  const topics = await getTopics();

  return (
    <div className="flex items-center p-5 mx-auto justify-center">
      <FormRoom topics={topics} />
    </div>
  );
}

export default CreateRoom;
