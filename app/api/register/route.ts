import { lucia } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { TimeSpan, generateId } from "lucia";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { addWeeks } from "date-fns";
export async function POST(req: Request) {
  try {
    const { name, email, password, roomno } = (await req.json()) as {
      name: string;
      email: string;
      password: string;
      roomno: number;
    };
    const hashed_password = await hash(password, 12);
    // const twoWeeksFromNow = addWeeks(new Date(), 2);
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
    const sessionToken = randomBytes(64).toString("hex");
    // Assuming `lucia.createSession` returns necessary session info but not the token
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
