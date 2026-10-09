import type { ResolvedConfig } from '../types/config.js';
import { OcliError } from './errors.js';

/**
 * Returns a fetch-compatible function for Azure DevOps Server requests,
 * with Basic auth (PAT) injected into every call.
 */
export async function buildAdoFetcher(
  config: ResolvedConfig
): Promise<typeof fetch> {
  const { pat, baseUrl } = config.ado;

  if (!baseUrl) {
    throw new OcliError('Azure DevOps baseUrl not configured. Run: ocli config init', 1);
  }

  if (!pat) {
    throw new OcliError(
      'Azure DevOps PAT not configured. Set a PAT via ocli config init or OCLI_ADO_PAT env var.',
      1
    );
  }

  const encoded = Buffer.from(':' + pat).toString('base64');
  const authHeader = `Basic ${encoded}`;
  return (url: Parameters<typeof fetch>[0], init?: Parameters<typeof fetch>[1]) =>
    fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(init?.headers as Record<string, string> | undefined),
        'Authorization': authHeader
      }
    });
}
