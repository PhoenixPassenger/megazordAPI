import { getRepository } from 'typeorm';
import Word from '../models/Word';

import AppError from '../errors/AppError';

interface Request {
  term: string;
  rhyme_id: string;
}

class CreateWordService {
  public async execute({ term, rhyme_id }: Request): Promise<Word> {
    const wordRepository = getRepository(Word);
    const checkWordExists = await wordRepository.findOne({
      where: { term },
    });

    if (checkWordExists) {
      throw new AppError('Word already registered.');
    }

    const wordCreated = wordRepository.create({
      term,
      rhyme_id,
    });
    await wordRepository.save(wordCreated);
    return wordCreated;
  }
}
export default CreateWordService;
