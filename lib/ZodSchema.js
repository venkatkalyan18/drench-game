"use client";

import { z } from "zod";

export const formSchema = z.object({
  leastMovesTakenBy: z
    .string()
    .min(2, { message: "min characters can be 2" })
    .max(6, { message: "Max characters are 8" }),
});


