import { z } from "zod";

const ItemformSchema = z.object({
  itemname: z.string(),

  imageurl: z.string(),
  quantity: z
    .string()
    .regex(/^\d+$/, "Expected integer for quantity")
    .transform((val) => parseInt(val, 10)),
  price: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Expected number for price")
    .transform((val) => parseFloat(val)),

});

export default ItemformSchema;
