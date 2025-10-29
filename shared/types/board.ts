import { z } from "zod";

export const writePostParamsSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.string(),
  file: z.instanceof(File).optional(),
});

export type WritePostParams = z.infer<typeof writePostParamsSchema>;
