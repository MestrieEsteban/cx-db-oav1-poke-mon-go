/* eslint-disable no-undef */
import express from 'express';
import bodyParser from 'body-parser';
import api from './routes/api';
import { connect } from './database';
import Pokemon from './database/schemas/pokemon';
import { isEmpty } from 'lodash';

export default class Server {
  private _host: string;
  private _port: number;

  public constructor(host: string, port: number) {
    this._host = host;
    this._port = port;
  }

  public async run(): Promise<void> {
    await connect(process.env.DB_HOST as string);
    console.log('Database connected');

    const poke = Pokemon.find();
    poke.exec(function(err, docs) {
      if (isEmpty(docs)) {
        const pokemon = new Pokemon({ name: 'Esteban' });
        pokemon.save(err => {
          if (err) {
            console.log('sorry');
          }

          console.log('pokemon saved!');
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
