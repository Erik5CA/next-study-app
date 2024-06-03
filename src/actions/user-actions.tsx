"use server";

import prisma from "@/libs/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUser(formData: FormData) {
  const name = formData.get("name")?.toString();
  const bio = formData.get("bio")?.toString();
  const email = formData.get("userEmail")?.toString();

  if (!name || !bio || !email) return;

  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      name: name,
      bio: bio,
    },
  });
  console.log(user);
  revalidatePath(`/profile/${user.id}`);
  redirect(`/profile/${user.id}`);
}
