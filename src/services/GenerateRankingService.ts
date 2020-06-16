import { getRepository } from 'typeorm';
import User from '../models/User';

import AppError from '../errors/AppError';

class GenerateRankingService {
  public async execute(): Promise<User[]> {
    const userRepository = getRepository(User);

    const users = await userRepository
      .createQueryBuilder('user')
      .select(['user.name', 'user.avatar', 'user.points'])
      .orderBy('points', 'DESC')
      .getMany();

    return users;
  }
}
export default GenerateRankingService;
