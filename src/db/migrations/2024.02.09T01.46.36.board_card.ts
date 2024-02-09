import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
  CREATE TABLE board_card (
    id serial PRIMARY KEY,
    title varchar(30),
    createdAt timestamp NOT NULL,
    updatedAt timestamp NOT NULL,
    boards_list integer REFERENCES board_list(id) ON DELETE CASCADE NOT NULL ,
    users_id integer REFERENCES users(id) NOT NULL
  );
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  DROP TABLE board_card
  `
  );
};
