'use client';

import styles from './TestimonialCard.module.css';

export default function TestimonialCard({ testimonial }) {
  const {
    quote = 'Testimonial quote...',
    author = 'Passenger Name',
    role = 'Guest',
    avatar_url = '/images/testimonial-1.png'
  } = testimonial;

  return (
    <div className={styles.card}>
      {/* Decorative quote mark */}
      <svg className={styles.quoteIcon} viewBox="0 0 24 24">
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </svg>

      <p className={styles.quoteText}>"{quote}"</p>

      <div className={styles.userRow}>
        <img 
          src={avatar_url} 
          alt={author} 
          className={styles.avatar}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60';
          }}
        />
        <div className={styles.userInfo}>
          <span className={styles.userName}>{author}</span>
          <span className={styles.userRole}>{role}</span>
        </div>
      </div>
    </div>
  );
}
