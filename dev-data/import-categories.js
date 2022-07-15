const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Category = require('../models/category');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
async function main() {
  await mongoose.connect(DB);
}
main()
  .catch((err) => console.log(err))
  .then(() => console.log('connected to db '));

const categories = JSON.parse(
  fs.readFileSync(`${__dirname}/categories.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Category.create(categories);
    console.log('data loaded !!!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
