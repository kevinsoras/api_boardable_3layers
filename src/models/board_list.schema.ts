
import z from "zod"

export const board_listSchema = z.object({
  title: z.string().max(30),
});

export type Board_list = z.infer<typeof board_listSchema>;
