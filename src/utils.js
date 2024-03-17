const { json } = require('express');
const fs = require('fs/promises');
const path = require('path');
const dbPath = path.resolve('data', 'db.json');

exports.readFile = async () => {
  const data = await fs.readFile(dbPath);
  const output = JSON.parse(data);
   console.log(output);
};

exports.writeFile = async (data) => {
  await fs.writeFile(dbPath, JSON.stringify(data));
};
