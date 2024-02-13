"use server";
import { Item, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllItems(): Promise<Item[]> {
  try {
    const items = await prisma.item.findMany();
    return items;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export default getAllItems;
