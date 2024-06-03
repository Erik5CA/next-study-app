import prisma from "@/libs/db";

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    return user;
  }
  return null;
}
