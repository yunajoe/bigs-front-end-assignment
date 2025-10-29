import { z } from "zod";

const writePostParamsSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  file: z.instanceof(File).optional(),
});

export type WritePostParams = z.infer<typeof writePostParamsSchema>;

const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  createdAt: z.string(),
});

export type Post = z.infer<typeof postSchema>;

const postItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().nullable(),
  boardCategory: z.string(),
  createdAt: z.string(),
});

export type PostItem = z.infer<typeof postItemSchema>;
