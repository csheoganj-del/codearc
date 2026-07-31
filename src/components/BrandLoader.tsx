import styles from '../app/Loading.module.css';

export default function BrandLoader() {
  return (
    <div className={styles.screen} aria-busy="true" aria-live="polite" role="status">
      <div className={styles.loader}>
        <div className={styles.brandRow}>
          <div className={styles.markWrap} aria-hidden="true">
            <svg className={styles.mark} viewBox="0 0 128 128">
              <rect className={styles.base} width="128" height="128" rx="30" />
              <path
                className={styles.outerArch}
                d="M32 102V65C32 35 48 20 64 20s32 15 32 45v37"
              />
              <path
                className={styles.innerArch}
                d="M48 102V67c0-17 7-27 16-27s16 10 16 27v35"
              />
              <rect className={styles.keystone} x="55" y="13" width="18" height="13" rx="4" />
            </svg>
          </div>

          <div className={styles.wordmark} aria-label="CodeArc">
            <span className={styles.letter}>C</span>
            <span className={styles.letter}>o</span>
            <span className={styles.letter}>d</span>
            <span className={styles.letter}>e</span>
            <span className={`${styles.letter} ${styles.accentLetter}`}>A</span>
            <span className={`${styles.letter} ${styles.accentLetter}`}>r</span>
            <span className={`${styles.letter} ${styles.accentLetter}`}>c</span>
          </div>
        </div>

        <span className={styles.srOnly}>Loading CodeArc</span>
      </div>
    </div>
  );
}
