import z from "zod"

export const board_cardSchema = z.object({
  title: z.string().max(30),
  order:z.number().default(0)
});

export type Board_card = z.infer<typeof board_cardSchema>;
