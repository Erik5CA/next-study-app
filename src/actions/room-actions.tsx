"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import prisma from "@/libs/db";
import { z } from "zod";

export type State = {
  errors?: {
    topic?: string[];
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};

const roomSchema = z.object({
  topic: z.string().min(1, {
    message: "Topic is required",
  }),
  name: z.string().min(1, {
    message: "Name of Room is required",
  }),
});

export async function createNewRoom(prevState: State, formData: FormData) {
  const session = await getServerSession();
  const email = session?.user?.email;
  const topic = formData.get("topic")?.toString().toLowerCase();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  console.log({ topic, name, description });

  const validate = roomSchema.safeParse({
    topic: topic,
    name: name,
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Room.",
    };
  }

  if (!email)
    return {
      message: "No user loggin",
    };
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user)
      return {
        message: "No found user",
      };

    const newRoom = await prisma.room.create({
      data: {
        name: validate.data.name,
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
              name: validate.data.topic,
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
  } catch (error) {
    return {
      message: "Database Error, Failed Create Room",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteRoom(formData: FormData) {
  const roomId = formData.get("roomId")?.toString();
  if (!roomId) return;
  const room = await prisma.room.delete({
    where: {
      id: parseInt(roomId),
    },
  });
  console.log(room);
  revalidatePath("/");
  redirect("/");
}

export async function updateRoom(prevState: State, formData: FormData) {
  const topic = formData.get("topic")?.toString().toLowerCase();
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const roomId = formData.get("roomId")?.toString();

  const validate = roomSchema.safeParse({
    topic: topic,
    name: name,
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Room.",
    };
  }

  if (!roomId)
    return {
      message: "No Room",
    };

  try {
    const room = await prisma.room.update({
      where: {
        id: parseInt(roomId),
      },
      data: {
        name: validate.data.name,
        description: description,
        topic: {
          connectOrCreate: {
            where: {
              name: topic,
            },
            create: {
              name: validate.data.topic,
            },
          },
        },
      },
    });
    console.log(room);
  } catch (error) {
    return {
      message: "Database Error, Failed to Update Room",
    };
  }

  revalidatePath("/");
  redirect("/");
}
