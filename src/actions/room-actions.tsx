"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/libs/db";

export async function createNewRoom(formData: FormData) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const topic = formData.get("topic")?.toString().toLowerCase();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  console.log({ topic, name, description });
  if (!topic || !name || !description) return;

  if (!email) return;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) return;

  const newRoom = await prisma.room.create({
    data: {
      name: name,
      description: description,
      host: {
        connect: {
          id: user.id,
        },
      },
      topic: {
        connectOrCreate: {
          where: {
            name: topic,
          },
          create: {
            name: topic,
          },
        },
      },
      participants: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  console.log(newRoom);
  revalidatePath("/");
  redirect("/");
}
