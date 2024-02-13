import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { generateId } from "lucia";
import { cookies } from "next/headers";
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
    console.log({ name, email, password, roomno });

    const user = await prisma.user.create({
      data: {
        id,
        name,
        email: email.toLowerCase(),
        password: hashed_password,
        room: roomno,
      },
    });

    const session = await lucia.createSession(user.id, {});

    // const session = await prisma.session.create({
    //   data: {
    //     id,
    //     userId: user.id,
    //     expiresAt: twoWeeksFromNow, // Adjust based on actual return value
    //   },
    // });

    console.log(user);
    console.log(user.id);
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

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
