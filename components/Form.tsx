"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";

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
import { redirect, useRouter } from "next/navigation";
import formSchema from "@/lib/validation/user";
import { useState } from "react";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    roomno: "",
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        // If the server response was not ok, throw an error with the error message
        const errorData = await response.json();
        console.log("failedd");
        throw new Error(errorData.message || "An unexpected error occurred");
      }

      console.log("login successfdul");

      router.push("/buy");
    } catch (error: any) {
      // TypeScript syntax for typing `error`
      console.error("Registration error:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit, control } = form;

  return (
    <Card className="mx-auto sm:mx-20 flex flex-col items-center border-blue-800 mb-28 bg-slate-900 lg:max-w-xl">
      <CardHeader className="space-y-1">
        <CardDescription className="text-center">
          How is it safe? None of your personal data is being taken except full
          name and college mail is taken for ensuring exclusivity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-slate-800 text-white"
                        placeholder="Your name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="bg-slate-800 text-white"
                        placeholder="abc@vitapstudent.ac.in"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Must end with @vitapstudent.ac.in
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="bg-slate-800 text-white"
                      />
                    </FormControl>
                    <FormDescription>Min 6 letters</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roomno"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Room no</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Select"
                        {...field}
                        className="bg-slate-800 text-white"
                      />
                    </FormControl>

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
                {loading ? "loading..." : "Done"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
