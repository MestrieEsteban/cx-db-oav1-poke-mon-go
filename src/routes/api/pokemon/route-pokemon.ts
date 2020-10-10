import { Router, Request, Response } from 'express';
import { BAD_REQUEST, CREATED, OK } from '../../../core/constants/api';
import { error, successTest } from '../../../core/helpers/response';
import Pokemon from '../../../database/schemas/pokemon';

const api = Router();

api.get('/', async (req: Request, res: Response) => {
  try {
    const poke = Pokemon.find()
      .select({
        name: 1,
        type: 1,
        pokeId: 1,
        sprite: 1,
      })
      .sort([['pokeId', 1]]);
    poke.exec(function(err, docs) {
      res.status(OK.status).json(successTest(docs));
    });
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err));
  }
});

api.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const poke = Pokemon.find({ pokeId: id });
    poke.exec(function(err, docs) {
      res.status(OK.status).json(successTest(docs));
    });
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err));
  }
});

api.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const filds = req.body;
    const poke = Pokemon.updateOne({ pokeId: id }, { $set: filds });
    poke.exec(function(err, docs) {
      res.status(CREATED.status).json(successTest(docs));
    });
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err));
  }
});

api.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const poke = Pokemon.deleteOne({ pokeId: id });
    poke.exec(function(err, docs) {
      res.status(CREATED.status).json(successTest(docs));
    });
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err));
  }
});

export default api;
