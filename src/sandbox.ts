import fs from 'fs';
import csv from 'csv-parser';

const stream = fs.createReadStream('./src/data/testCSV.csv').pipe(csv());

async function readRows() {
  for await (const row of stream) {
    console.log(row);
  }
}

readRows();
