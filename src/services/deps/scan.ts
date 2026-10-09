import type { ResolvedConfig } from '../../types/config.js';
import type { ScanOptions, ScanData } from './types.js';
import { scanRepo } from './parsers/index.js';
import { getRepoRoot } from '../../lib/git-context.js';
import { OcliError } from '../../lib/errors.js';

export function runScan(config: ResolvedConfig, opts: ScanOptions): ScanData {
  void config; // scan is local-only, no network
  const repoRoot = getRepoRoot();
  if (!repoRoot) {
    throw new OcliError('Not inside a git repository. deps commands require a git repo root.', 1);
  }
  return scanRepo(repoRoot, opts);
}
