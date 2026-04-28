import { logger } from './app-logger';


const c = {
  reset:    '\x1b[0m',
  bold:     '\x1b[1m',
  dim:      '\x1b[2m',
  sky:      '\x1b[38;2;0;133;255m',
  skyBold:  '\x1b[1m\x1b[38;2;0;133;255m',
  skyDim:   '\x1b[38;2;100;180;255m',
  iceBlue:  '\x1b[38;2;180;220;255m',
  white:    '\x1b[97m',
  gray:     '\x1b[38;2;120;140;160m',
  green:    '\x1b[38;2;34;197;94m',
  greenBold:'\x1b[1m\x1b[38;2;34;197;94m',
};
 
function divider(char = '─', width = 62, color = c.sky): string {
  return `${color}${char.repeat(width)}${c.reset}`;
}
 
function infoLine(icon: string, label: string, value: string): string {
  return (
    `  ${c.sky}${icon}${c.reset}  ` +
    `${c.gray}${label.padEnd(12)}${c.reset}` +
    `${c.iceBlue}${value}${c.reset}`
  );
}
 
// ─── BlueSky ASCII wordmark (compact) ─────────────────────────────────────────
const LOGO = [
  `${c.skyBold}  ██████╗ ██╗     ██╗   ██╗███████╗███████╗██╗  ██╗██╗   ██╗${c.reset}`,
  `${c.skyBold}  ██╔══██╗██║     ██║   ██║██╔════╝██╔════╝██║ ██╔╝╚██╗ ██╔╝${c.reset}`,
  `${c.sky}  ██████╔╝██║     ██║   ██║█████╗  ███████╗█████╔╝  ╚████╔╝ ${c.reset}`,
  `${c.skyDim}  ██╔══██╗██║     ██║   ██║██╔══╝  ╚════██║██╔═██╗   ╚██╔╝  ${c.reset}`,
  `${c.dim}${c.sky}  ██████╔╝███████╗╚██████╔╝███████╗███████║██║  ██╗   ██║   ${c.reset}`,
  `${c.dim}${c.gray}  ╚═════╝ ╚══════╝ ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝   ${c.reset}`,
];
 
// ─── Startup Log ─────────────────────────────────────────────────────────────
 

export const logStartup = (port: number): void => {
  const now       = new Date();
  const timestamp = now.toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
 
  console.log('');
  console.log(divider('─', 62));
 
  for (const line of LOGO) console.log(line);
 
  console.log('');
  console.log(divider('┄', 62, c.skyDim));
  console.log('');
 
  console.log(infoLine('✦', 'Status',   `${c.greenBold}● RUNNING${c.reset}`));
  console.log(infoLine('◎', 'Server',   `http://localhost:${port}`));
  console.log(infoLine('⬡', 'Swagger',  `http://localhost:${port}/docs`));
  console.log(infoLine('◷', 'Started',  timestamp));
  console.log(infoLine('◈', 'Env',      process.env.NODE_ENV ?? 'development'));
 
  console.log('');
  console.log(divider('─', 62));
  console.log('');
 
  logger.info(`🚀 BlueSky server is live on port ${port}`);
};