import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getOcliVersion } from '../../lib/version.js';
import {
  recordInstalledSkills,
  readInstalledMeta,
  readSkillOrigin,
  findStaleBundledSkills,
} from './commands.js';

let targetDir: string;

function makeSkillDir(name: string): string {
  const dir = path.join(targetDir, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'SKILL.md'), '---\nname: ' + name + '\n---\n', 'utf8');
  return dir;
}

beforeEach(() => {
  targetDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ocli-staleness-'));
});

afterEach(() => {
  fs.rmSync(targetDir, { recursive: true, force: true });
});

describe('ocliVersion stamping', () => {
  it('stamps the running ocli version into the index and per-skill origin', () => {
    makeSkillDir('ocli');
    recordInstalledSkills(targetDir, ['ocli'], { source: 'bundled' });

    const meta = readInstalledMeta(targetDir);
    expect(meta.skills['ocli'].ocliVersion).toBe(getOcliVersion());
    expect(readSkillOrigin(path.join(targetDir, 'ocli'))?.ocliVersion).toBe(getOcliVersion());
  });
});

describe('findStaleBundledSkills', () => {
  it('reports nothing for a fresh install', () => {
    makeSkillDir('ocli');
    recordInstalledSkills(targetDir, ['ocli'], { source: 'bundled' });
    expect(findStaleBundledSkills(targetDir)).toEqual([]);
  });

  it('reports a bundled skill recorded by a different ocli version', () => {
    makeSkillDir('ocli');
    recordInstalledSkills(targetDir, ['ocli'], { source: 'bundled' });
    const metaPath = path.join(targetDir, '.ocli-installed.json');
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    meta.skills['ocli'].ocliVersion = '0.0.1';
    fs.writeFileSync(metaPath, JSON.stringify(meta), 'utf8');

    expect(findStaleBundledSkills(targetDir)).toEqual([
      { skill: 'ocli', installedVersion: '0.0.1', currentVersion: getOcliVersion() },
    ]);
  });

  it('treats a bundled record with no version stamp (pre-v3.1 install) as stale', () => {
    makeSkillDir('ocli');
    recordInstalledSkills(targetDir, ['ocli'], { source: 'bundled' });
    const metaPath = path.join(targetDir, '.ocli-installed.json');
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    delete meta.skills['ocli'].ocliVersion;
    fs.writeFileSync(metaPath, JSON.stringify(meta), 'utf8');
    // The per-skill origin also carries the stamp and acts as a fallback —
    // strip it too, as a genuinely old install would have neither.
    const originPath = path.join(targetDir, 'ocli', 'ocli-origin.json');
    const origin = JSON.parse(fs.readFileSync(originPath, 'utf8'));
    delete origin.ocliVersion;
    fs.writeFileSync(originPath, JSON.stringify(origin), 'utf8');

    expect(findStaleBundledSkills(targetDir)).toEqual([
      { skill: 'ocli', installedVersion: null, currentVersion: getOcliVersion() },
    ]);
  });

  it('ignores marketplace-sourced and untracked skills', () => {
    makeSkillDir('from-market');
    recordInstalledSkills(targetDir, ['from-market'], { source: 'marketplace', marketplace: 'm' });
    const metaPath = path.join(targetDir, '.ocli-installed.json');
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    meta.skills['from-market'].ocliVersion = '0.0.1';
    fs.writeFileSync(metaPath, JSON.stringify(meta), 'utf8');

    makeSkillDir('hand-made'); // no provenance at all

    expect(findStaleBundledSkills(targetDir)).toEqual([]);
  });

  it('returns empty for a directory that does not exist', () => {
    expect(findStaleBundledSkills(path.join(targetDir, 'nope'))).toEqual([]);
  });
});
