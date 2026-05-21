import db from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import CoursePlayer from './CoursePlayer';
import styles from './course-detail.module.css';

// Dynamically generate page metadata for premium SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const course = db.prepare('SELECT title FROM courses WHERE slug = ?').get(slug);
    if (!course) {
      return {
        title: 'Course Not Found | Uniworld Academy',
      };
    }
    return {
      title: `${course.title} | Uniworld Academy Crew Portal`,
      description: `Participate in the Uniworld Academy professional course: ${course.title}. Complete all chapters to acquire your five-star certification.`,
    };
  } catch (error) {
    return {
      title: 'Course Detail | Uniworld Academy',
    };
  }
}

export default async function CourseDetailPage({ params }) {
  const { slug } = await params;
  
  // Query sqlite database synchronously
  const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(slug);
  
  if (!course) {
    notFound();
  }

  // Safe fallback images
  const fallbackImage = 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&auto=format&fit=crop&q=60';

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      {/* Course Banner Header */}
      <section className={styles.courseHeader}>
        <div className="container">
          
          {/* Back link */}
          <Link href="/#courses" className={styles.headerBackLink}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <span>Back to Featured Courses</span>
          </Link>

          <div className={styles.headerGrid}>
            
            {/* Title Details */}
            <div>
              <span className={styles.courseCategory}>{course.category || 'Hospitality'}</span>
              <h1 className={styles.courseTitleLarge}>{course.title}</h1>
              
              <div className={styles.courseMetaRow}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: 'var(--accent-light)' }}>
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z" />
                  </svg>
                  {course.duration || '3.5 hours'}
                </span>
                
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: 'var(--gold)' }}>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  {course.rating || 5}.0 rating
                </span>
                
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" style={{ color: 'var(--text-muted)' }}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                  </svg>
                  {course.author || 'Uniworld Academy'}
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            <div className={styles.headerImgWrapper}>
              <img 
                src={course.image_url} 
                alt={course.title}
                className={styles.headerImage}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Main Course Player Area */}
      <section className="container">
        <CoursePlayer course={course} />
      </section>

      <Footer />
    </main>
  );
}
