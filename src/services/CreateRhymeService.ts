import { getRepository } from 'typeorm';
import Rhyme from '../models/Rhyme';
import AppError from '../errors/AppError';

interface Request {
  syllable: string;
}

class CreateRhymeService {
  public async execute({ syllable }: Request): Promise<Rhyme> {
    const rhymeRepository = getRepository(Rhyme);
    const checkRhymeExists = await rhymeRepository.findOne({
      where: { syllable },
    });

    if (checkRhymeExists) {
      throw new AppError('This syllable is already registered.');
    }

    const rhyme = rhymeRepository.create({
      syllable,
    });
    await rhymeRepository.save(rhyme);
    return rhyme;
  }
}
export default CreateRhymeService;
