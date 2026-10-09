# SonarQube

Enables: `ocli sonar issue`, `ocli sonar project` — list code quality and security issues by project.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `sonar.baseUrl` | `OCLI_SONAR_BASE_URL` | SonarQube server root, e.g. `https://sonar.imagile.dev` |
| `sonar.token` | `OCLI_SONAR_TOKEN` | User token (generated in SonarQube → My Account → Security) |

## Config file (persistent)

```
ocli config set sonar.baseUrl https://sonar.imagile.dev
ocli config set sonar.token <token>
```

## Env vars (ephemeral / CI)

```
export OCLI_SONAR_BASE_URL=https://sonar.imagile.dev
export OCLI_SONAR_TOKEN=<token>
```

`SONAR_TOKEN` (the variable name SonarSource's own scanner CLI and CI integrations use) is used as a fallback when `OCLI_SONAR_TOKEN` isn't set. `OCLI_SONAR_TOKEN` always takes precedence when set.

## Repo defaults

```
ocli config set --repo defaults.sonar.project my-project-key
```
