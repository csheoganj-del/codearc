export type ContactFields = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactFields(fields: ContactFields): string | null {
  if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
    return 'Please fill in your name, email, and a short message.';
  }
  if (fields.name.trim().length > 100) {
    return 'Please shorten your name to 100 characters or fewer.';
  }
  if (!EMAIL_PATTERN.test(fields.email.trim()) || fields.email.trim().length > 254) {
    return 'Please enter a valid email address.';
  }
  if (fields.message.trim().length < 10) {
    return 'Please add a little more detail so we can help.';
  }
  if (fields.message.trim().length > 5_000) {
    return 'Please shorten your message to 5,000 characters or fewer.';
  }
  return null;
}
