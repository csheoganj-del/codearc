'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail } from 'lucide-react';
import { validateContactFields } from '../lib/validation';

const WHATSAPP_NUMBER = '919983721179';
const CONTACT_EMAIL = 'hello@codearc.co.in';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [channel, setChannel] = useState<'email' | 'whatsapp' | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const buildMessageText = () =>
    `Hi CodeArc,\n\n${message}\n\n— ${name}\n${email}`;

  const mailtoHref = () =>
    `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Message from ${name || 'website'}`)}&body=${encodeURIComponent(buildMessageText())}`;

  const validate = () => {
    const validationError = validateContactFields({ name, email, message });
    if (validationError) {
      setFormError(validationError);
      return false;
    }
    setFormError(null);
    return true;
  };

  const openChannel = (next: 'email' | 'whatsapp') => {
    if (!validate()) return;
    setChannel(next);
    setSubmitted(true);

    if (next === 'whatsapp') {
      const text = encodeURIComponent(buildMessageText());
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = mailtoHref();
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    openChannel('email');
  };

  return (
    <section id="contact-form" className="v2-section">
      <div className="v2-section-head">
        <div>
          <p className="v2-kicker">Contact</p>
          <h2>Send a short note.</h2>
        </div>
        <p className="v2-section-aside">
          Tell us what you are building, what is difficult today and your ideal timeline.
          Continue in email or WhatsApp — you review the message before it sends.
        </p>
      </div>

      <div className="v2-card v2-card-static" style={{ padding: '28px 24px' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '28px 12px' }}>
            <CheckCircle2 size={40} style={{ color: '#3d9b6a', margin: '0 auto 16px' }} />
            <h3 style={{ margin: 0, fontSize: 26, fontWeight: 750 }}>Almost there, {name}.</h3>
            <p
              style={{
                margin: '14px auto 0',
                maxWidth: 420,
                color: 'rgba(243,240,232,0.62)',
                lineHeight: 1.55,
              }}
            >
              {channel === 'whatsapp'
                ? 'WhatsApp should have opened with your text. Hit send there.'
                : 'Your mail app should open with a draft. Hit send when it looks right.'}
            </p>
            <div className="v2-inline-actions" style={{ justifyContent: 'center' }}>
              {channel === 'whatsapp' ? (
                <a className="v2-btn v2-btn-primary" href={mailtoHref()}>
                  Use email instead <Mail size={16} />
                </a>
              ) : (
                <button type="button" className="v2-btn v2-btn-ghost" onClick={() => openChannel('whatsapp')}>
                  Use WhatsApp instead
                </button>
              )}
              <button
                type="button"
                className="v2-btn v2-btn-ghost"
                onClick={() => {
                  setSubmitted(false);
                  setChannel(null);
                }}
              >
                Change message
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="v2-form">
            <div className="v2-form-row">
              <div className="v2-field">
                <label htmlFor="form-name">Name</label>
                <input
                  id="form-name"
                  type="text"
                  required
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Your name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (formError) setFormError(null);
                  }}
                />
              </div>
              <div className="v2-field">
                <label htmlFor="form-email">Email</label>
                <input
                  id="form-email"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  placeholder="you@email.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (formError) setFormError(null);
                  }}
                />
              </div>
            </div>

            <div className="v2-field">
              <label htmlFor="form-message">What do you need?</label>
              <textarea
                id="form-message"
                required
                rows={6}
                minLength={10}
                maxLength={5000}
                placeholder="A website, an app, RestroSuite, something else… a few sentences is enough."
                value={message}
                onChange={(event) => {
                  setMessage(event.target.value);
                  if (formError) setFormError(null);
                }}
              />
            </div>

            {formError ? (
              <p role="alert" className="v2-form-error">
                {formError}
              </p>
            ) : null}

            <div className="v2-form-actions">
              <button type="submit" className="v2-btn v2-btn-primary">
                Continue in email <ArrowRight size={16} />
              </button>
              <button type="button" className="v2-btn v2-btn-ghost" onClick={() => openChannel('whatsapp')}>
                Continue in WhatsApp
              </button>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={{ fontSize: 13, color: 'rgba(243,240,232,0.55)' }}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
