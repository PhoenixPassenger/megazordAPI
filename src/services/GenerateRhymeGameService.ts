/* eslint-disable no-await-in-loop */
import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Word from '../models/Word';

import Rhyme from '../models/Rhyme';

interface Request {
  numberOfRhymes: number;
  numberOfWords: number;
}

class GenerateRhymeGameService {
  public async execute({
    numberOfRhymes,
    numberOfWords,
  }: Request): Promise<Word[][]> {
    const rhymeRepository = getRepository(Rhyme);
    const wordRepository = getRepository(Word);

    const game = [];

    const rhymes = await rhymeRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .getMany();
    if (rhymes.length < numberOfRhymes) {
      throw new AppError('Not enougth rhymes', 500);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numberOfRhymes; i++) {
      const words = await wordRepository
        .createQueryBuilder()
        .where({ rhyme_id: rhymes[i].id })
        .limit(numberOfWords)
        .orderBy('RANDOM()')
        .getMany();
      game.push(words);
    }
    return game;
  }
}

export default GenerateRhymeGameService;
