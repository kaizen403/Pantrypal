import { z } from "zod";

const ItemformSchema = z.object({
  itemname: z.string(),
  seller: z.string(),
  imageurl: z.string(),
  quantity: z.number().int(), // Ensure it's an integer
  price: z.number(), // This can be a float, so no need to specify integer
  sellstart: z.date(), // For handling DateTime, Zod has a date schema
});

export default ItemformSchema;
