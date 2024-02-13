import getUserNameById from "@/lib/actions/user.actions";
import { lucia, validateRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import session from "@/lib/session";
import { user } from "@nextui-org/react";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { itemname, imageurl, quantity, price } = (await req.json()) as {
      itemname: string;
      imageurl: string;
      quantity: number;
      price: number;
    };
    const { user } = await validateRequest();
    if (!user?.id) {
      throw new Error("User ID is missing or invalid.");
    }

    const sellerName = await getUserNameById(user.id);
    if (!sellerName) {
      throw new Error("Seller name cannot be null.");
    }

    // Directly using the destructured variables to create the item
    const item = await prisma.item.create({
      data: {
        itemname,
        imageurl,
        quantity,
        price,
        seller: sellerName,
      },
    });
    console.log("Item created successfully:", item);

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
