import Image from 'next/image';
import styles from './ProductPreview.module.css';

type Identity = {
  name: string;
  descriptor: string;
  className: string;
  image: string;
};

const identities: Record<string, Identity> = {
  restrosuite: {
    name: 'RestroSuite',
    descriptor: 'Restaurant OS',
    className: styles.restro,
    image: '/assets/restrosuite-mark-original.png',
  },
  staysuite: {
    name: 'StaySuite',
    descriptor: 'Hospitality OS',
    className: styles.stay,
    image: '/assets/staysuite_preview.jpg',
  },
  medisuite: {
    name: 'MediSuite',
    descriptor: 'Clinic OS',
    className: styles.medi,
    image: '/assets/medisuite-mark-original.jpg',
  },
};

export default function ProductPreview({ slug }: { slug: string }) {
  const identity = identities[slug] ?? identities.restrosuite;

  return (
    <div className={`${styles.preview} ${identity.className}`} aria-hidden="true">
      <span className={styles.glow} />
      <div className={styles.lockup}>
        <div className={styles.emblem}>
          <span className={styles.tile}>
            <Image
              src={identity.image}
              alt=""
              fill
              sizes="104px"
              className={styles.markImage}
            />
          </span>
        </div>
        <div className={styles.wordmark}>
          <strong>{identity.name}</strong>
          <span>{identity.descriptor}</span>
        </div>
      </div>
      <span className={styles.family}>A CodeArc product</span>
    </div>
  );
}
