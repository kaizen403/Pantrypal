import { Lucia } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";
import { env } from "process";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  getUserAttributes: (attributes) => {
    return {
      // we don't need to expose the hashed password!
      email: attributes.email,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
    };
  }
  interface Session {
    id: string;
    userId: string;
    expiresAt: Date;
    fresh: boolean;
  }
}

// declare module "lucia" {
//   interface Register {
//     Lucia: typeof lucia;
//     DatabaseSessionAttributes: DatabaseSessionAttributes;
//   }
//   interface DatabaseSessionAttributes {
//     id: string;
//     userid: string;
//     expiresAt: Date;
//   }
// }
