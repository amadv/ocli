# Checkmarx

Enables: `ocli checkmarx project list/get`, `ocli checkmarx scan list/get/stats` — list projects, scans, and vulnerability statistics in Checkmarx One.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `checkmarx.baseUrl` | `OCLI_CHECKMARX_BASE_URL` | Checkmarx One API base, e.g. `https://ast.checkmarx.net/api` |
| `checkmarx.tenantName` | `OCLI_CHECKMARX_TENANT_NAME` | IAM realm / tenant name, e.g. `imagile` |
| `checkmarx.apiKey` | `OCLI_CHECKMARX_API_KEY` | API key created in Checkmarx One IAM (recommended) |
| `checkmarx.clientId` | `OCLI_CHECKMARX_CLIENT_ID` | OAuth2 client ID (alternative to API key) |
| `checkmarx.clientSecret` | `OCLI_CHECKMARX_CLIENT_SECRET` | OAuth2 client secret (alternative to API key) |

ocli exchanges either an API key (refresh token) or OAuth client credentials for a
short-lived bearer token automatically. No external tools are required.

## Config file (persistent)

```
ocli config set checkmarx.baseUrl https://ast.checkmarx.net/api
ocli config set checkmarx.tenantName imagile
ocli config set checkmarx.apiKey <api-key>
```

## Env vars (ephemeral / CI)

```
export OCLI_CHECKMARX_BASE_URL=https://ast.checkmarx.net/api
export OCLI_CHECKMARX_TENANT_NAME=imagile
export OCLI_CHECKMARX_API_KEY=<api-key>
```

## Regional deployments

For EU or other regional Checkmarx One instances, use the appropriate API base URL
(e.g. `https://eu.ast.checkmarx.net/api`). ocli derives the matching regional IAM host
(e.g. `https://eu.iam.checkmarx.net`) from that URL.
