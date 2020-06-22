/* eslint-disable no-shadow */
import { Router, request, response } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ControlPointsService from '../services/ControlPointsService';
import GenerateRankingService from '../services/GenerateRankingService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password, nickname } = request.body;

  const createUserService = new CreateUserService();

  const hashedPassword = await hash(password, 8);

  const user = await createUserService.execute({
    name,
    email,
    password: hashedPassword,
    nickname,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  const updateUserAvatar = new UpdateUserAvatarService();
  const { image } = request.body;
  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: image,
  });

  return response.json(user);
});

usersRouter.patch('/points', ensureAuthenticated, async (request, response) => {
  const { points } = request.body;
  const controlPoints = new ControlPointsService();
  const user = await controlPoints.execute({
    user_id: request.user.id,
    points,
  });

  return response.json(user);
});

usersRouter.get('/ranking', async (request, response) => {
  const generateRanking = new GenerateRankingService();

  const ranking = await generateRanking.execute();
  return response.json(ranking);
});

export default usersRouter;
