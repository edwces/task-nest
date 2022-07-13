import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      const { method, path: url } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${url} ${statusCode} ${statusMessage}`;

      if (statusCode >= 500) return this.logger.error(message);
      else if (statusCode >= 400) return this.logger.warn(message);
      else return this.logger.log(message);
    });
    next();
  }
}
