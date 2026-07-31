export class ApiInputError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 413 | 415 = 400,
  ) {
    super(message);
    this.name = 'ApiInputError';
  }
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function readJsonObject<T extends Record<string, unknown>>(
  request: Request,
  maxBytes = 4096,
): Promise<T> {
  const contentType = request.headers.get('content-type')?.toLowerCase() || '';
  if (!contentType.startsWith('application/json')) {
    throw new ApiInputError('Content-Type must be application/json', 415);
  }

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new ApiInputError('Request body is too large', 413);
  }

  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new ApiInputError('Request body is too large', 413);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new ApiInputError('Request body must be valid JSON');
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new ApiInputError('Request body must be a JSON object');
  }

  return parsed as T;
}

export function noStoreHeaders(extra: HeadersInit = {}): HeadersInit {
  return {
    'Cache-Control': 'no-store, max-age=0',
    ...Object.fromEntries(new Headers(extra).entries()),
  };
}
