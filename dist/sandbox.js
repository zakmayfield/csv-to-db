require('dotenv').config();
const fs = require('fs');
const csv = require('csv-parser');
const stream = fs.createReadStream('./src/data/testCSV.csv').pipe(csv());
async function readRows() {
    for await (const row of stream) {
        console.log(row);
    }
}
readRows();
export {};
//# sourceMappingURL=sandbox.js.map