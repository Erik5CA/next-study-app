"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/libs/db";

export async function createNewMessage(formData: FormData) {
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) throw new Error("Somthing went wrong!!!");
  const body = formData.get("body")?.toString();
  const roomId = formData.get("roomId")?.toString();
  if (!body || !roomId) return;

  await prisma.room.update({
    where: {
      id: parseInt(roomId),
    },
    data: {
      participants: {
        connect: {
          email: email,
        },
      },
    },
  });

  const newMessage = await prisma.message.create({
    data: {
      body: body,
      user: {
        connect: {
          email: email,
        },
      },
      room: {
        connect: {
          id: parseInt(roomId),
        },
      },
    },
  });
  console.log(newMessage);
  revalidatePath(`/room/${roomId}`);
  revalidatePath(`/activity`);
}
