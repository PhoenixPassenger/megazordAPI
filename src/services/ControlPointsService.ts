import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  user_id: string;
  points: number;
}

class ControlPointsService {
  public async execute({ user_id, points }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('error in user', 401);
    }

    user.points += points;

    await userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default ControlPointsService;
