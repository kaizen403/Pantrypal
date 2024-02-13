import React from "react";
import { Bad_Script } from "next/font/google";
import { TextGenerateEffect } from "@/components/ani_ui/text-generate-effect";
import SellForm from "@/components/SellForm";
import { validateRequest } from "@/lib/auth";

const badscript = Bad_Script({
  weight: "400",
  style: "normal",
  display: "swap",
  subsets: ["latin"],
});
const words = `some basic detail stuff here on login page
`;
export default async function Page() {
  const { user } = await validateRequest();
  return (
    <div
      className="w-full h-screen bg-black flex flex-col items-center bg-grid-blue-500/[0.2] justify-center"
      // Ensures this is the lowest layer by using a negative z-index
    >
      <div className="z-50 ">
        <h1 className="md:text-5xl text-5xl tracking-normal lg:text-6xl font-bold text-center text-blue-600 relative z-10">
          Your Items:
        </h1>
        <div className="w-full h-2/5">items</div>
      </div>

      <div
        className="self-center flex flex-col items-center
         mt-10 lg:w-1/2 sm:w-3/4 mx-3 z-50"
      >
        {/* <h1 className="md:text-4xl mb-5 text-3xl tracking-wide lg:text-5xl font-bold text-center text-red-700 relative z-10">
          Create an Account
        </h1> */}
        <div>
          <SellForm userId={user?.id} />
        </div>
      </div>
    </div>
  );
}
