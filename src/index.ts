/* eslint-disable no-undef */
import mongoose from 'mongoose';
import chalk from 'chalk';
import pokemons from 'json-pokemon';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import getPokemons from 'json-pokemon/getPokemon';


mongoose
  .connect('mongodb://localhost:27017', {
    useNewUrlParser: true,
  })
  .catch(err => {
    console.log(err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(chalk.green('Connected🐱‍👤'));
  console.log(pokemons[0]);
});
