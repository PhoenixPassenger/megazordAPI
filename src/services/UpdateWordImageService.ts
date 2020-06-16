import { getRepository } from 'typeorm';
import path from 'path';

import fs from 'fs';
import AppError from '../errors/AppError';

import Word from '../models/Word';

import uploadConfig from '../config/upload';

interface Request {
  word_id: string;
  imageFilename: string;
}

class UpdateWordImageService {
  public async execute({ word_id, imageFilename }: Request): Promise<Word> {
    const wordRepository = getRepository(Word);

    const word = await wordRepository.findOne(word_id);

    if (!word) {
      throw new AppError('error in word', 401);
    }

    if (word.image) {
      // delete previous image
      const wordImageFilePath = path.join(uploadConfig.directory, word.image);
      const wordImageFileExists = await fs.promises.stat(wordImageFilePath);

      if (wordImageFileExists) {
        await fs.promises.unlink(wordImageFilePath);
      }
    }

    word.image = imageFilename;

    await wordRepository.save(word);

    return word;
  }
}

export default UpdateWordImageService;
