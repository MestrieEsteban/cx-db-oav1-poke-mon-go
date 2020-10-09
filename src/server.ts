/* eslint-disable no-undef */
import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/api';
import { connect } from './database';
import Pokemon from './database/schemas/pokemon';
import { isEmpty } from 'lodash';
import chalk from 'chalk';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const getPokemons = require('json-pokemon/getPokemon');

export default class Server {
  private _host: string;
  private _port: number;

  public constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
  }

  public async run(): Promise<void> {
    await connect(process.env.DB_HOST as string);
    console.log(chalk.green('Connected🐱‍👤'));
    const poked = getPokemons.getPokemonById(1);
    // poked.forEach((element: any) => console.log(element.name));

    console.log(poked.name);

    const poke = Pokemon.find();
    poke.exec(function(err, docs) {
      if (isEmpty(docs)) {
        const pokemon = new Pokemon({
          name: 'Esteban',
          type: ['Plante', 'Eau'],
          pokeId: 2,
        });
        pokemon.save(err => {
          if (err) {
            console.log('sorry');
          }
          console.log(chalk.green('pokemon saved!🦉'));
        });
      }
    });

    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api', api);

    app.listen(this._port, () =>
      console.log(`Api listening ${this._host} on port ${this._port}!`),
    );
  }
}
