# openclaw-tesla

Tesla vehicle control plugin for [OpenClaw](https://github.com/openclaw/openclaw) — lock, unlock, climate, charging, status, and more via the [Tesla Fleet API](https://developer.tesla.com/docs/fleet-api).

## Features

21 actions exposed to the OpenClaw AI agent:

| Category | Actions |
|----------|---------|
| **Status** | `status`, `location`, `list_vehicles` |
| **Locks** | `lock`, `unlock` |
| **Climate** | `climate_on`, `climate_off`, `set_temp` |
| **Charging** | `start_charge`, `stop_charge`, `set_charge_limit`, `open_charge_port`, `close_charge_port` |
| **Trunk** | `open_trunk`, `open_frunk` |
| **Windows** | `vent_windows`, `close_windows` |
| **Security** | `sentry_on`, `sentry_off` |
| **Other** | `honk`, `flash` |

## Install

```bash
openclaw plugins install openclaw-tesla
```

## Configuration

You need a Tesla Fleet API application. See [Tesla's developer docs](https://developer.tesla.com/docs/fleet-api) for setup.

```bash
openclaw config set plugins.tesla.clientId "your-client-id"
openclaw config set plugins.tesla.clientSecret "your-client-secret"
openclaw config set plugins.tesla.refreshToken "your-refresh-token"
openclaw config set plugins.tesla.vin "your-vin"        # optional default VIN
openclaw config set plugins.tesla.region "na"            # na / eu / cn (default: na)
```

| Key | Required | Description |
|-----|----------|-------------|
| `clientId` | Yes | Tesla Fleet API application client ID |
| `clientSecret` | Yes | Tesla Fleet API application client secret |
| `refreshToken` | Yes | Tesla Fleet API OAuth refresh token |
| `vin` | No | Default vehicle VIN (used when not specified per-command) |
| `region` | No | Fleet API region: `na` (North America), `eu` (Europe), `cn` (China). Defaults to `na` |

## Usage

Once installed and configured, the Tesla tool is available to the OpenClaw agent. Examples:

> "What's my Tesla's battery level?"
>
> "Lock my car"
>
> "Set the temperature to 22°C"
>
> "Start charging"
>
> "Where is my car?"

## Design

- **Optional + factory** — tool is only created when explicitly enabled and skipped in sandboxed contexts (vehicle commands are side-effectful)
- **Lazy client** — startup doesn't fail if credentials aren't configured yet
- **Auto-wake** — vehicle is woken before issuing any command
- **No extra dependencies** — uses native `fetch`
- **Follows OpenClaw tool schema guardrails** — `Type.Unsafe` string enum (no `Type.Union`), `Type.Optional` (no null unions)

## Development

```bash
npm install
npm test
npm run typecheck
```

## License

MIT
