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

    function validateEmail(): boolean {
      const re = new RegExp(
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
      return re.test(String(email).toLowerCase());
    }

    const checkValidEmail = validateEmail();

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    const checkUserNicknameExists = await userRepository.findOne({
      where: { nickname },
    });

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    if (checkValidEmail) {
      throw new AppError('Invalid email address.');
    }

    if (checkUserNicknameExists) {
      throw new AppError('Nickname already used.');
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
