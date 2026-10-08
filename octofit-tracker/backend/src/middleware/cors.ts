import type { NextFunction, Request, Response } from 'express';

const allowedOrigins = new Set([
  'http://localhost:5173',
  ...(process.env.CODESPACE_NAME
    ? [`https://${process.env.CODESPACE_NAME}-5173.app.github.dev`]
    : []),
]);

export function corsMiddleware(request: Request, response: Response, next: NextFunction) {
  const origin = request.get('origin');

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(origin && allowedOrigins.has(origin) ? 204 : 403);
    return;
  }

  next();
}
