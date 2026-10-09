# Artifactory

Enables: `ocli artifactory repo`, `ocli artifactory package` — list repositories and packages, resolve virtual repo names for npm/NuGet/Maven.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `artifactory.baseUrl` | `OCLI_ARTIFACTORY_BASE_URL` | Artifactory root, e.g. `https://artifactory.imagile.dev` |
| `artifactory.token` | `OCLI_ARTIFACTORY_TOKEN` | Identity token or API key |

## Optional — virtual repo names

| Key | Env var | Description |
|-----|---------|-------------|
| `artifactory.npmRepo` | `OCLI_ARTIFACTORY_REPO_NPM` | Virtual npm repo name |
| `artifactory.nugetRepo` | `OCLI_ARTIFACTORY_REPO_NUGET` | Virtual NuGet repo name |
| `artifactory.mavenRepo` | `OCLI_ARTIFACTORY_REPO_MAVEN` | Virtual Maven repo name |

## Config file (persistent)

```
ocli config set artifactory.baseUrl https://artifactory.imagile.dev
ocli config set artifactory.token <token>
ocli config set artifactory.npmRepo npm-virtual
ocli config set artifactory.nugetRepo nuget-virtual
ocli config set artifactory.mavenRepo maven-virtual
```

## Env vars (ephemeral / CI)

```
export OCLI_ARTIFACTORY_BASE_URL=https://artifactory.imagile.dev
export OCLI_ARTIFACTORY_TOKEN=<token>
```
