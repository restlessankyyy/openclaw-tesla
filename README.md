# openclaw-tesla

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A community plugin for [OpenClaw](https://github.com/openclaw/openclaw) that gives your AI agent full control over Tesla vehicles through the [Tesla Fleet API](https://developer.tesla.com/docs/fleet-api).

> "Lock my car." "Set the temperature to 22°C." "Where's my Tesla?"

---

## What It Does

**21 voice/text actions** your agent can perform on your behalf:

| Category | Actions | What it does |
|----------|---------|--------------|
| **Status** | `status` | Full dashboard: battery, climate, location, locks, software update |
| | `location` | GPS coordinates, heading, speed |
| | `list_vehicles` | All vehicles on your Tesla account |
| **Locks** | `lock` / `unlock` | Door locks |
| **Climate** | `climate_on` / `climate_off` | Start or stop HVAC |
| | `set_temp` | Set cabin target temperature (°C) |
| **Charging** | `start_charge` / `stop_charge` | Charging control |
| | `set_charge_limit` | Set charge limit (50–100%) |
| | `open_charge_port` / `close_charge_port` | Charge port door |
| **Trunk** | `open_trunk` / `open_frunk` | Rear trunk or front trunk |
| **Windows** | `vent_windows` / `close_windows` | All windows |
| **Security** | `sentry_on` / `sentry_off` | Sentry mode |
| **Fun** | `honk` / `flash` | Honk horn or flash lights |

---

## Quick Start

### 1. Install the plugin

```bash
openclaw plugins install openclaw-tesla
```

### 2. Get Tesla Fleet API credentials

You need a Tesla developer application. Follow the [Tesla Fleet API docs](https://developer.tesla.com/docs/fleet-api) to create one and obtain your client ID, client secret, and a refresh token.

### 3. Configure

```bash
openclaw config set plugins.tesla.clientId "your-client-id"
openclaw config set plugins.tesla.clientSecret "your-client-secret"
openclaw config set plugins.tesla.refreshToken "your-refresh-token"
```

**Optional settings:**

```bash
openclaw config set plugins.tesla.vin "5YJ3E1..."       # default VIN (auto-selects first car if omitted)
openclaw config set plugins.tesla.region "na"            # na (default) | eu | cn
```

### 4. Use it

Just talk to your agent naturally:

```
> What's my Tesla's battery level?
> Pre-heat my car to 23°C
> Is my car locked?
> Open the frunk
> Turn on sentry mode
```

---

## Configuration Reference

| Key | Required | Description |
|-----|:--------:|-------------|
| `clientId` | **Yes** | Tesla Fleet API application client ID |
| `clientSecret` | **Yes** | Tesla Fleet API application client secret |
| `refreshToken` | **Yes** | Tesla Fleet API OAuth refresh token |
| `vin` | No | Default vehicle VIN — if omitted, the first vehicle on your account is used |
| `region` | No | Fleet API region: `na` (North America), `eu` (Europe), `cn` (China). Defaults to `na` |

---

## How It Works

```
User message → OpenClaw agent → tesla tool → Fleet API → your car
```

- **Sandbox-safe** — the tool is registered as optional and skipped in sandboxed contexts since vehicle commands have real-world side effects.
- **Lazy initialization** — the API client is only created on first use, so the gateway starts fine even without credentials configured.
- **Auto-wake** — if your vehicle is asleep, the plugin wakes it automatically before sending commands (up to 30s).
- **Token management** — OAuth access tokens are refreshed transparently; you only provide the initial refresh token.
- **Zero extra dependencies** — uses the native `fetch` API.

---

## Multi-Vehicle Support

If you have multiple Teslas, you can either:

- Set a default VIN in config (`plugins.tesla.vin`)
- Specify the VIN per-command: *"Lock my Tesla with VIN 5YJ3E1EA0LF000001"*
- Ask the agent to list vehicles first: *"List my Teslas"*

---

## Development

```bash
git clone https://github.com/restlessankyyy/openclaw-tesla.git
cd openclaw-tesla
npm install
npm test          # 31 tests (16 API + 15 tool)
npm run typecheck # TypeScript strict mode
```

### Project Structure

```
openclaw-tesla/
├── index.ts                  # Plugin entry point (registers tool)
├── openclaw.plugin.json      # Plugin manifest + config schema
├── package.json
├── src/
│   ├── tesla-api.ts          # Fleet API client (OAuth, HTTP, commands)
│   ├── tesla-api.test.ts     # 16 API client tests
│   ├── tesla-tool.ts         # Tool definition (21 actions)
│   └── tesla-tool.test.ts    # 15 tool tests
├── tsconfig.json
└── vitest.config.ts
```

---

## Contributing

Issues and PRs welcome. Please include tests for new actions.

## License

[MIT](LICENSE)
