import db from '../../../lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar/Navbar';
import Footer from '../../../components/Footer/Footer';
import BlogPostCard from '../../../components/BlogPostCard/BlogPostCard';
import styles from './blog-detail.module.css';

// Dynamically generate page metadata for premium SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = db.prepare('SELECT title, excerpt FROM blog_posts WHERE slug = ?').get(slug);
    if (!post) {
      return {
        title: 'Blog Post Not Found | Uniworld Academy',
      };
    }
    return {
      title: `${post.title} | Uniworld Academy Blog`,
      description: post.excerpt || `Read the latest cruise operations, fleet updates, and training articles from Uniworld Academy.`,
    };
  } catch (error) {
    return {
      title: 'Blog Post | Uniworld Academy',
    };
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  // Fetch the article by slug
  const post = db.prepare('SELECT * FROM blog_posts WHERE slug = ?').get(slug);

  if (!post) {
    notFound();
  }

  // Cross-reference author details from team_members table for professional details
  const teamAuthor = db.prepare('SELECT * FROM team_members WHERE name = ?').get(post.author_name);
  
  const authorRole = teamAuthor ? teamAuthor.role : 'Training Specialist';
  const authorQuote = teamAuthor ? teamAuthor.quote : 'Dedication to perfection is the absolute foundation of five-star hospitality on our boutique ships.';

  // Query 3 related blog posts
  const relatedPosts = db.prepare('SELECT * FROM blog_posts WHERE slug != ? ORDER BY id DESC LIMIT 3').all(slug);

  // Safe fallback images
  const fallbackImage = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&auto=format&fit=crop&q=60';
  const fallbackAvatar = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60';

  return (
    <main style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      <section className={styles.articleContainer}>
        <div className="container">
          
          {/* Breadcrumbs back button */}
          <Link href="/#blog" className={styles.backLink}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <span>Back to Blog Posts</span>
          </Link>

          {/* Article Header */}
          <header className={styles.articleHeader}>
            <span className={styles.categoryTag}>{post.category || 'General'}</span>
            <h1 className={styles.articleTitleLarge}>{post.title}</h1>
            
            <div className={styles.metaRow}>
              <div className={styles.authorCardHeader}>
                <img 
                  src={post.author_avatar} 
                  alt={post.author_name} 
                  className={styles.avatarMini}
                  onError={(e) => {
                    e.target.src = fallbackAvatar;
                  }}
                />
                <span className={styles.authorNameText}>{post.author_name}</span>
              </div>
              <span className={styles.dividerDot}>•</span>
              <span style={{ fontSize: '0.9rem' }}>{post.date}</span>
            </div>
          </header>

          {/* Large Hero Image */}
          <div className={styles.heroImageWrapper}>
            <img 
              src={post.image_url} 
              alt={post.title} 
              className={styles.heroImage}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
          </div>

          {/* Luxury Article Body */}
          <article className={styles.articleBody}>
            {/* The first paragraph will automatically style with drop caps via CSS */}
            {post.content.split('\n\n').map((para, idx) => {
              const text = para.trim();
              if (text.startsWith('> ')) {
                // Style custom blockquotes elegantly
                return (
                  <blockquote key={idx} className={styles.pullQuote}>
                    {text.substring(2)}
                  </blockquote>
                );
              }
              return (
                <p key={idx}>
                  {text}
                </p>
              );
            })}
          </article>

          {/* Social Media Sharing Rows */}
          <div className={styles.socialShareRow}>
            <span className={styles.shareTitle}>Share this Article</span>
            <div className={styles.shareButtons}>
              <button className={styles.shareBtn} title="Share on Facebook">
                <svg className={styles.shareIcon} viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
              <button className={styles.shareBtn} title="Share on Twitter">
                <svg className={styles.shareIcon} viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </button>
              <button className={styles.shareBtn} title="Share on LinkedIn">
                <svg className={styles.shareIcon} viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Elegant Author Profile Box */}
          <footer className={styles.authorProfileCard}>
            <img 
              src={post.author_avatar} 
              alt={post.author_name} 
              className={styles.authorAvatarLarge}
              onError={(e) => {
                e.target.src = fallbackAvatar;
              }}
            />
            <div className={styles.authorInfoCol}>
              <span className={styles.authorRole}>{authorRole}</span>
              <h3 className={styles.authorNameTitle}>{post.author_name}</h3>
              <p className={styles.authorBioText}>
                Senior education and luxury service representative at Uniworld Academy, ensuring that our five-star boutique crew receives the absolute highest standards in European cruising operations.
              </p>
              <p className={styles.authorQuote}>
                "{authorQuote}"
              </p>
            </div>
          </footer>

        </div>
      </section>

      {/* Related articles base grid */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Related Training Articles</h2>
            
            <div className={styles.relatedGrid}>
              {relatedPosts.map((relatedPost) => (
                <BlogPostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
