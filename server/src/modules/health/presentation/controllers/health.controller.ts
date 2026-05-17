import { Controller, Get, Header } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiOkResponse, ApiHeader, ApiBearerAuth } from "@nestjs/swagger";
import { HealthService } from "../../infrastructure/services/health.service";

@ApiTags("Health")

@Controller("health")
export class HealthController {
    constructor(private readonly healthService: HealthService) { }

@Get()
  @Header("Content-Type", "text/html")
  @ApiOperation({ summary: "Check API health" })
  @ApiOkResponse({
    description: "API is healthy",
  })
  @ApiHeader({
    name: "x-request-id",
    description: "Request tracking ID",
    required: false,
  })
  @ApiBearerAuth()
  getHealth(): string {
    const health = this.healthService.getHealth();

    return `
    <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Blue Sky Hub — Server Health</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;800&display=swap" rel="stylesheet"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --sky:#0ea5e9;--sky-dim:#0284c7;--sky-dark:#0c4a6e;
  --teal:#06b6d4;--teal-dim:#0e7490;
  --bg:#020c18;--surface:#061424;--surface2:#0a1f35;
  --border:#0ea5e940;--border2:#0ea5e920;
  --text:#e0f2fe;--muted:#94a3b8;--dim:#475569;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:'Space Mono',monospace;overflow:hidden}
body{display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;min-height:100vh}

/* Grid background */
body::before{
  content:'';position:fixed;inset:0;
  background-image:
    linear-gradient(var(--border2) 1px,transparent 1px),
    linear-gradient(90deg,var(--border2) 1px,transparent 1px);
  background-size:40px 40px;
  pointer-events:none;
}

/* Vignette */
body::after{
  content:'';position:fixed;inset:0;
  background:radial-gradient(ellipse at center,transparent 40%,var(--bg) 100%);
  pointer-events:none;
}

.page{
  position:relative;z-index:10;
  width:100%;max-width:900px;padding:24px;
  display:grid;grid-template-columns:320px 1fr;gap:24px;
  align-items:start;
}

/* Left panel */
.left{display:flex;flex-direction:column;gap:20px}

.brand{display:flex;align-items:center;gap:10px;margin-bottom:4px}
.brand-icon{
  width:36px;height:36px;border-radius:10px;
  background:linear-gradient(135deg,var(--sky),var(--teal));
  display:flex;align-items:center;justify-content:center;
  font-family:'Syne',sans-serif;font-weight:800;font-size:14px;color:#fff;
  letter-spacing:-0.5px;
}
.brand-name{font-family:'Syne',sans-serif;font-weight:800;font-size:16px;letter-spacing:-0.3px;color:var(--text)}
.brand-sub{font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:1px}

/* Radar */
.radar-wrap{position:relative;width:280px;height:280px;margin:0 auto}
.radar-svg{width:100%;height:100%;overflow:visible}
.radar-ring{fill:none;stroke:var(--border);stroke-width:1}
.radar-cross{stroke:var(--border);stroke-width:0.5}
.sweep{transform-origin:140px 140px;animation:sweep 3s linear infinite}
@keyframes sweep{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.blip{animation:blip-fade 3s linear infinite}
.blip:nth-child(2){animation-delay:0.8s}
.blip:nth-child(3){animation-delay:1.9s}
.blip:nth-child(4){animation-delay:2.4s}
@keyframes blip-fade{0%,60%{opacity:0}70%{opacity:1}100%{opacity:0}}
.center-dot{fill:var(--sky);filter:drop-shadow(0 0 6px var(--sky))}
.center-ring{fill:none;stroke:var(--sky);stroke-width:1.5;animation:center-pulse 2s ease-out infinite}
@keyframes center-pulse{0%{r:6;opacity:1}100%{r:22;opacity:0}}

/* Status badge */
.status-badge{
  display:flex;align-items:center;gap:10px;
  padding:12px 16px;border-radius:12px;
  background:var(--surface);border:1px solid #22c55e30;
}
.dot-live{
  width:10px;height:10px;border-radius:50%;
  background:#22c55e;
  box-shadow:0 0 0 0 #22c55e80;
  animation:live 2s ease-out infinite;
  flex-shrink:0;
}
@keyframes live{
  0%{box-shadow:0 0 0 0 #22c55e80}
  70%{box-shadow:0 0 0 8px transparent}
  100%{box-shadow:0 0 0 0 transparent}
}
.status-text{flex:1}
.status-label{font-size:11px;color:var(--muted);letter-spacing:2px;text-transform:uppercase}
.status-value{font-size:14px;font-weight:700;color:#22c55e;margin-top:2px}
.status-time{font-size:10px;color:var(--dim);margin-top:1px;font-family:'Space Mono',monospace}

/* Right panel */
.right{display:flex;flex-direction:column;gap:16px;padding-top:60px}
.section-label{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:10px}

/* Metrics */
.metric-grid{display:flex;flex-direction:column;gap:10px}
.metric{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:10px;padding:14px 16px;
  display:flex;align-items:center;gap:12px;
  position:relative;overflow:hidden;
}
.metric::before{
  content:'';position:absolute;left:0;top:0;bottom:0;width:3px;
  background:var(--sky);border-radius:3px 0 0 3px;
}
.metric.warn::before{background:#f59e0b}
.metric.ok::before{background:#22c55e}
.metric::after{
  content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(14,165,233,0.06),transparent);
  animation:scan-metric 4s linear infinite;
}
.metric:nth-child(2)::after{animation-delay:0.8s}
.metric:nth-child(3)::after{animation-delay:1.6s}
.metric:nth-child(4)::after{animation-delay:2.4s}
@keyframes scan-metric{from{left:-100%}to{left:200%}}
.metric-icon{font-size:18px;color:var(--sky);flex-shrink:0;width:20px;text-align:center}
.metric-body{flex:1}
.metric-name{font-size:11px;color:var(--muted);letter-spacing:1.5px;text-transform:uppercase}
.metric-val{font-size:15px;font-weight:700;color:var(--text);margin-top:2px}
.metric-bar-wrap{height:3px;background:var(--border2);border-radius:2px;margin-top:6px;overflow:hidden}
.metric-bar{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--sky-dim),var(--sky))}
.metric-bar.green{background:linear-gradient(90deg,#16a34a,#22c55e)}
.metric-bar.amber{background:linear-gradient(90deg,#b45309,#f59e0b)}
.badge{
  font-size:10px;padding:3px 8px;border-radius:6px;font-weight:700;
  letter-spacing:1px;text-transform:uppercase;flex-shrink:0;
}
.badge.ok{background:#22c55e18;color:#22c55e;border:1px solid #22c55e30}
.badge.warn{background:#f59e0b18;color:#f59e0b;border:1px solid #f59e0b30}
.badge.live{background:var(--sky-dark);color:var(--sky);border:1px solid var(--border)}

/* Terminal */
.terminal{
  background:var(--surface);border:1px solid var(--border2);
  border-radius:10px;padding:14px;font-size:11px;line-height:1.8;
  color:var(--dim);position:relative;overflow:hidden;
}
.terminal::before{
  content:'';position:absolute;inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 28px,rgba(14,165,233,0.02) 28px,rgba(14,165,233,0.02) 29px);
  pointer-events:none;
}
.log-line{display:flex;gap:8px}
.log-ts{color:var(--sky-dim);flex-shrink:0}
.log-ok{color:#22c55e}
.log-info{color:var(--sky)}
.log-warn{color:#f59e0b}
.cursor{
  display:inline-block;width:7px;height:11px;
  background:var(--sky);margin-left:2px;vertical-align:-1px;
  animation:blink 1s steps(1) infinite;
}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}

/* Top bar */
.topbar{
  position:absolute;top:24px;left:50%;transform:translateX(-50%);
  width:calc(100% - 48px);max-width:900px;
  display:flex;align-items:center;justify-content:space-between;
  z-index:20;padding:10px 16px;
  background:var(--surface2);border:1px solid var(--border2);
  border-radius:12px;
}
.topbar-left{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted);letter-spacing:1px}
.topbar-dot{width:6px;height:6px;border-radius:50%;background:var(--sky);box-shadow:0 0 6px var(--sky)}
.topbar-right{font-size:11px;color:var(--dim);letter-spacing:0.5px;font-family:'Space Mono',monospace}

/* Scan overlay */
.scan-overlay{
  position:fixed;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--sky),transparent);
  animation:full-scan 6s linear infinite;
  z-index:5;opacity:0.6;
}
@keyframes full-scan{
  0%{top:-2px;opacity:0.6}
  90%{opacity:0.6}
  100%{top:100vh;opacity:0}
}

@media(max-width:680px){
  .page{grid-template-columns:1fr;padding:16px}
  .right{padding-top:0}
  .radar-wrap{width:220px;height:220px}
}
</style>
</head>
<body>
<div class="scan-overlay"></div>

<div class="topbar">
  <div class="topbar-left">
    <div class="topbar-dot"></div>
    BSH-SECURE / ENDPOINT-HEALTH / v4.2.1
  </div>
  <div class="topbar-right" id="clock">12:15:45 PM IST</div>
</div>

<div class="page">
  <!-- LEFT -->
  <div class="left">
    <div class="brand">
      <div class="brand-icon">BS</div>
      <div>
        <div class="brand-name">Blue Sky Hub</div>
        <div class="brand-sub">Security Operations</div>
      </div>
    </div>

    <div class="radar-wrap">
      <svg class="radar-svg" viewBox="0 0 280 280">
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.2"/>
            <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0"/>
          </radialGradient>
        </defs>

        <circle cx="140" cy="140" r="80" fill="url(#center-glow)"/>

        <circle cx="140" cy="140" r="30" class="radar-ring"/>
        <circle cx="140" cy="140" r="60" class="radar-ring"/>
        <circle cx="140" cy="140" r="90" class="radar-ring"/>
        <circle cx="140" cy="140" r="120" class="radar-ring"/>

        <line x1="140" y1="20" x2="140" y2="260" class="radar-cross"/>
        <line x1="20" y1="140" x2="260" y2="140" class="radar-cross"/>
        <line x1="55" y1="55" x2="225" y2="225" class="radar-cross" stroke-dasharray="3,6"/>
        <line x1="225" y1="55" x2="55" y2="225" class="radar-cross" stroke-dasharray="3,6"/>

        <g class="sweep">
          <path d="M140 140 L140 20" stroke="#0ea5e9" stroke-width="1.5" opacity="0.8"/>
          <path d="M140 140 L260 140" stroke="#0ea5e9" stroke-width="0.5" opacity="0.3"/>
        </g>

        <g class="blip"><circle cx="185" cy="105" r="3" fill="#22c55e"/><circle cx="185" cy="105" r="6" fill="#22c55e" opacity="0.2"/></g>
        <g class="blip"><circle cx="95" cy="170" r="2.5" fill="#0ea5e9"/><circle cx="95" cy="170" r="5" fill="#0ea5e9" opacity="0.2"/></g>
        <g class="blip"><circle cx="200" cy="175" r="2" fill="#0ea5e9"/></g>
        <g class="blip"><circle cx="115" cy="85" r="2.5" fill="#22c55e"/><circle cx="115" cy="85" r="5" fill="#22c55e" opacity="0.2"/></g>

        <circle cx="140" cy="140" class="center-ring" r="6"/>
        <circle cx="140" cy="140" r="5" class="center-dot"/>
        <circle cx="140" cy="140" r="2" fill="#fff"/>

        <text x="142" y="25" fill="#0ea5e9" font-size="8" font-family="Space Mono" opacity="0.6">N</text>
        <text x="258" y="143" fill="#0ea5e9" font-size="8" font-family="Space Mono" opacity="0.6">E</text>
      </svg>
    </div>

    <div class="status-badge">
      <div class="dot-live"></div>
      <div class="status-text">
        <div class="status-label">System Status</div>
        <!-- Replace with: ${health.status} -->
        <div class="status-value">OPERATIONAL</div>
        <!-- Replace with: ${health.timestamp} -->
        <div class="status-time" id="ts">Initializing...</div>
      </div>
      <div class="badge ok">LIVE</div>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="right">
    <div>
      <div class="section-label">Infrastructure Diagnostics</div>
      <div class="metric-grid">

        <div class="metric ok">
          <div class="metric-icon">⬡</div>
          <div class="metric-body">
            <div class="metric-name">CPU Load</div>
            <div class="metric-val">12.4%</div>
            <div class="metric-bar-wrap"><div class="metric-bar green" style="width:12.4%"></div></div>
          </div>
          <div class="badge ok">Nominal</div>
        </div>

        <div class="metric">
          <div class="metric-icon">◈</div>
          <div class="metric-body">
            <div class="metric-name">Memory Usage</div>
            <div class="metric-val">3.1 GB / 16 GB</div>
            <div class="metric-bar-wrap"><div class="metric-bar" style="width:19%"></div></div>
          </div>
          <div class="badge live">19%</div>
        </div>

        <div class="metric warn">
          <div class="metric-icon">◎</div>
          <div class="metric-body">
            <div class="metric-name">Disk I/O</div>
            <div class="metric-val">68 MB/s</div>
            <div class="metric-bar-wrap"><div class="metric-bar amber" style="width:68%"></div></div>
          </div>
          <div class="badge warn">Elevated</div>
        </div>

        <div class="metric ok">
          <div class="metric-icon">⬦</div>
          <div class="metric-body">
            <div class="metric-name">Network Latency</div>
            <div class="metric-val">2ms avg</div>
            <div class="metric-bar-wrap"><div class="metric-bar green" style="width:4%"></div></div>
          </div>
          <div class="badge ok">Optimal</div>
        </div>

      </div>
    </div>

    <div>
      <div class="section-label">Audit Log</div>
      <div class="terminal">
        <div class="log-line"><span class="log-ts">[08:21:04]</span><span class="log-ok">✓ TLS handshake verified — cert valid 89d</span></div>
        <div class="log-line"><span class="log-ts">[08:21:07]</span><span class="log-info">→ Health endpoint polled — 200 OK (1ms)</span></div>
        <div class="log-line"><span class="log-ts">[08:21:09]</span><span class="log-ok">✓ Firewall rules applied — 0 threats blocked</span></div>
        <div class="log-line"><span class="log-ts">[08:21:12]</span><span class="log-warn">⚠ Disk I/O spike — threshold 65 MB/s exceeded</span></div>
        <div class="log-line"><span class="log-ts">[08:21:15]</span><span class="log-info">→ Auto-sweep completed — all nodes reachable</span></div>
        <div class="log-line"><span class="log-ts" id="live-ts">[08:21:18]</span><span class="log-ok">✓ System healthy — uptime 14d 06h 42m</span><span class="cursor"></span></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>
    `;
  }
}