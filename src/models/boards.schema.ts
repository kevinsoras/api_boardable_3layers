
import z from "zod"

export const boardsSchema = z.object({
  title: z.string().max(20),
  color: z.string().max(20),
});
export const paginationBoards = z.object({
  //page: z.coerce.number().int().positive().default(1),
  //limit: z.coerce.number().int().positive().default(10),
  //username:z.optional(z.string()),
  "sorty-by": z.enum(["createdAt", "title"]).default("createdAt"),
  "order": z.enum(["asc", "desc"]).default("desc"),
});
export type Boards = z.infer<typeof boardsSchema>;
export type PaginationBoards = z.infer<typeof paginationBoards>;