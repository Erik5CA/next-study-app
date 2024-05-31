import Activity from "./Activity";
import { getMessagerQueryTopic } from "@/database/rooms";

async function ListMessagesActivity({ query }: { query: string }) {
  const messages = await getMessagerQueryTopic(query);

  return (
    <div className="p-3">
      {messages.map((message) => (
        <Activity key={message.id} message={message} />
      ))}
    </div>
  );
}

export default ListMessagesActivity;
