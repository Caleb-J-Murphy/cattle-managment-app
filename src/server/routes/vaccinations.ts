import { Router } from 'express';

export const vaccinationsRouter = Router();

vaccinationsRouter.get('/', (_req, res) => {
  res.json({ message: 'Vaccinations route placeholder' });
});
