/* eslint-disable no-undef */
import Server from './server';
import dotenv from 'dotenv';

const main = async (): Promise<void> => {
  try {
    dotenv.config();

    const port = process.env.PORT as string;
    const host = process.env.HOST as string;

    const server = new Server(host, parseInt(port, 10));
    await server.run();
  } catch (err) {
    console.log(err.message, 'error');
    process.exit(-1);
  }
};

main();

// import mongoose from 'mongoose';
// import chalk from 'chalk';
// import pokemons from 'json-pokemon';

// mongoose
//   .connect('mongodb://localhost:27017', {
//     useNewUrlParser: true,
//   })
//   .catch(err => {
//     console.log(err);
//   });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log(chalk.green('Connected🐱‍👤'));
//   console.log(pokemons[0]);
// });
