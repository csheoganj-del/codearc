import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  href?: string;
  variant?: 'light' | 'dark';
  showWordmark?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function Logo({
  href = '/',
  variant = 'light',
  showWordmark = true,
  className = '',
  onClick,
}: LogoProps) {
  const isLight = variant === 'light';

  const inner = (
    <span className={`codearc-logo ${isLight ? 'is-light' : 'is-dark'} ${className}`.trim()}>
      <Image
        className="codearc-mark"
        src="/brand/codearc-mark.svg"
        alt=""
        width={72}
        height={72}
        priority
        aria-hidden="true"
      />
      {showWordmark ? (
        <span className="codearc-wordmark">
          <span className="codearc-word-code">Code</span>
          <span className="codearc-word-arc">Arc</span>
        </span>
      ) : null}
    </span>
  );

  if (!href) {
    return (
      <span className="codearc-logo-link" aria-label="CodeArc">
        {inner}
      </span>
    );
  }

  return (
    <Link href={href} className="codearc-logo-link" aria-label="CodeArc home" onClick={onClick}>
      {inner}
    </Link>
  );
}
