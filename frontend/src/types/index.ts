import { z } from "zod";

export const productSchema = z.object({
  // extract to separate "schema" folder?
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const productsSchema = z.array(productSchema);

export const productAndItemSchema = z.object({
  product: productSchema,
  item: productSchema,
});

export type Product = z.infer<typeof productSchema>;
export type ProductAndItem = z.infer<typeof productAndItemSchema>;

export type NewProduct = Pick<Product, "title" | "price" | "quantity">;
export type EditedProduct = NewProduct & { _id: string };
