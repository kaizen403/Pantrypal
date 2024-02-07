import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, password, roomno } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      roomno: number;
    };
    const hashed_password = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        room: roomno,
      },
    });
    console.log(user);

    return NextResponse.json({
      user: {
        name: user.name,
        email: user.email,
        room: user.room,
      },
    });
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500 }
    );
  }
}
