import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import rhymesRouter from './rhymes.routes';
import wordsRouter from './words.routes';
import gameRouter from './game.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/rhymes', rhymesRouter);
routes.use('/words', wordsRouter);
routes.use('/game', gameRouter);

export default routes;
