import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
  CREATE TABLE board_list (
    id serial PRIMARY KEY,
    title varchar(30),
    createdAt timestamp NOT NULL,
    updatedAt timestamp NOT NULL,
    boards_id integer REFERENCES boards(id)
  );
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  DROP TABLE board_list;
  `
  );
};
