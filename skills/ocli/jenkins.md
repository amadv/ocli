# Jenkins

Enables: `ocli jenkins build`, `ocli jenkins job` — list builds, get build status and console output.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `jenkins.baseUrl` | `OCLI_JENKINS_BASE_URL` | Jenkins root, e.g. `https://jenkins.imagile.dev` |
| `jenkins.username` | `OCLI_JENKINS_USERNAME` | Jenkins username |
| `jenkins.apiToken` | `OCLI_JENKINS_API_TOKEN` | API token (generated in Jenkins → User → Configure → API Token) |

ocli authenticates using HTTP Basic (username + API token).

## Config file (persistent)

```
ocli config set jenkins.baseUrl https://jenkins.imagile.dev
ocli config set jenkins.username <username>
ocli config set jenkins.apiToken <token>
```

## Env vars (ephemeral / CI)

```
export OCLI_JENKINS_BASE_URL=https://jenkins.imagile.dev
export OCLI_JENKINS_USERNAME=<username>
export OCLI_JENKINS_API_TOKEN=<token>
```

## Project-level base URL override

Teams with different Jenkins controllers per repo can set `defaults.jenkins.baseUrl` in the project's `.ocli.json`:

```json
{
  "defaults": {
    "jenkins": {
      "baseUrl": "https://jenkins.myteam.imagile.dev"
    }
  }
}
```

Or via the CLI:

```
ocli config set --repo defaults.jenkins.baseUrl https://jenkins.myteam.imagile.dev
```

Resolution order (highest to lowest): project `.ocli.json` → global config → `OCLI_JENKINS_BASE_URL` env var.

## Multiple Jenkins instances

When you work with more than one Jenkins controller (e.g. a stable production instance plus ephemeral pipeline-as-code instances), add a `jenkinsInstances` array to your global config:

```json
{
  "jenkinsInstances": [
    {
      "name": "prod",
      "baseUrl": "https://jenkins.imagile.dev",
      "username": "you@example.com",
      "apiToken": "abc12345"
    },
    {
      "name": "ephemeral",
      "baseUrl": "https://jenkins-tmp.imagile.dev",
      "username": "you@example.com",
      "apiToken": "abc12345"
    }
  ]
}
```

Manage the array with the `instance` subcommands, which append rather than replace:

```
ocli jenkins instance add --name prod --base-url jenkins.imagile.dev --username you@example.com --api-token abc12345
ocli jenkins instance add --name ephemeral --base-url jenkins-tmp.imagile.dev --username you@example.com
ocli jenkins instance list
ocli jenkins instance remove --name ephemeral
```

Omit `--api-token` on an interactive terminal and ocli prompts for it, which keeps the token out of your shell history. `instance list` masks every token as `***`. Adding a name that already exists is rejected unless you pass `--force`, which overwrites that entry in place.

`ocli config set jenkinsInstances '[...]'` also works, but it **replaces** the whole array — you must re-supply every instance you want to keep, including tokens that `config check` masks. Prefer `instance add`.

Then select an instance at run-time with `--instance`:

```
ocli jenkins --instance ephemeral pipeline list
ocli jenkins --instance prod pipeline run --name my-job --wait
```

When `--instance` is omitted, ocli uses the default `jenkins.*` config as usual.

**Note:** Per-instance credentials are read only from the global config file — there is no env-var override for a named instance. To override Jenkins credentials at runtime (CI/CD, GitHub Actions), use the default `jenkins.*` config with `OCLI_JENKINS_BASE_URL`, `OCLI_JENKINS_USERNAME`, and `OCLI_JENKINS_API_TOKEN`, and omit `--instance`.
