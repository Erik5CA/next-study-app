import { Message } from "@prisma/client";
import MessageUser from "./Message";

function ListMessages({ messages }: { messages: Message[] | undefined }) {
  return (
    <div className="flex flex-col bg-slate-950 h-52 rounded-sm mt-2 p-2 overflow-y-auto">
      {messages &&
        messages.map((message) => {
          return <MessageUser key={message.id} message={message} />;
        })}
    </div>
  );
}

export default ListMessages;
