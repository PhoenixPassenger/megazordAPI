import { Router } from 'express';

import CreateRhymeService from '../services/CreateRhymeService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rhymesRouter = Router();
rhymesRouter.use(ensureAuthenticated);

rhymesRouter.post('/', async (request, response) => {
  const { syllable } = request.body;
  const createRhyme = new CreateRhymeService();

  const rhyme = createRhyme.execute({ syllable });

  return response.json(rhyme);
});

export default rhymesRouter;
