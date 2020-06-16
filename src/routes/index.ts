import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import rhymesRouter from './rymes.routes';
import wordsRouter from './words.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/rhymes', rhymesRouter);
routes.use('/words', wordsRouter);

export default routes;
