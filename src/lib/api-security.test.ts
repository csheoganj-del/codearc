import { describe, expect, it } from 'vitest';
import { isSameOriginRequest, readJsonObject } from './api-security';

describe('isSameOriginRequest', () => {
  it('accepts a matching origin', () => {
    const request = new Request('https://codearc.co.in/api/create-order', {
      headers: { origin: 'https://codearc.co.in' },
    });
    expect(isSameOriginRequest(request)).toBe(true);
  });

  it('rejects a foreign origin', () => {
    const request = new Request('https://codearc.co.in/api/create-order', {
      headers: { origin: 'https://example.com' },
    });
    expect(isSameOriginRequest(request)).toBe(false);
  });

  it('allows server-to-server requests without an Origin header', () => {
    expect(isSameOriginRequest(new Request('https://codearc.co.in/api/create-order'))).toBe(true);
  });
});

describe('readJsonObject', () => {
  it('parses a small JSON object', async () => {
    const request = new Request('https://codearc.co.in/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ planId: 'restrosuite-setup' }),
    });
    await expect(readJsonObject(request)).resolves.toEqual({ planId: 'restrosuite-setup' });
  });

  it('rejects malformed JSON as a client error', async () => {
    const request = new Request('https://codearc.co.in/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{',
    });
    await expect(readJsonObject(request)).rejects.toMatchObject({ status: 400 });
  });

  it('rejects non-JSON content', async () => {
    const request = new Request('https://codearc.co.in/api', {
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      body: '{}',
    });
    await expect(readJsonObject(request)).rejects.toMatchObject({ status: 415 });
  });

  it('rejects oversized bodies', async () => {
    const request = new Request('https://codearc.co.in/api', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ value: 'x'.repeat(200) }),
    });
    await expect(readJsonObject(request, 64)).rejects.toMatchObject({ status: 413 });
  });
});
