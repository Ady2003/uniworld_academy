import styles from './StatCard.module.css';

export default function StatCard({ stat }) {
  const {
    label = 'Label',
    value = '0',
    highlight = 0
  } = stat;

  return (
    <div className={`${styles.card} ${highlight ? styles.highlighted : ''}`}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
