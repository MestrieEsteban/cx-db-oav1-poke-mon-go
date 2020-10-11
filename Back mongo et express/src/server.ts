/* eslint-disable no-undef */
import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/api';
import { connect } from './database';
import Pokemon from './database/schemas/pokemon';
import { isEmpty } from 'lodash';
import chalk from 'chalk';
import pokedex from './pokedex.json';
import cors from 'cors';

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

    await this.addPokemons();

    const app = express();
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/api', api);

    app.listen(this._port, () =>
      console.log(`Api listening ${this._host} on port ${this._port}!`),
    );
  }

  public async addPokemons(): Promise<void> {
    const poke = Pokemon.find();
    poke.exec(function(err, docs) {
      if (isEmpty(docs)) {
        pokedex.forEach((element: any) => {
          const pokemon = new Pokemon({
            pokeId: element.num,
            name: element.name,
            sprite: element.sprite,
            description: element.description,
            types: element.type,
            height: element.height,
            weight: element.weight,
            weaknesses: element.weaknesses,
            nextEvolution: element.evolution,
          });
          pokemon.save(err => {
            if (err) {
              console.log('sorry');
            }
            console.log(chalk.green(`${element.name} saved`));
          });
        });
      }
    });
  }
}
