export type PaymentLogEvent = {
  at: string;
  type:
    | 'order.created'
    | 'payment.verified'
    | 'webhook.payment.captured'
    | 'webhook.payment.failed'
    | 'webhook.other';
  planId?: string;
  orderId?: string;
  paymentId?: string;
  amountPaise?: number;
  currency?: string;
  meta?: Record<string, unknown>;
};

/** Emit a structured audit event. Razorpay remains the durable payment system of record. */
export async function logPaymentEvent(event: PaymentLogEvent): Promise<void> {
  console.info('[payment-event]', JSON.stringify(event));
}
