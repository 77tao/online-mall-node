import mongoose from "mongoose";
import chalk from "chalk";
const url = "mongodb://zjr:123456@localhost:27017/mall-test?authSource=admin";

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log(chalk.green(" success connection to " + url));
});

export default mongoose;
