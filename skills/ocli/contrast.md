# Contrast Security IAST

Enables: `ocli contrast apps`, `ocli contrast findings`, `ocli contrast libraries` — list applications, runtime vulnerability findings, and software composition (library) data from Contrast Security.

## Required config

All four credential keys are found in your Contrast account under **User Settings → Your Keys**.

| Key | Env var | Description |
|-----|---------|-------------|
| `contrast.baseUrl` | `OCLI_CONTRAST_BASE_URL` | Contrast instance root (required — no default) |
| `contrast.orgUuid` | `OCLI_CONTRAST_ORG_UUID` | Organization UUID |
| `contrast.username` | `OCLI_CONTRAST_USERNAME` | Your username (email) |
| `contrast.apiKey` | `OCLI_CONTRAST_API_KEY` | API key |
| `contrast.serviceKey` | `OCLI_CONTRAST_SERVICE_KEY` | Service key |

**Base URL examples:**
- Cloud SaaS: `https://app.contrastsecurity.com`
- On-premise: `https://contrast.imagile.dev`

## Config file (persistent)

```
ocli config set contrast.baseUrl https://app.contrastsecurity.com
ocli config set contrast.orgUuid <org-uuid>
ocli config set contrast.username <email>
ocli config set contrast.apiKey <api-key>
ocli config set contrast.serviceKey <service-key>
```

## Env vars (ephemeral / CI)

```
export OCLI_CONTRAST_BASE_URL=https://app.contrastsecurity.com
export OCLI_CONTRAST_ORG_UUID=<org-uuid>
export OCLI_CONTRAST_USERNAME=<email>
export OCLI_CONTRAST_API_KEY=<api-key>
export OCLI_CONTRAST_SERVICE_KEY=<service-key>
```
