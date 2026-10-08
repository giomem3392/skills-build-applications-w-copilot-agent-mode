import mongoose, { type Model } from 'mongoose';
import { Router, type RequestHandler } from 'express';

export function createResourceRouter<T>(model: Model<T>, sort: Record<string, 1 | -1> = {}) {
  const router = Router();
  const requireObjectBody: RequestHandler = (request, response, next) => {
    if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
      response.status(400).json({ error: 'Request body must be a JSON object' });
      return;
    }
    next();
  };

  router.use((_request, response, next) => {
    if (mongoose.connection.readyState !== 1) {
      response.status(503).json({ error: 'Database is not available' });
      return;
    }
    next();
  });

  router.get('/', async (_request, response) => {
    const records = await model.find().sort(sort).lean();
    response.json(records);
  });

  router.get('/:id', async (request, response) => {
    const record = await model.findById(request.params.id).lean();
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }
    response.json(record);
  });

  router.post('/', requireObjectBody, async (request, response) => {
    const record = await model.create(request.body);
    response.status(201).json(record);
  });

  router.put('/:id', requireObjectBody, async (request, response) => {
    const record = await model.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }
    response.json(record);
  });

  router.delete('/:id', async (request, response) => {
    const record = await model.findByIdAndDelete(request.params.id);
    if (!record) {
      response.status(404).json({ error: 'Record not found' });
      return;
    }
    response.status(204).end();
  });

  return router;
}
