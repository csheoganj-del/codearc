import { beforeEach, describe, expect, it } from 'vitest';
import { rateLimit, rateLimitHeaders, resetRateLimitsForTests } from './rate-limit';

describe('rateLimit', () => {
  beforeEach(() => resetRateLimitsForTests());

  it('allows requests within the limit and reports remaining capacity', () => {
    expect(rateLimit('client', { limit: 2, windowMs: 60_000 })).toMatchObject({
      ok: true,
      remaining: 1,
    });
    expect(rateLimit('client', { limit: 2, windowMs: 60_000 })).toMatchObject({
      ok: true,
      remaining: 0,
    });
  });

  it('blocks requests over the limit', () => {
    rateLimit('client', { limit: 1, windowMs: 60_000 });
    expect(rateLimit('client', { limit: 1, windowMs: 60_000 })).toMatchObject({
      ok: false,
      remaining: 0,
    });
  });

  it('formats rate-limit response headers', () => {
    expect(rateLimitHeaders({ remaining: 3, retryAfterSec: 20 })).toEqual({
      'RateLimit-Remaining': '3',
      'Retry-After': '20',
    });
  });
});
