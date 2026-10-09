# Confluence

Enables: `ocli confluence get-page`, `create-page`, `update-page`, `delete-page`, `search`, `list-pages`, `list-spaces`, `list-comments`, `add-comment`, `add-label`/`remove-label`, `list-attachments`, `upload-attachment`, `download-attachment`, `delete-attachment`, `get-page-history`, and more — create, read, update, and delete pages, spaces, comments, labels, and attachments.

## Required config

| Key | Env var | Description |
|-----|---------|-------------|
| `confluence.baseUrl` | `OCLI_CONFLUENCE_BASE_URL` | Confluence server root, e.g. `https://confluence.imagile.dev` |
| `confluence.apiToken` | `OCLI_CONFLUENCE_API_TOKEN` | Personal access token |

## Config file (persistent)

```
ocli config set confluence.baseUrl https://confluence.imagile.dev
ocli config set confluence.apiToken <token>
```

## Env vars (ephemeral / CI)

```
export OCLI_CONFLUENCE_BASE_URL=https://confluence.imagile.dev
export OCLI_CONFLUENCE_API_TOKEN=<token>
```

## Notes

- `delete-attachment` moves the attachment to the Confluence trash (`DELETE /rest/api/content/{id}`) — it does not permanently purge it. Use Confluence's admin UI to empty the trash if a permanent delete is required.
