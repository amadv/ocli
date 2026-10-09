# Azure DevOps (ADO)

Enables: `ocli ado workitem`, `ocli ado repo`, `ocli ado repo create`, `ocli ado pr`, `ocli ado pipeline` — work items, repos (including repo creation), PRs, and pipeline builds for Azure DevOps Server (on-premise).

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `ado.baseUrl` | `OCLI_ADO_BASE_URL` | ADO Server root, e.g. `https://tfs.imagile.dev` |
| `ado.pat` | `OCLI_ADO_PAT` | Personal access token |

## Config file (persistent)

```
ocli config set ado.baseUrl https://tfs.imagile.dev
ocli config set ado.pat <token>
ocli config set defaults.ado.collection DefaultCollection
ocli config set defaults.ado.project MyProject
```

## Env vars (ephemeral / CI)

```
export OCLI_ADO_BASE_URL=https://tfs.imagile.dev
export OCLI_ADO_PAT=<token>
```

`SYSTEM_ACCESSTOKEN` (the conventional name Azure Pipelines jobs map `$(System.AccessToken)` to) is used as a fallback when `OCLI_ADO_PAT` isn't set. `OCLI_ADO_PAT` always takes precedence when set.

## Repo defaults

```
ocli config set --repo defaults.ado.collection DefaultCollection
ocli config set --repo defaults.ado.project MyProject
```

## Creating repositories

```
# Create a new git repository in the project
ocli ado --collection DefaultCollection --project MyProject repo create --name my-new-repo
```

## Large fields via --input-file

`ado work create` and `ado work update` accept `--input-file <path>` (`-` for stdin) instead of, or alongside, individual flags — useful for a long Description, Acceptance Criteria, or several fields at once. Run `ocli ado work schema` to print the JSON Schema plus a runnable example. Any string value in `fields` may be `@path/to/file` to pull that field's content from a file instead of inlining it. Common fields (Description, Acceptance Criteria, Priority, ...) resolve out of the box; anything else resolves via the aliases saved by `ocli ado work fields --save`, or passes through as a raw reference name (e.g. `MyOrg.SomeCustomField`) with no pre-registration required. Individual flags (`--title`, `--description`, `--field`, ...) override matching keys from the file; overridden keys are printed to stderr and included in the output's `meta.overrides`.

```
ocli ado work schema --example-only > wi.json
# edit wi.json — fields.Description can be "@desc.html"
ocli ado work create --type Bug --input-file wi.json
ocli ado work update --id 123 --input-file wi.json --field Priority=1   # flag wins, and it's reported
```
