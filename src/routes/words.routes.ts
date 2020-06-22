import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateWordService from '../services/CreateWordService';
import UpdateWordImageService from '../services/UpdateWordImageService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const wordsRouter = Router();
wordsRouter.use(ensureAuthenticated);

const upload = multer(uploadConfig);

wordsRouter.post('/', async (request, response) => {
  const { term, rhyme_id } = request.body;
  const createWord = new CreateWordService();

  const wordCreated = await createWord.execute({ term, rhyme_id });

  return response.json(wordCreated);
});

wordsRouter.patch(
  '/image/:word_id',
  ensureAuthenticated,
  async (request, response) => {
    const { word_id } = request.params;
    const updateWordImage = new UpdateWordImageService();
    const { image } = request.body;
    const word = await updateWordImage.execute({
      word_id,
      imageFilename: image,
    });

    return response.json(word);
  },
);

export default wordsRouter;
