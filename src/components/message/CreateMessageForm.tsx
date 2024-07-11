"use client";

import { createNewMessage } from "@/actions/message-action";
import { Send } from "lucide-react";
import { useRef } from "react";

export const CreateMessageForm = ({ roomId }: { roomId: number }) => {
  const bodyRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async (formData: FormData) => {
    await createNewMessage(formData);

    if (bodyRef.current) {
      bodyRef.current.value = "";
    }
  };

  return (
    <form
      className="w-full sticky bottom-0 flex justify-between items-center p-1 rounded-md bg-teal-600"
      action={handleSendMessage}
    >
      <input type="hidden" name="roomId" value={roomId} />
      <input
        ref={bodyRef}
        type="text"
        name="body"
        title="Send"
        className="bg-transparent border-none w-[80%] outline-none p-1 text-sm placeholder:text-slate-300"
        placeholder="Write your message here..."
      />
      <button className="bg-teal-700 flex mr-2 justify-center items-center p-1 rounded-md shadow-sm">
        <Send />
      </button>
    </form>
  );
};
