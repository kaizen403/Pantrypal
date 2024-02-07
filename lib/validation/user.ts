import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z
    .string()
    .email()
    .regex(/@vitapstudent\.ac\.in$/, "Must be a VITAP student email"),
  password: z.string().min(6), // You can add more criteria based on your security requirements
  roomno: z
    .string()
    .regex(/^\d+$/, "Expected number")
    .transform((val) => parseInt(val, 10)),
});

export default formSchema;
