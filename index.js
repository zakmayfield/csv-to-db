require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');

const { Pool } = require('pg');

async function csvToDb(filePath, connectionString) {
  const pool = new Pool({ connectionString });
  const client = await pool.connect();
  try {
    const stream = fs.createReadStream(filePath).pipe(csv({ delimiter: ',' }));

    for await (const row of stream) {
      const { name, email, phone } = row;
      await client.query(
        'INSERT INTO users (name, email, phone) VALUES ($1, $2, $3)',
        [name, email, phone]
      );
    }
  } catch (err) {
    console.log('error');
  } finally {
    await client.release();
    await pool.end();
  }
}

if (!process.env.CONNECTION_URL) {
  throw new Error('Please add PG connection url');
}

csvToDb('./testCSV.csv', process.env.CONNECTION_URL);
