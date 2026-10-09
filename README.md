# ocli — The Office CLI

[![docs](https://img.shields.io/badge/docs-getting%20started-FF5C39?style=flat-square)](https://amadv.github.io/ocli/getting-started/)

> One command does what three meetings couldn't.

ocli gives AI coding agents (and humans) structured CLI access to the enterprise tools your org actually runs — Jira, Bitbucket, Confluence, SonarQube, SDElements, Azure DevOps Server, Jenkins, JFrog Artifactory, Checkmarx, and more. No MCP servers required. No meetings to schedule. No forms to fill out.

The service list grows. Any enterprise tool that authenticates with a personal access token is a candidate — issue trackers and CI/CD, but equally design, docs, observability, and collaboration tools your agents need context from. [Request one](https://amadv.github.io/ocli/feedback/).

## Why?

Your org blocked MCP. Your agents still need to review PRs, create issues, and manage code reviews. ocli is the shim layer that makes it work — one `npm install` and you're cutting through red tape.

## Install

```bash
npm install -g @amadv/ocli
```

## Give it to your agent

ocli ships a skill — setup, conventions, and a reference file per service — that teaches any coding agent how to use it. Install it into your repo:

```bash
# Codex & GitHub Copilot via the cross-tool .agents/skills convention (default)
ocli skills install

# GitHub Copilot's own directories (.github/skills)
ocli skills install --agent github-copilot

# Claude Code (.claude/skills)
ocli skills install --agent claude-code

# All three agent hosts at once
ocli skills install --all-agents
```

Add `--scope user` to install for every repo on the machine instead. Installed skills are a copy — after upgrading ocli, re-run `ocli skills install`; `skills list`, `skills status`, and `ocli doctor` warn when the installed copy is stale. Org-internal skills distribute the same way from a git-hosted marketplace: `ocli skills marketplace setup <git-clone-url>` registers one, `ocli skills marketplace sync` keeps it current, and `ocli skills status` shows what's installed where.

## Quick Start

```bash
# Configure your global auth (Jira, Bitbucket, Confluence)
ocli config init

# Add repo-level defaults (check this into git)
ocli config init --repo

# When something isn't working: config, credentials, and skills in one report
ocli doctor
```

For setup, conventions, and agent integration, see the [Getting Started page](https://amadv.github.io/ocli/getting-started/) and the [full command reference](https://amadv.github.io/ocli/commands/). The same guidance ships to your agent via [`ocli skills install`](#give-it-to-your-agent).

## Configuration

ocli uses a three-layer config system (highest priority wins):

| Layer | File | Contains | In Git? |
|-------|------|----------|---------|
| Env vars | `OCLI_*` | Auth overrides, CI secrets | No |
| Repo config | `.ocli.json` | Team defaults (project, issue type, priority, target branch) | Yes |
| Global config | `~/.ocli/config.json` | Auth, server URLs, personal defaults | No |

### Environment Variables

Every config value can be supplied as a `OCLI_<SERVICE>_<KEY>` environment variable, and env vars always win over config files. The cross-service ones:

| Variable | Description |
|----------|-------------|
| `OCLI_EMAIL` | Your email address (used across Jira, Bitbucket, etc.) |
| `OCLI_USERID` | Your user ID or username |
| `OCLI_CONFIG_PATH` | Override global config file path |

Per-service variables (base URLs, tokens) are documented in each service's file under [`skills/ocli/`](./skills/ocli/) — the same files `ocli skills install` hands to your agent — and on the [command reference](https://amadv.github.io/ocli/commands/).

## For AI Agents

ocli is designed agent-first:
- Every command returns structured JSON to stdout
- Errors are JSON too — always check `"ok"`
- `--dry-run` lets agents preview before executing
- Run `ocli skills install` to give your agent the [`skills/ocli/`](./skills/ocli/) reference — setup, conventions, and a file per service

## Global Flags

```
--pretty                Human-readable formatted output (default: compact JSON)
--verbose               Include full API response metadata
--dry-run               Print the API request without executing
--config <path>         Override global config file location
--output-file <path>    Write JSON output to file instead of stdout
```

## Commit Convention

This project uses Conventional Commits for automatic versioning:
- `fix: ...` → patch
- `feat: ...` → minor
- `feat!: ...` → major

## Services

<!-- services-table:start (generated from site/src/lib/integrations.ts — run `npm run sync-readme`; do not edit by hand) -->
| Service | Status | Description |
|---------|--------|-------------|
| Git | 🟢 Live | Local repository operations |
| Jira | 🔵 Beta | Issues, sprints, projects |
| Confluence | 🔵 Beta | Pages, spaces, content |
| Azure DevOps | 🔵 Beta | Work items, pipelines |
| Bitbucket | 🟡 Basic | Pull requests, repositories |
| GitHub | 🟡 Basic | Pull requests, reviews, issues |
| SonarQube | 🟡 Basic | Code quality & security |
| SDElements | 🟡 Basic | Security requirements |
| Artifactory | 🟡 Basic | Artifact repository |
| Jenkins | 🟡 Basic | CI/CD pipelines |
| Dynatrace | 🟡 Basic | Problems, entities, traces |
| Dependencies | 🟡 Basic | CVE detection, license audit |
| Checkmarx | ⚪ Untested | Vulnerability scanning (SAST) |
| Contrast IAST | ⚪ Untested | Runtime application security |
| Sonatype IQ | ⚪ Untested | Dependency policy enforcement |
| OpenShift | ⚪ Untested | Pods, events, logs, metrics |
| LogScale | ⚪ Untested | Log queries, repositories |
| Figma | ⚪ Untested | Design files, comments, history |
| Split.IO | ⚪ Untested | Feature flags, change requests |

Status reflects validation against a **real instance**, not code maturity: **Live** — used routinely day-to-day · **Beta** — exercised across several commands and instances · **Basic** — smoke-tested against one instance · **Untested** — shipped, not yet run against a live server. The [homepage](https://amadv.github.io/ocli/) shows the same grid.

Removed integrations: ServiceNow (v5.0.0), IBM UrbanCode Deploy (v2.0.0) — see the [changelog](https://amadv.github.io/ocli/changelog/) for why.
<!-- services-table:end -->

Auth specifics and supported server versions for each service live in its [`skills/ocli/<service>.md`](./skills/ocli/) file.

### Adding a service

Requests for new integrations are welcome for **any enterprise tool**, not just the SDLC categories above — design, documentation, observability, ITSM, and collaboration tools all count.

The one hard requirement is authentication: the tool must support a **personal access token** — a long-lived static credential you generate in its own UI and paste into an env var or config file. Vendor naming doesn't matter (API token, user token, PAT). Tools whose only auth is interactive OAuth, SSO/SAML, username+password, a registered OAuth app, a cloud IAM credential chain, or mTLS can't be supported. Checkmarx (username + password via an OAuth2 password grant that ocli handles natively) predates this rule and is grandfathered. Two integrations have been removed for exactly this reason. ServiceNow went in v5.0.0: its personal access tokens are an opt-in instance feature many enterprises never enable, so in practice the integration authenticated with a username + password. IBM UrbanCode Deploy went in v2.0.0: UCD tokens are not usable as a standalone credential the way ocli requires, so its only workable auth was username + password.

## License

Apache 2.0 — see [LICENSE](./LICENSE) and [NOTICE](./NOTICE).
