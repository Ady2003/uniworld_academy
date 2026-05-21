'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
			<div className={`containerNav ${styles.navContainer}`}>
				{/* Logo */}
				<Link href='/#home' className={styles.logo}>
					<span className={styles.logoTitle}>UNIWORLD</span>
					<span className={styles.logoSubtitle}>Academy</span>
				</Link>

				{/* Desktop Nav Links */}
				<nav>
					<ul className={styles.navList}>
						<li>
							<Link href='/#home' className={styles.navLink}>
								Home
							</Link>
						</li>
						<li>
							<Link href='/#courses' className={styles.navLink}>
								Featured Courses
							</Link>
						</li>
						<li>
							<Link href='/#categories' className={styles.navLink}>
								Categories
							</Link>
						</li>
						<li>
							<Link href='/#fleet' className={styles.navLink}>
								Our Fleet
							</Link>
						</li>
						<li>
							<Link href='/#blog' className={styles.navLink}>
								Blog Posts
							</Link>
						</li>
						<li>
							<Link href='/#team' className={styles.navLink}>
								Our Team
							</Link>
						</li>
					</ul>
				</nav>

				{/* Contact Info and Actions */}
				<div className={styles.contactContainer}>
					<a href='tel:+390184532322' className={styles.phoneLink}>
						<svg className={styles.phoneIcon} viewBox='0 0 24 24'>
							<path d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-2.2 2.2a15.045 15.045 0 01-6.59-6.59l2.2-2.21a.96.96 0 00.25-1A11.36 11.36 0 018.82 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z' />
						</svg>
						<span>+40 720 527809</span>
					</a>
					<button className={styles.langBtn} aria-label='Change Language'>
						<svg className={styles.flagIcon} viewBox='0 0 640 480' width='20'>
							<g fillRule='evenodd' strokeWidth='1pt'>
								<path fill='#ffff00' d='M0 0h640v480H0z' />
								<path fill='#f00' d='M0 0h213.3v480H0z' />
								<path fill='#0000ff' d='M426.7 0H640v480H426.7z' />
							</g>
						</svg>
					</button>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					className={styles.mobileToggle}
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label='Toggle Menu'
				>
					<span
						className={styles.bar}
						style={{
							transform: mobileMenuOpen
								? 'rotate(45deg) translate(5px, 5px)'
								: 'none',
						}}
					></span>
					<span
						className={styles.bar}
						style={{ opacity: mobileMenuOpen ? 0 : 1 }}
					></span>
					<span
						className={styles.bar}
						style={{
							transform: mobileMenuOpen
								? 'rotate(-45deg) translate(6px, -7px)'
								: 'none',
						}}
					></span>
				</button>
			</div>

			{/* Mobile Drawer (Basic absolute overlay) */}
			{mobileMenuOpen && (
				<div
					style={{
						position: 'absolute',
						top: '80px',
						left: 0,
						width: '100%',
						background: 'var(--bg-secondary)',
						borderBottom: 'var(--border-subtle)',
						padding: '20px',
						display: 'flex',
						flexDirection: 'column',
						gap: '16px',
						zIndex: 999,
						animation: 'fadeIn 0.2s ease-out',
					}}
				>
					<Link
						href='/#home'
						onClick={() => setMobileMenuOpen(false)}
						style={{
							padding: '8px 0',
							borderBottom: 'var(--border-subtle)',
							color: 'var(--text-primary)',
						}}
					>
						Home
					</Link>
					<Link
						href='/#courses'
						onClick={() => setMobileMenuOpen(false)}
						style={{
							padding: '8px 0',
							borderBottom: 'var(--border-subtle)',
							color: 'var(--text-primary)',
						}}
					>
						Featured Courses
					</Link>
					<Link
						href='/#categories'
						onClick={() => setMobileMenuOpen(false)}
						style={{
							padding: '8px 0',
							borderBottom: 'var(--border-subtle)',
							color: 'var(--text-primary)',
						}}
					>
						Categories
					</Link>
					<Link
						href='/#fleet'
						onClick={() => setMobileMenuOpen(false)}
						style={{
							padding: '8px 0',
							borderBottom: 'var(--border-subtle)',
							color: 'var(--text-primary)',
						}}
					>
						Our Fleet
					</Link>
					<Link
						href='/#blog'
						onClick={() => setMobileMenuOpen(false)}
						style={{
							padding: '8px 0',
							borderBottom: 'var(--border-subtle)',
							color: 'var(--text-primary)',
						}}
					>
						Blog Posts
					</Link>
					<Link
						href='/#team'
						onClick={() => setMobileMenuOpen(false)}
						style={{ padding: '8px 0', color: 'var(--text-primary)' }}
					>
						Our Team
					</Link>
				</div>
			)}
		</header>
	);
}
