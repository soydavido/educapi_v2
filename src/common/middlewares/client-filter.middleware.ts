import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
//import { decode } from 'jsonwebtoken';
//import { ACCESS_TOKEN_NAME } from 'src/auth/constants';

@Injectable()
export class ClientFilterMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('ClientFilterMiddleware applied to:', req.path);
    try {
      const auth = req.headers['authorization'];
      let token: string | undefined =
        auth && auth.startsWith('Bearer ')
          ? auth.substring('Bearer '.length)
          : undefined;

      if (!token) {
        const cookiesObj = (req as any)?.cookies as
          | Record<string, string>
          | undefined;
        const cookieHeader = req.headers?.cookie ?? '';
        let cookieToken: string | undefined = cookiesObj?.accessToken;
        if (!cookieToken && cookieHeader) {
          // lightweight parse for accessToken=...
          const parts = cookieHeader.split(';');
          for (const p of parts) {
            const [k, v] = p.split('=');
            //if (k && k.trim() === ACCESS_TOKEN_NAME) {
            //  cookieToken = decodeURIComponent((v ?? '').trim());
            //  break;
            //}
          }
        }
        token = cookieToken;
      }

      if (!token) return next();

      // Decode (no verification here; AuthGuard handles verification)
      const payload: any = null; //decode(token);
      if (!payload || typeof payload !== 'object') return next();

      const clientId = payload?.aud ?? payload?.clientId;
      const userId = payload?.sub;

      if (!clientId) return next();

      // Attach to request for downstream usage (guards/controllers)
      (req as any).user = { ...(req as any).user, ...payload, aud: clientId };
      (req as any).clientId = clientId;
      if (userId != null) {
        (req as any).createdByUserId = Number(userId);
        (req as any).updatedByUserId = Number(userId);
      }

      // Auto-filter: inject clienteId into query for GET list endpoints
      if (req.method === 'GET') {
        // Only set if not explicitly provided by the client
        if (!req.query || typeof req.query !== 'object') {
          (req as any).query = {};
        }
        if (!('clientId' in req.query)) {
          req.query.clientId = clientId;
        }

        // Default createdByUserId filter so BaseService.find lo procese si existe la columna
        if (userId != null && !('createdByUserId' in req.query)) {
          req.query.createdByUserId = userId;
        }
      }

      // For write operations, default clienteId and audit user on body if it's a plain object
      if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
        if (
          req.body &&
          typeof req.body === 'object' &&
          !Array.isArray(req.body)
        ) {
          if (!('clientId' in req.body)) {
            req.body.clientId = clientId;
          }

          // Audit user: createdByUserId on POST, updatedByUserId on POST/PUT/PATCH
          if (userId != null) {
            if (req.method === 'POST') {
              if (!('createdByUserId' in req.body)) {
                req.body.createdByUserId = Number(userId);
              }
              if (!('updatedByUserId' in req.body)) {
                req.body.updatedByUserId = Number(userId);
              }
            }
            if (!('updatedByUserId' in req.body)) {
              req.body.updatedByUserId = Number(userId);
            }
          }
        }
      }

      return next();
    } catch (_e) {
      return next();
    }
  }
}
