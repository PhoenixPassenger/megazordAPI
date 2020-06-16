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
  const { word, rhyme_id } = request.body;
  const createWord = new CreateWordService();

  const wordCreated = createWord.execute({ word, rhyme_id });

  return response.json(wordCreated);
});

wordsRouter.patch(
  '/image',
  ensureAuthenticated,
  upload.single('image'),
  async (request, response) => {
    const { word_id } = request.body;
    const updateWordImage = new UpdateWordImageService();

    const word = await updateWordImage.execute({
      word_id,
      imageFilename: request.file.filename,
    });

    return response.json(word);
  },
);

export default wordsRouter;
