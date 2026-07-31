import Razorpay from 'razorpay';

function getCredentials() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error('Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET');
  }

  return { key_id, key_secret };
}

export function getRazorpayInstance() {
  const { key_id, key_secret } = getCredentials();
  return new Razorpay({ key_id, key_secret });
}

export function getRazorpayKeySecret() {
  return getCredentials().key_secret;
}

export function getRazorpayWebhookSecret(): string | null {
  return process.env.RAZORPAY_WEBHOOK_SECRET?.trim() || null;
}

export function isPaymentConfigured(): boolean {
  const coreConfigured = Boolean(
    process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET &&
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  );
  const webhookConfigured =
    process.env.NODE_ENV !== 'production' || Boolean(getRazorpayWebhookSecret());
  return coreConfigured && webhookConfigured;
}

/** True when the configured key is a Razorpay test key. */
export function isRazorpayTestMode(): boolean {
  const key =
    process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '';
  return key.startsWith('rzp_test_');
}
