-- Create the default database for development
CREATE DATABASE "default";

-- Create the tests database for e2e testing
CREATE DATABASE "test";

-- Create the metadata database
CREATE DATABASE "metadata";

-- Create a twenty user
CREATE USER twenty PASSWORD 'twenty';
ALTER USER twenty CREATEDB;
