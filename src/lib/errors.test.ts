import { describe, it, expect } from 'vitest';
import { OcliError } from './errors.js';

describe('OcliError', () => {
  it('sets name to OcliError', () => {
    const err = new OcliError('boom');
    expect(err.name).toBe('OcliError');
  });

  it('is an instance of Error', () => {
    expect(new OcliError('x')).toBeInstanceOf(Error);
  });

  it('sets message', () => {
    expect(new OcliError('something went wrong').message).toBe('something went wrong');
  });

  it('defaults status to 1', () => {
    expect(new OcliError('x').status).toBe(1);
  });

  it('accepts explicit status', () => {
    expect(new OcliError('x', 404).status).toBe(404);
  });

  it('defaults url to undefined', () => {
    expect(new OcliError('x').url).toBeUndefined();
  });

  it('accepts url', () => {
    expect(new OcliError('x', 500, 'https://api.imagile.dev').url).toBe('https://api.imagile.dev');
  });

  it('defaults retryAfterSeconds to undefined', () => {
    expect(new OcliError('x').retryAfterSeconds).toBeUndefined();
  });

  it('accepts retryAfterSeconds', () => {
    expect(new OcliError('x', 429, 'https://api.imagile.dev', 86400).retryAfterSeconds).toBe(86400);
  });
});
