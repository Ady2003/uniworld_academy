'use client';

import Link from 'next/link';
import styles from './BlogPostCard.module.css';

export default function BlogPostCard({ post }) {
  const {
    title = 'Blog Title',
    excerpt = 'Blog excerpt...',
    category = 'General',
    imageUrl = '/images/blog-placeholder.png',
    date = 'May 20, 2026',
    authorName = 'Author Name',
    authorAvatar = '/images/team-astrid.png'
  } = post;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img 
          src={imageUrl} 
          alt={title} 
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop&q=60';
          }}
        />
        <span className={styles.categoryTag}>{category}</span>
      </div>

      <div className={styles.cardContent}>
        <span className={styles.dateRow}>{date}</span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.excerpt}>{excerpt}</p>

        <div className={styles.cardFooter}>
          <div className={styles.author}>
            <img 
              src={authorAvatar} 
              alt={authorName} 
              className={styles.avatar}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60';
              }}
            />
            <span className={styles.authorName}>{authorName}</span>
          </div>

          <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            <span>Read More</span>
            <svg className={styles.readMoreIcon} viewBox="0 0 24 24">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-6-6-1.41-1.41z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
