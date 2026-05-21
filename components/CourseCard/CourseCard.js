'use client';

import Link from 'next/link';
import styles from './CourseCard.module.css';

export default function CourseCard({ course }) {
  // Safe default values
  const {
    title = 'Course Title',
    category = 'General',
    rating = 5,
    author = 'Uniworld Academy',
    duration = '4 hours',
    image_url: imageUrl = '/images/RC.jpg'
  } = course;

  // Create array for star rendering
  const starsArray = Array.from({ length: Math.min(5, Math.max(1, rating)) });

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&auto=format&fit=crop&q=60';
          }}
        />
        <span className={styles.categoryTag}>{category}</span>
      </div>

      <div className={styles.cardContent}>
        {/* Rating Row */}
        <div className={styles.ratingRow}>
          {starsArray.map((_, i) => (
            <svg key={i} className={styles.starIcon} viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          ))}
        </div>

        {/* Course Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Author info */}
        <div className={styles.author}>
          <svg className={styles.academyIcon} viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.09-.59 2.05-1.47 2.58l.47 2.42H10l.47-2.42C9.59 12.05 9 11.09 9 10c0-1.66 1.34-3 3-3z" />
          </svg>
          <span>{author}</span>
        </div>

        {/* Card Footer */}
        <div className={styles.cardFooter}>
          <span className={styles.duration}>{duration}</span>
          <Link href={`/courses/${course.slug}`} className={styles.learnLink}>
            <span>Start Learning</span>
            <svg className={styles.learnLinkIcon} viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
