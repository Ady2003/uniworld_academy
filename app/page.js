import db from '../lib/db';
import styles from './page.module.css';

// Reusable Components
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import CourseCard from '../components/CourseCard/CourseCard';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import FleetSection from '../components/FleetSection/FleetSection';
import StatCard from '../components/StatCard/StatCard';
import BlogPostCard from '../components/BlogPostCard/BlogPostCard';
import TestimonialCard from '../components/TestimonialCard/TestimonialCard';
import Footer from '../components/Footer/Footer';
import Image from 'next/image';

// Set page metadata
export const metadata = {
	title: 'Uniworld Academy | Premium River Cruises LMS Portal',
	description:
		'Reconstructed luxury training portal for five-star river cruising crew, providing premium courses, fleet data, and operational materials.',
};

export default function Home() {
	// Query SQLite local database synchronously (Server Component)
	const courses = db.prepare('SELECT * FROM courses LIMIT 6').all();
	const categories = db
		.prepare('SELECT * FROM categories ORDER BY count DESC LIMIT 13')
		.all();
	const fleet = db.prepare('SELECT * FROM fleet').all();
	const stats = db.prepare('SELECT * FROM stats').all();
	const blogPosts = db.prepare('SELECT * FROM blog_posts LIMIT 4').all();
	const testimonials = db.prepare('SELECT * FROM testimonials').all();
	const teamMembers = db.prepare('SELECT * FROM team_members').all();

	// Find head of academy (Toni M.) from team members
	const teamLead =
		teamMembers.find((member) => member.role.includes('Head')) ||
		teamMembers[0];

	return (
		<main className={styles.main}>
			{/* Stick Header Navbar */}
			<Navbar />

			{/* Hero section */}
			<Hero />

			{/* Featured Courses Grid */}
			<section id='courses' className={styles.coursesSection}>
				<div className='container'>
					<div className={styles.sectionHeaderRow}>
						<div>
							<h2 className={styles.sectionTitle}>Featured Courses</h2>
							<p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
								Acquire industry-standard skills with our curated river cruising
								training.
							</p>
						</div>
						<a
							href='#courses'
							className='btn-primary'
							style={{ padding: '8px 20px', fontSize: '0.85rem' }}
						>
							View All
						</a>
					</div>

					<div className={styles.coursesGrid}>
						{courses.map((course) => (
							<CourseCard key={course.id} course={course} />
						))}
					</div>
				</div>
			</section>

			{/* Popular Categories Grid */}
			<section id='categories' className={styles.categoriesSection}>
				<div className='container'>
					<center style={{ marginBottom: '50px' }}>
						<h2 className={styles.sectionTitle}>Popular Categories</h2>
						<p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
							Explore specialized modules tailored for each department onboard.
						</p>
					</center>

					<div className={styles.categoriesGrid}>
						{categories.map((category) => (
							<CategoryCard key={category.id} category={category} />
						))}
					</div>
				</div>
			</section>

			{/* Fleet Section with stats underneath */}
			<div style={{ position: 'relative' }}>
				<FleetSection fleet={fleet} />

				{/* Statistics nested inside fleet background */}
				<section
					className={styles.categoriesSection}
					style={{
						background: 'var(--bg-secondary)',
						borderTop: 'var(--border-subtle)',
					}}
				>
					<div className='container'>
						<div className={styles.statsGrid}>
							{stats.map((stat) => (
								<StatCard key={stat.id} stat={stat} />
							))}
						</div>
					</div>
				</section>
			</div>

			{/* Blog Posts Grid */}
			<section id='blog' className={`${styles.section} ${styles.blogSection}`}>
				<div className='container'>
					<div className={styles.sectionHeaderRow}>
						<div>
							<h2 className={styles.sectionTitle}>Blog Posts</h2>
							<p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
								Stay informed with the latest cruise operations, fleet updates,
								and training articles.
							</p>
						</div>
						<a
							href='#blog'
							className='btn-primary'
							style={{ padding: '8px 20px', fontSize: '0.85rem' }}
						>
							View All
						</a>
					</div>

					<div className={styles.blogGrid}>
						{blogPosts.map((post) => (
							<BlogPostCard key={post.id} post={post} />
						))}
					</div>
				</div>
			</section>

			{/* Team Member Section */}
			{teamLead && (
				<section id='team' className={styles.teamSection}>
					<div className='container'>
						<div className={styles.teamWrapper}>
							<h2 className={styles.sectionTitle}>Our Innovative Team</h2>
							<p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
								Meet the education leads driving the luxury hospitality
								standards of our crew.
							</p>

							<div className={styles.teamLeadCard}>
								<Image
									src={teamLead.avatar_url}
									alt={teamLead.name}
									className={styles.teamLeadAvatar}
									width='200'
									height='400'
								/>
								<div className={styles.teamLeadInfo}>
									<h3 className={styles.teamLeadName}>{teamLead.name}</h3>
									<span className={styles.teamLeadRole}>{teamLead.role}</span>
									<p className={styles.teamLeadQuote}>
										&quot;{teamLead.quote}&quot;
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Testimonials Grid */}
			<section className={styles.testimonialsSection}>
				<div className='container'>
					<h2 className={styles.sectionTitle}>
						What people are saying about this new platform
					</h2>
					<p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
						Hear from our onboard officers, executive chefs, and stateroom team.
					</p>

					<div className={styles.testimonialsGrid}>
						{testimonials.map((t) => (
							<TestimonialCard key={t.id} testimonial={t} />
						))}
					</div>
				</div>
			</section>

			{/* Footer info */}
			<Footer />
		</main>
	);
}
