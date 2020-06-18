import { Router } from 'express';

import GenerateRhymeGameService from '../services/GenerateRhymeGameService';

const gameRouter = Router();

gameRouter.post('/rhyme', async (request, response) => {
  const { numberOfRhymes, numberOfWords } = request.body;
  const generateRhymeGame = new GenerateRhymeGameService();
  console.log(`body: ${request.body}`);
  const rhyme = await generateRhymeGame.execute({
    numberOfRhymes,
    numberOfWords,
  });

  return response.json(rhyme);
});

export default gameRouter;
