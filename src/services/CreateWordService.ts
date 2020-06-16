import { getRepository } from 'typeorm';
import Word from '../models/Word';

import AppError from '../errors/AppError';

interface Request {
  word: string;
  rhyme_id: string;
}

class CreateWordService {
  public async execute({ word, rhyme_id }: Request): Promise<Word> {
    const wordRepository = getRepository(Word);
    const checkWordExists = await wordRepository.findOne({
      where: { word },
    });

    if (checkWordExists) {
      throw new AppError('Word already registered.');
    }

    const wordCreated = wordRepository.create({
      word,
      rhyme_id,
    });
    await wordRepository.save(wordCreated);
    return wordCreated;
  }
}
export default CreateWordService;
