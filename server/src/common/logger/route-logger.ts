import { INestApplication } from '@nestjs/common';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { PATH_METADATA, METHOD_METADATA } from '@nestjs/common/constants';
import { RequestMethod } from '@nestjs/common';

// ─── ANSI Color Palette (BlueSky Theme) ──────────────────────────────────────
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

  // Method badge bg + fg
  bgGet:     '\x1b[48;2;0;100;220m\x1b[38;2;220;240;255m',
  bgPost:    '\x1b[48;2;22;163;74m\x1b[38;2;220;255;230m',
  bgPut:     '\x1b[48;2;202;138;4m\x1b[38;2;255;250;200m',
  bgPatch:   '\x1b[48;2;234;88;12m\x1b[38;2;255;235;210m',
  bgDelete:  '\x1b[48;2;220;38;38m\x1b[38;2;255;220;220m',
  bgHead:    '\x1b[48;2;109;40;217m\x1b[38;2;240;220;255m',
  bgOptions: '\x1b[48;2;15;118;110m\x1b[38;2;200;255;250m',
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const WIDTH = 64;

function divider(style: '━' | '┄' | '─' = '─', color = c.sky): string {
  return `${color}${style.repeat(WIDTH)}${c.reset}`;
}

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

function formatPath(path: string): string {
  const segments = path.split('/');
  return segments
    .map((seg, i) => {
      if (i === 0 && seg === '') return '';
      if (seg.startsWith(':'))
        return `${c.skyDim}:${c.iceBlue}${c.bold}${seg.slice(1)}${c.reset}`;
      if (seg === '')
        return `${c.muted}(root)${c.reset}`;
      return `${c.lightGray}${seg}${c.reset}`;
    })
    .join(`${c.muted}/${c.reset}`);
}

function routeLine(method: string, path: string): string {
  const badge   = methodBadge(method);
  const fmtPath = formatPath(path);
  const dot     = `${c.sky}◦${c.reset}`;
  return `  ${badge}  ${dot}  ${fmtPath}`;
}

function controllerHeader(prefix: string, count: number): string {
  const label = prefix === '/' ? '(root)' : prefix;
  const cnt   = `${c.muted}${count} route${count !== 1 ? 's' : ''}${c.reset}`;
  return (
    `\n  ${c.sky}◈${c.reset}  ` +
    `${c.bold}${c.iceBlue}/${label}${c.reset}  ` +
    cnt
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface RouteEntry {
  method: string;
  path:   string;
}

interface ControllerGroup {
  prefix: string;
  routes: RouteEntry[];
}

// ─── Route Logger ─────────────────────────────────────────────────────────────

export async function logRoutes(app: INestApplication): Promise<void> {
  const discovery = app.get(DiscoveryService);
  const scanner   = new MetadataScanner();

  const controllers = discovery.getControllers();
  const groups      = new Map<string, ControllerGroup>();

  for (const wrapper of controllers) {
    const { instance } = wrapper;
    if (!instance) continue;

    const controllerPath: string =
      Reflect.getMetadata(PATH_METADATA, instance.constructor) ?? '';

    const prefix = controllerPath.replace(/^\/|\/$/g, '');
    const routes: RouteEntry[] = [];

    scanner.scanFromPrototype(
      instance,
      Object.getPrototypeOf(instance),
      (methodName: string) => {
        const methodRef = instance[methodName as keyof typeof instance] as object;
        const routePath: string | undefined  = Reflect.getMetadata(PATH_METADATA, methodRef);
        const requestMethod: number | undefined = Reflect.getMetadata(METHOD_METADATA, methodRef);

        if (routePath === undefined || requestMethod === undefined) return;

        const fullPath = `/${prefix}/${routePath}`.replace(/\/+/g, '/');
        const method   = RequestMethod[requestMethod] ?? 'UNKNOWN';

        routes.push({ method, path: fullPath });
      },
    );

    if (routes.length === 0) continue;

    routes.sort((a, b) =>
      a.path === b.path
        ? a.method.localeCompare(b.method)
        : a.path.localeCompare(b.path),
    );

    const key = prefix || '/';
    if (!groups.has(key)) {
      groups.set(key, { prefix: key, routes: [] });
    }
    groups.get(key)!.routes.push(...routes);
  }

  // Sort groups alphabetically, root (/) last
  const sorted = [...groups.values()].sort((a, b) => {
    if (a.prefix === '/') return 1;
    if (b.prefix === '/') return -1;
    return a.prefix.localeCompare(b.prefix);
  });

  const totalRoutes = sorted.reduce((n, g) => n + g.routes.length, 0);

  // ── Render ─────────────────────────────────────────────────────────────────
  console.log('');
  console.log(divider('━'));
  console.log(
    `${c.skyBold}  ☁  BlueSky${c.reset}  ` +
    `${c.sky}│${c.reset}  ` +
    `${c.bold}${c.white}API Routes${c.reset}  ` +
    `${c.muted}${totalRoutes} endpoint${totalRoutes !== 1 ? 's' : ''} · ` +
    `${sorted.length} controller${sorted.length !== 1 ? 's' : ''}${c.reset}`,
  );
  console.log(divider('━'));

  for (const { prefix, routes } of sorted) {
    console.log(controllerHeader(prefix, routes.length));
    for (const { method, path } of routes) {
      console.log(routeLine(method, path));
    }
  }

  console.log('');
  console.log(divider('─', c.skyDim));
  console.log('');
}