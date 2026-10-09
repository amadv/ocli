# Bitbucket

Enables: `ocli bitbucket create-repo`, `ocli bitbucket list-prs`, `ocli bitbucket create-pr`, `ocli bitbucket diff` and more — create repositories, open/list/merge PRs, get diffs.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `bitbucket.baseUrl` | `OCLI_BITBUCKET_BASE_URL` | Bitbucket Server root, e.g. `https://bitbucket.imagile.dev` |
| `bitbucket.pat` | `OCLI_BITBUCKET_PAT` | Personal access token |

## Config file (persistent)

```
ocli config set bitbucket.baseUrl https://bitbucket.imagile.dev
ocli config set bitbucket.pat <token>
```

## Env vars (ephemeral / CI)

```
export OCLI_BITBUCKET_BASE_URL=https://bitbucket.imagile.dev
export OCLI_BITBUCKET_PAT=<token>
```

## Repo defaults

```
ocli config set --repo defaults.bitbucket.targetBranch main
```

## Creating repositories

```
# Create a repo in a project
ocli bitbucket --project MYPROJ create-repo --name my-new-repo

# With a description and explicit project flag
ocli bitbucket create-repo --project MYPROJ --name my-new-repo --description "My project"
```
