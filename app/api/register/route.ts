import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { generateId } from "lucia";
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
    const id = generateId(15);

    const user = await prisma.user.create({
      data: {
        id,
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        room: roomno,
      },
    });
    console.log(user);
    console.log(user.id);

    return new Response(null, {
      status: 200,
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
