'use client';

import { useState } from 'react';
import { site } from '../config/site';
import { validateContactFields } from '../lib/validation';
import styles from '../app/Home.module.css';

export default function StudioNote() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<'email' | 'whatsapp' | null>(null);

  const body = `Hi CodeArc,\n\n${message}\n\n— ${name}\n${email}`;

  const open = (channel: 'email' | 'whatsapp') => {
    const problem = validateContactFields({ name, email, message });
    if (problem) {
      setError(problem);
      return;
    }
    setError(null);
    setSent(channel);
    if (channel === 'whatsapp') {
      window.open(
        `https://wa.me/${site.phone.whatsapp}?text=${encodeURIComponent(body)}`,
        '_blank',
        'noopener,noreferrer',
      );
    } else {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Message from ${name}`)}&body=${encodeURIComponent(body)}`;
    }
  };

  if (sent) {
    return (
      <p className={styles.formDone}>
        {sent === 'whatsapp'
          ? 'WhatsApp should have opened with your note. Send it there.'
          : 'Your mail app should open with a draft. Send it when it looks right.'}
      </p>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        open('email');
      }}
    >
      {error ? <p className={styles.formError}>{error}</p> : null}
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>
      <label>
        What do you need?
        <textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="A website, an identity, motion, or software for the desk."
        />
      </label>
      <div className={styles.formActions}>
        <button type="submit">Send by email</button>
        <button type="button" onClick={() => open('whatsapp')}>
          Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
