# Dynatrace

ocli uses Dynatrace's REST APIs directly; no Dynatrace CLI is required.

## Configuration

### Single environment (legacy)

| Key | Environment variable | Purpose |
|---|---|---|
| `dynatrace.baseUrl` | `OCLI_DYNATRACE_BASE_URL` | Classic environment URL, such as `https://abc12345.live.dynatrace.com` |
| `dynatrace.apiToken` | `OCLI_DYNATRACE_API_TOKEN` | Environment API token with `entities.read` and `problems.read` |
| `dynatrace.platformUrl` | `OCLI_DYNATRACE_PLATFORM_URL` | Optional latest-platform URL, such as `https://abc12345.apps.dynatrace.com` |
| `dynatrace.platformToken` | `OCLI_DYNATRACE_PLATFORM_TOKEN` | Optional platform token with permission to query spans in Grail |

The Environment API token supports entities, services, Kubernetes workloads, and problems. Distributed
trace data is stored in Grail and requires the separate latest-platform URL and Bearer platform token.
The classic `traces.lookup` scope only checks whether a trace exists for cross-environment tracing and
does not grant an API for retrieving its spans.

```bash
ocli config set dynatrace.baseUrl https://abc12345.live.dynatrace.com
ocli config set dynatrace.apiToken dt0c01...
ocli config set dynatrace.platformUrl https://abc12345.apps.dynatrace.com
ocli config set dynatrace.platformToken dt0s16...
ocli config test
```

When platform credentials are present, `config test` and `config check` also run a minimal Grail
spans query and report it separately as `dynatrace_platform`.

### Multiple named environments

Dynatrace is commonly deployed per-environment (e.g. QA and PROD), each with its own base URL and
API token. ocli supports named environment profiles so you can switch between them with a flag rather
than rewriting `dynatrace.baseUrl` and `dynatrace.apiToken` before every command.

```bash
# Set up named environments
ocli config set dynatrace.environments.qa.baseUrl https://abc11111.live.dynatrace.com
ocli config set dynatrace.environments.qa.apiToken dt0c01...
ocli config set dynatrace.environments.prod.baseUrl https://abc22222.live.dynatrace.com
ocli config set dynatrace.environments.prod.apiToken dt0c01...

# Optional: include Grail platform credentials per environment
ocli config set dynatrace.environments.prod.platformUrl https://abc22222.apps.dynatrace.com
ocli config set dynatrace.environments.prod.platformToken dt0s16...

# Optional: set a default named environment (used when --env is omitted)
ocli config set dynatrace.defaultEnvironment prod
```

`config test` and `config check` report the connectivity status of each named environment
separately as `dynatrace.<name>` (and `dynatrace.<name>_platform` when platform credentials are set).

Environment variables (`OCLI_DYNATRACE_BASE_URL`, etc.) continue to apply to the legacy flat config
and take precedence over stored values, but do not override named environments.

## Commands

```bash
# Using the default (legacy flat config or defaultEnvironment)
ocli dynatrace services --from now-2h

# Targeting a named environment
ocli dynatrace --env qa services --from now-2h
ocli dynatrace --env prod problems list --from now-24h

# Compare QA and PROD in one session
ocli dynatrace --env qa entities list --selector 'type("SERVICE")'
ocli dynatrace --env prod entities list --selector 'type("SERVICE")'
```

```bash
ocli dynatrace services --from now-2h
ocli dynatrace workloads --from now-2h
ocli dynatrace entities list --selector 'type("HOST")'
ocli dynatrace entities get --id SERVICE-1234567890ABCDEF

ocli dynatrace problems list --from now-24h
ocli dynatrace problems list --problem-selector 'status("OPEN")'
ocli dynatrace problems get --id 1234567890_1234567890V2

ocli dynatrace trace --id 0123456789abcdef0123456789abcdef
```

Entity and problem list commands automatically follow Dynatrace pagination. Use Dynatrace selector
syntax for advanced filtering.

The `--env <name>` option is available on the `dynatrace` parent command and applies to all
subcommands: `entities list`, `entities get`, `services`, `workloads`, `problems list`,
`problems get`, and `trace`.
