---
title: PROC-tunnel-alternatives
tags: [procedural, tunneling, ngrok, localtunnel, networking]
type: procedural
last_executed: 2026-01-19
---

# Procedural: Tunnel Alternatives

## AGENT QUICK-REFERENCE
```bash
# When ngrok fails, use localtunnel:
npx localtunnel --port 5173
# Returns: https://[random].loca.lt
```
**Preconditions**: Node.js installed
**Common Issue**: First request shows interstitial page (click through)

---

## When ngrok Fails

### Common ngrok Failures
- Account suspended (payment issues)
- Rate limiting on free tier
- Region blocking
- Authentication errors

---

## Alternative 1: localtunnel (Recommended)

### Installation
```bash
npm install -g localtunnel
# Or use npx for one-time use
```

### Usage
```bash
npx localtunnel --port 5173
# Output: your url is: https://random-name.loca.lt
```

### Notes
- Free, no account required
- First request shows interstitial "Click to Continue" page
- URLs change each session
- Reliability: HIGH

---

## Alternative 2: Cloudflare Tunnel

### Installation
```bash
brew install cloudflared
```

### Usage
```bash
cloudflared tunnel --url http://localhost:5173
# Output: https://random.trycloudflare.com
```

### Notes
- Requires Cloudflare account for persistent tunnels
- Quick tunnels work without account
- More stable than localtunnel
- Reliability: HIGH

---

## Alternative 3: serveo.net (SSH-based)

### Usage
```bash
ssh -R 80:localhost:5173 serveo.net
# Output: Forwarding HTTP traffic from https://random.serveo.net
```

### Notes
- No installation required
- Uses SSH (already available on macOS)
- Can be unreliable at times
- Reliability: MEDIUM

---

## Alternative 4: localhost.run

### Usage
```bash
ssh -R 80:localhost:5173 localhost.run
# Output: tunneled with tls termination
```

### Notes
- Similar to serveo.net
- SSH-based, no installation
- Reliability: MEDIUM

---

## Comparison Table

| Service | Install | Account | Reliability | Speed |
|---------|---------|---------|-------------|-------|
| ngrok | Yes | Yes (free tier) | HIGH | Fast |
| localtunnel | npx | No | HIGH | Medium |
| Cloudflare | brew | Optional | HIGH | Fast |
| serveo.net | No | No | MEDIUM | Medium |
| localhost.run | No | No | MEDIUM | Medium |

---

## Quick Decision Tree

```
ngrok failed?
├── Need quick solution? -> localtunnel
├── Need reliability? -> Cloudflare tunnel
├── No install allowed? -> serveo.net via SSH
└── Temporary one-off? -> localhost.run
```

---

## Relations

- solves [[EP-blockers-resolved#Blocker 2]]
- used_in [[SESSION-2026-01-19-mui-theme-demo]]
