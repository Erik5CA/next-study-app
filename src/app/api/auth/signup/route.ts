import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const FormSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Must be a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 character",
    }),
});

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  // console.log({ name, email, password });

  const validate = FormSchema.safeParse({
    name: name,
    email: email,
    password: password,
  });

  if (!validate.success) {
    return NextResponse.json(
      {
        message: validate.error.flatten().fieldErrors,
      },
      {
        status: 400,
      }
    );
  }

  try {
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userFound)
      return NextResponse.json(
        {
          message: { user: "User already exists" },
        },
        {
          status: 400,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    // console.log(user);

    return NextResponse.json({
      name: user.name,
      email: user.email,
      id: user.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
