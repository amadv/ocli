import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getOcliVersion } from './version.js';

describe('getOcliVersion', () => {
  it('returns the version from the repo package.json', () => {
    const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
    const pkg = JSON.parse(fs.readFileSync(path.join(repoRoot, 'package.json'), 'utf8')) as { version: string };
    expect(getOcliVersion()).toBe(pkg.version);
  });

  it('returns a semver-shaped string, never throwing', () => {
    expect(getOcliVersion()).toMatch(/^\d+\.\d+\.\d+/);
  });
});
