import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
  CREATE TABLE boards (
    id serial PRIMARY KEY,
    title varchar(20),
    color varchar(20),
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    users_id integer REFERENCES users(id)
  );
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  DROP TABLE boards;
  `
  );
};
