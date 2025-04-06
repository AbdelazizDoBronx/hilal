import pg from "pg"
import env from "dotenv"

// So we can access enviroment variables
env.config();


// Initializing new conection pool using pg (postgress client)
const {Pool} = pg;
export const db = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  })


  // Lunching db
  db.connect();

  db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
  });

export const query = (text, params) => db.query(text, params);