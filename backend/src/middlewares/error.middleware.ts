import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('Unhandled Error Caught:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Une erreur interne est survenue sur le serveur.';

  return res.status(status).json({
    error: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
}
