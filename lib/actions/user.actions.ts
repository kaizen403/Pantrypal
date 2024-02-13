"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUserNameById(userId: any): Promise<string | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      return user.name;
    } else {
      console.log(`User with ID ${userId} not found.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
export default getUserNameById;
