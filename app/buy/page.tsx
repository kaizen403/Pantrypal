import Buy from "@/components/Buy";

import getUserNameById from "@/lib/actions/user.actions";
import { lucia, validateRequest } from "@/lib/auth";
import session from "@/lib/session";
import { ActionResult } from "next/dist/server/app-render/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Form } from "react-hook-form";

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <div className="w-full min-h-screen bg-black bg-grid-blue-500/[0.2] flex flex-col items-center justify-start">
      <Buy />
      <h1 className="text-white">Hi, {getUserNameById(user?.id)}!</h1>

      <form action={logout}>
        <button className="bg-white">Sign out</button>
      </form>
    </div>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/getstarted");
}
