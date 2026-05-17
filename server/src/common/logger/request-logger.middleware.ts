import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Reuse the exact color palette from BlueSky Theme
const c = {
  reset:     '\x1b[0m',
  bold:      '\x1b[1m',
  dim:       '\x1b[2m',

  sky:       '\x1b[38;2;0;133;255m',
  skyBold:   '\x1b[1m\x1b[38;2;0;133;255m',
  skyDim:    '\x1b[38;2;100;180;255m',
  iceBlue:   '\x1b[38;2;180;220;255m',

  white:     '\x1b[97m',
  gray:      '\x1b[38;2;100;120;140m',
  lightGray: '\x1b[38;2;170;190;210m',
  muted:     '\x1b[38;2;70;90;110m',

  bgGet:     '\x1b[48;2;0;100;220m\x1b[38;2;220;240;255m',
  bgPost:    '\x1b[48;2;22;163;74m\x1b[38;2;220;255;230m',
  bgPut:     '\x1b[48;2;202;138;4m\x1b[38;2;255;250;200m',
  bgPatch:   '\x1b[48;2;234;88;12m\x1b[38;2;255;235;210m',
  bgDelete:  '\x1b[48;2;220;38;38m\x1b[38;2;255;220;220m',
  bgHead:    '\x1b[48;2;109;40;217m\x1b[38;2;240;220;255m',
  bgOptions: '\x1b[48;2;15;118;110m\x1b[38;2;200;255;250m',
};

function methodBadge(method: string): string {
  const label  = method.toUpperCase();
  const padded = ` ${label.padEnd(7)}`;
  const map: Record<string, string> = {
    GET:     c.bgGet,
    POST:    c.bgPost,
    PUT:     c.bgPut,
    PATCH:   c.bgPatch,
    DELETE:  c.bgDelete,
    HEAD:    c.bgHead,
    OPTIONS: c.bgOptions,
  };
  const bg = map[label] ?? `\x1b[48;2;80;90;110m${c.white}`;
  return `${bg}${c.bold}${padded}${c.reset}`;
}

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      let statusColor = c.lightGray;
      if (statusCode >= 200 && statusCode < 300) {
        statusColor = '\x1b[38;2;34;197;94m'; // green
      } else if (statusCode >= 300 && statusCode < 400) {
        statusColor = '\x1b[38;2;234;179;8m'; // yellow
      } else if (statusCode >= 400) {
        statusColor = '\x1b[38;2;239;68;68m'; // red
      }

      const badge = methodBadge(method);
      const dot = `${c.sky}◦${c.reset}`;
      const urlText = `${c.lightGray}${originalUrl}${c.reset}`;
      const statusText = `${statusColor}${statusCode}${c.reset}`;
      const durationText = `${c.muted}${duration}ms${c.reset}`;

      console.log(`  ${badge}  ${dot}  ${urlText}  ${c.muted}→${c.reset}  ${statusText}  ${c.muted}·${c.reset}  ${durationText}`);
    });

    next();
  }
}
