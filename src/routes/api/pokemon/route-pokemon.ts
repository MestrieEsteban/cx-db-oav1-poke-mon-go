import { Router, Request, Response } from 'express';
import { BAD_REQUEST, CREATED } from '../../../core/constants/api';
import { error, success } from '../../../core/helpers/response';

const api = Router();

api.get('/', async (req: Request, res: Response) => {
  try {
    res.status(CREATED.status).json(success('ok'));
  } catch (err) {
    res.status(BAD_REQUEST.status).json(error(BAD_REQUEST, err));
  }
});

export default api;
