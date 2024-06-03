import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";

export async function getRoom(id: number) {
  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
  });
  if (room) return room;

  return null;
}

export async function getRoomWithTopic(id: number) {
  const room = await prisma.room.findUnique({
    where: {
      id: id,
    },
    include: {
      topic: true,
    },
  });
  if (room) return room;

  return null;
}

export async function getRooms(query: string) {
  if (query === "") {
    const rooms = await prisma.room.findMany({
      include: {
        participants: true,
      },
    });
    const count = rooms.length;
    return { rooms, count };
  } else {
    const roomsFilter = await prisma.room.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            description: {
              contains: query,
            },
          },
          {
            topic: {
              name: {
                contains: query,
              },
            },
          },
        ],
      },
      include: {
        participants: true,
      },
    });
    const count = roomsFilter.length;
    return { rooms: roomsFilter, count };
  }
}

export async function getMessagerQueryTopic(query: string) {
  const messages = await prisma.message.findMany({
    where: {
      room: {
        topic: {
          name: {
            contains: query,
          },
        },
      },
    },
    include: {
      user: true,
      room: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return messages.slice(0, 5);
}

const messageWithUserRoom = Prisma.validator<Prisma.MessageDefaultArgs>()({
  include: { user: true, room: true },
});

export type MessageWithUserRoom = Prisma.MessageGetPayload<
  typeof messageWithUserRoom
>;

export async function getUserWithHostedRoomsAndParticipants(userId: number) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roomsHosted: {
          include: {
            participants: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

const roomsWithParticipants = Prisma.validator<Prisma.RoomDefaultArgs>()({
  include: { participants: true },
});

export type RoomsWithParticipants = Prisma.RoomGetPayload<
  typeof roomsWithParticipants
>;

export async function getInfoRoom(roomId: number) {
  const room = await prisma.room.findUnique({
    where: {
      id: roomId,
    },
    include: {
      host: true,
      topic: true,
      participants: true,
      messages: true,
    },
  });
  if (room) {
    return room;
  }
  return null;
}

export async function getInfoUser(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (user) {
    return user;
  }
  return null;
}
