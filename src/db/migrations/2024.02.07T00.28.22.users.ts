import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  return params.context.query(`
  CREATE TABLE users(
    id serial primary key,
    username varchar(30) unique not null ,
    password varchar(200) not null check(LENGTH(password)>=6),
    email varchar(50),
    name varchar(100) ,
    role varchar(50) not null default('user') check(role='user' or role='admin'),
    createdAt timestamp not null,
    updatedAt timestamp not null
  )
  `);
};
export const down: Migration = async (params) => {
  return params.context.query(`
  DROP TABLE users
  `
  );
};
