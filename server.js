const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

async function main() {
  await mongoose.connect(DB);
}
main()
  .catch((err) => console.log(err))
  .then(() => console.log('connected to db '));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}!!`);
});
