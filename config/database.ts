import mysql from 'mysql2/promise';
import { superEnv } from '../auth/utils/variable';
const pool = mysql.createPool({
  host: superEnv.DB_HOST,
  user: superEnv.DB_USERNAME,
  password: superEnv.DB_PASSWORD,
  database: superEnv.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;