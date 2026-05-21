'use client';

import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
	return (
		<section id='home' className={styles.heroSection}>
			{/* Background image overlay */}
			<Image
				src='/images/SSBeatrice.jpg'
				alt='Boutique River Cruise Sunset'
				className={styles.heroBackground}
				onError={(e) => {
					// Fallback to empty space/gradient if image fails
					e.target.style.display = 'none';
				}}
				width='1400'
				height='800'
			/>
			<div className={styles.heroOverlay}></div>

			<div className={`container ${styles.content}`}>
				<span className={styles.tagline}>Boutique River Cruises Training</span>
				<h1 className={styles.title}>
					The Ultimate <br />
					<span className={styles.accentWord}>Online LMS Academy</span>
				</h1>
				<p className={styles.subtitle}>
					Welcome to the world's leading learning management system for
					five-star river cruising hospitality and deck operations. Master the
					Uniworld standards.
				</p>

				<div className={styles.btnGroup}>
					<a href='#courses' className='btn-primary'>
						Get Started
					</a>
					<a href='#fleet' className='btn-secondary'>
						View Our Fleet
					</a>
				</div>

				{/* 3 Badges */}
				<div className={styles.badgeGrid}>
					{/* Card 1 */}
					<div className={styles.badgeCard}>
						<div className={styles.badgeIconContainer}>
							<svg className={styles.badgeIcon} viewBox='0 0 24 24'>
								<path d='M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.02 0 1.96-.37 2.8-1.05L12 14l5.2 3.95c.84.68 1.78 1.05 2.8 1.05h2v2h-2zM4 14V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10l-8-6.15L4 14z' />
							</svg>
						</div>
						<div className={styles.badgeText}>
							<span className={styles.badgeTitle}>Luxury River Cruises</span>
							<span className={styles.badgeDesc}>
								Five-star service training
							</span>
						</div>
					</div>

					{/* Card 2 */}
					<div className={styles.badgeCard}>
						<div className={styles.badgeIconContainer}>
							<svg className={styles.badgeIcon} viewBox='0 0 24 24'>
								<path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z' />
							</svg>
						</div>
						<div className={styles.badgeText}>
							<span className={styles.badgeTitle}>Best Industry Leaders</span>
							<span className={styles.badgeDesc}>
								Learn from seasoned experts
							</span>
						</div>
					</div>

					{/* Card 3 */}
					<div className={styles.badgeCard}>
						<div className={styles.badgeIconContainer}>
							<svg className={styles.badgeIcon} viewBox='0 0 24 24'>
								<path d='M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 6h2v4h-2v-4zm0-3h2v2h-2V9z' />
							</svg>
						</div>
						<div className={styles.badgeText}>
							<span className={styles.badgeTitle}>Premium and Deluxe</span>
							<span className={styles.badgeDesc}>
								Meticulous attention to detail
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Elegant wavy divider at the bottom of Hero */}
			<div className={styles.waveWrapper}>
				<svg
					className={styles.wave}
					viewBox='0 0 1440 80'
					preserveAspectRatio='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,53.3C1120,43,1280,21,1360,10.7L1440,0L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z'
						fill='#121215'
					></path>
					<path
						d='M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,53.3C1120,43,1280,21,1360,10.7L1440,0'
						fill='none'
						stroke='rgba(124, 58, 237, 0.4)'
						strokeWidth='3'
					></path>
					<path
						d='M0,45L80,48C160,51,320,57,480,61C640,65,800,67,960,61C1120,55,1280,41,1360,34L1440,27'
						fill='none'
						stroke='#f5ebe0'
						strokeWidth='1.5'
						opacity='0.6'
					></path>
				</svg>
			</div>
		</section>
	);
}
