"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UploadButton } from "@/utils/uploadthing";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ItemformSchema from "@/lib/validation/item";
import { useState } from "react";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof ItemformSchema>>({
    resolver: zodResolver(ItemformSchema),
  });

  const [formValues, setFormValues] = useState({
    itemname: "",
    seller: "",
    imageurl: "",
    quantity: "",
    price: "",
    sellstart: "",
  });

  const onSubmit = async (data: z.infer<typeof ItemformSchema>) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData: { message: string } = await res.json();
        setError(errorData.message);
        setLoading(false);
        return;
      }

      await signIn(undefined, { callbackUrl: "/buy" });
    } catch (error) {
      console.error("Registration error:", error);
      setLoading(false);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit, control } = form;

  return (
    <Card className="mx-auto sm:mx-20 flex flex-col items-center border-blue-800  mb-2 bg-slate-900 lg:max-w-xl">
      <CardHeader className="space-y-1 text-lg text-white font-bold">
        Add Item
        <CardDescription className="text-center">
          {status === "authenticated" && <p>Hi Rishi</p>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="itemname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Item Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-800 text-white"
                        placeholder="Enter Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageurl" // Assuming 'imageurl' is the name you're using for the image URL in your form
                render={() => (
                  <FormItem>
                    <FormLabel className="text-white">Image</FormLabel>{" "}
                    {/* Label added here */}
                    <FormControl>
                      <UploadButton
                        appearance={{
                          button:
                            "ut-ready:bg-blue-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
                          container:
                            "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
                          allowedContent:
                            "flex h-8 flex-col items-center justify-center px-2 text-white",
                        }}
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          console.log(res[0].url);
                          form.setValue("imageurl", res[0].url);
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="bg-slate-800 text-white"
                        placeholder="Select"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Price"
                        {...field}
                        className="bg-slate-800 text-white"
                      />
                    </FormControl>
                    <FormDescription>Min: 0</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                style={{ backgroundColor: `${loading ? "#ccc" : null}` }}
                disabled={loading}
                className="w-full bg-blue-900"
                type="submit"
              >
                {loading ? "loading..." : "Add"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
