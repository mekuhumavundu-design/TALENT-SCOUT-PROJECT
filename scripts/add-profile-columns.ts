import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
await pool.query(`
  ALTER TABLE users ADD COLUMN IF NOT EXISTS full_name text;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS country text;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS phone text;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS organization text;
  ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_completed boolean NOT NULL DEFAULT false;
`);
console.log("✅ Profile columns added");
pool.end();
