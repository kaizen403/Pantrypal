import { Lucia, Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

import { cache } from "react";
import { cookies } from "next/headers";

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
export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);
    // next.js throws when you attempt to set cookie when rendering page
    try {
      if (result.session && result.session.fresh) {
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
      if (!result.session) {
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      }
    } catch {}
    return result;
  }
);
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
