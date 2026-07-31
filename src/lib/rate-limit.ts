type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;
let requestsSincePrune = 0;

function pruneExpired(now: number) {
  requestsSincePrune += 1;
  if (requestsSincePrune < 100 && buckets.size < MAX_BUCKETS) return;

  requestsSincePrune = 0;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }

  if (buckets.size >= MAX_BUCKETS) {
    const overflow = buckets.size - MAX_BUCKETS + 1;
    let removed = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      removed += 1;
      if (removed >= overflow) break;
    }
  }
}

/**
 * Simple in-memory rate limiter (per-process). Fine for a single Node instance.
 * Returns true when the request is allowed.
 */
export function rateLimit(
  key: string,
  { limit = 20, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean; remaining: number; retryAfterSec: number } {
  const now = Date.now();
  pruneExpired(now);
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return {
    ok: true,
    remaining: limit - existing.count,
    retryAfterSec: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}

export function clientIp(request: Request): string {
  const vercelForwarded = request.headers.get('x-vercel-forwarded-for');
  if (vercelForwarded) return vercelForwarded.split(',')[0]?.trim() || 'unknown';
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') || 'unknown';
}

export function rateLimitHeaders(result: {
  remaining: number;
  retryAfterSec: number;
}): Record<string, string> {
  return {
    'RateLimit-Remaining': String(Math.max(0, result.remaining)),
    'Retry-After': String(result.retryAfterSec),
  };
}

export function resetRateLimitsForTests(): void {
  buckets.clear();
  requestsSincePrune = 0;
}
