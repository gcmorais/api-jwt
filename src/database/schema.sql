CREATE DATABASE nomaders;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL UNIQUE,
  password VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  name VARCHAR NOT NULL,
  ean BIGINT NOT NULL,
  platform VARCHAR NOT NULL,
  cost NUMERIC(6,2) NOT NULL,
  salePrice NUMERIC(6,2) NOT NULL,
  dateValue DATE NOT NULL
);

