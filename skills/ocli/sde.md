# SDElements

Enables: `ocli sde task` — list threat model tasks and their compliance status for a project.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `sde.connection` | `OCLI_SDE_CONNECTION` | Connection string in the format `token@hostname` |

The connection string combines your API token and the SDElements hostname into a single value, e.g. `mytoken@sde.imagile.dev`.

## Config file (persistent)

```
ocli config set sde.connection mytoken@sde.imagile.dev
```

## Env vars (ephemeral / CI)

```
export OCLI_SDE_CONNECTION=mytoken@sde.imagile.dev
```

## Repo defaults

```
ocli config set --repo defaults.sde.project 123
```
