import {Pool} from "pg";

const pool = new Pool({
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT) || 5432,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    // THIS EXPLICIT SSL OBJECT BLOCK FOR AWS:
    ssl: {
    rejectUnauthorized: false // Tells node-postgres to accept Amazon's internal cloud certificates
  }
});

export default pool;