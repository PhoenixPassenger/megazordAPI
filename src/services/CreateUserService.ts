import { getRepository } from 'typeorm';
import User from '../models/User';

import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  nickname: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    nickname,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const zeroPoints = 0;
    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = userRepository.create({
      name,
      email,
      password,
      nickname,
      points: zeroPoints,
    });
    await userRepository.save(user);
    return user;
  }
}
export default CreateUserService;
