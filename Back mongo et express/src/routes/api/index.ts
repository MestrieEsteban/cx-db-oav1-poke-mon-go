import { Router, Request, Response } from 'express';
import pokemon from './pokemon/route-pokemon';

const api = Router();

api.get('/', (req: Request, res: Response) => {
  res.json({
    hello: 'Api',
    meta: {
      status: 'running',
      version: '1.0.0',
    },
  });
});

api.use('/pokemons', pokemon);

export default api;
