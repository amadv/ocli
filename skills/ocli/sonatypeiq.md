# Sonatype IQ Server

Enables: `ocli sonatypeiq applications`, `ocli deps frisk --source sonatypeiq` — list applications and scan dependencies against your IQ Server security policies.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `sonatypeiq.baseUrl` | `OCLI_SONATYPEIQ_BASE_URL` | IQ Server root, e.g. `https://iq.imagile.dev` |
| `sonatypeiq.userCode` | `OCLI_SONATYPEIQ_USER_CODE` | User Token code (from User Menu → User Token) |
| `sonatypeiq.passcode` | `OCLI_SONATYPEIQ_PASSCODE` | User Token passcode (from User Menu → User Token) |

The `userCode` and `passcode` are User Token credentials, not your login password.

## Config file (persistent)

```
ocli config set sonatypeiq.baseUrl https://iq.imagile.dev
ocli config set sonatypeiq.userCode <user-code>
ocli config set sonatypeiq.passcode <passcode>
```

## Env vars (ephemeral / CI)

```
export OCLI_SONATYPEIQ_BASE_URL=https://iq.imagile.dev
export OCLI_SONATYPEIQ_USER_CODE=<user-code>
export OCLI_SONATYPEIQ_PASSCODE=<passcode>
```

## Usage

```
# Discover application IDs
ocli sonatypeiq applications list

# Scan dependencies against IQ policies
ocli deps frisk --source sonatypeiq --application-id <id>
```
