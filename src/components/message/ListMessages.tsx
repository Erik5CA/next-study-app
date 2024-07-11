"use client";
import MessageUser from "./Message";
import { useEffect, useRef } from "react";
import { MessageWithUser } from "@/database/rooms";

function ListMessages({
  messages,
}: {
  messages: MessageWithUser[] | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={ref}
      className="flex flex-col bg-slate-950 h-52 rounded-sm mt-2 p-2 overflow-y-auto"
    >
      {messages &&
        messages.map((message) => {
          return <MessageUser key={message.id} message={message} />;
        })}
    </div>
  );
}

export default ListMessages;
