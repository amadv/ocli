# Jira

Enables: `ocli jira get-issue`, `create-issue`, `update-issue`, `search`, `list-boards`, `list-sprints`, `set-sprint`, and more — get, create, and update issues, transitions, comments, attachments, custom fields, and sprints.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `jira.baseUrl` | `OCLI_JIRA_BASE_URL` | Jira server root, e.g. `https://jira.imagile.dev` |
| `jira.apiToken` | `OCLI_JIRA_API_TOKEN` | Personal access token |

## Config file (persistent)

```
ocli config set jira.baseUrl https://jira.imagile.dev
ocli config set jira.apiToken <token>
```

## Env vars (ephemeral / CI)

```
export OCLI_JIRA_BASE_URL=https://jira.imagile.dev
export OCLI_JIRA_API_TOKEN=<token>
```

## Repo defaults

```
ocli config set --repo defaults.jira.project ACME
```

## Sprints

Sprints live behind the Jira Agile API, not the issue API — list boards first, then sprints on a board (or resolve straight from a project key):

```
ocli jira list-boards --project ACME
ocli jira list-sprints --project ACME [--state active,future,closed]
ocli jira list-sprints --board <id> [--state active,future,closed]
ocli jira set-sprint --key ACME-123 --sprint <sprint-id>
```

`list-sprints` output includes `startDate`/`endDate`/`state`/`goal` for each sprint.

## Large fields via --input-file

`create-issue` and `update-issue` accept `--input-file <path>` (`-` for stdin) instead of, or alongside, individual flags — useful for a long description or many custom fields at once. Run `ocli jira schema` to print the JSON Schema plus a runnable example. Any string value in `fields` may be `@path/to/file` to pull that field's content from a file (e.g. a big HTML description) instead of inlining it. Custom fields resolve by friendly name (if registered via `ocli jira fields`) or by raw id (`customfield_10032`) with no registration required. Individual flags (`--summary`, `--description`, `--field`, ...) override matching keys from the file; overridden keys are printed to stderr and included in the output's `meta.overrides`.

```
ocli jira schema --example-only > issue.json
# edit issue.json — fields.description can be "@desc.html"
ocli jira create-issue --input-file issue.json
ocli jira create-issue --input-file issue.json --priority Low   # --priority wins, and it's reported
```

## Notes

- Targets **Jira Data Center / Server** (`/rest/api/2`). Jira Cloud is not supported: ocli
  identifies users by username in the `name` field, where Cloud requires `accountId`. Use
  Atlassian's own MCP server for Cloud.
- `--assignee` on `create-issue`, `update-issue`, and `assign` takes a **username**, as does
  any `user`-typed custom field passed via `--field`
- Custom fields discovered with `ocli jira fields --discover`
