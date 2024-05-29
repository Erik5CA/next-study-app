import prisma from "@/libs/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  // console.log({ name, email, password });

  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "Password must be at least 6 character",
      },
      {
        status: 400,
      }
    );

  if (!email)
    return NextResponse.json(
      {
        message: "Email is required",
      },
      {
        status: 400,
      }
    );

  if (!name)
    return NextResponse.json(
      {
        message: "Name is required",
      },
      {
        status: 400,
      }
    );

  if (!email.includes("@"))
    return NextResponse.json(
      {
        message: "Email must be a valid email",
      },
      {
        status: 400,
      }
    );

  try {
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userFound)
      return NextResponse.json(
        {
          message: "User already exists",
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
