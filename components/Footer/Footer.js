import styles from './Footer.module.css';

export default function Footer() {
	return (
		<footer id='contact' className={styles.footer}>
			<div className='container'>
				<div className={styles.grid}>
					{/* Brand Info */}
					<div className={styles.brandCol}>
						<div>
							<span className={styles.logoTitle}>UNIWORLD</span>
							<span className={styles.logoSubtitle}>
								Boutique River Cruises
							</span>
						</div>
						<p className={styles.brandDesc}>
							Providing the world&apos;s finest boutique river cruise
							experiences with an absolute dedication to luxury, design, and
							impeccable service standards.
						</p>
						<div className={styles.socialRow}>
							<a href='#' className={styles.socialBtn} aria-label='Facebook'>
								<svg className={styles.socialIcon} viewBox='0 0 24 24'>
									<path d='M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79z' />
								</svg>
							</a>
							<a href='#' className={styles.socialBtn} aria-label='Instagram'>
								<svg className={styles.socialIcon} viewBox='0 0 24 24'>
									<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z' />
								</svg>
							</a>
							<a href='#' className={styles.socialBtn} aria-label='LinkedIn'>
								<svg className={styles.socialIcon} viewBox='0 0 24 24'>
									<path d='M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z' />
								</svg>
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className={styles.linkCol}>
						<h4 className={styles.colTitle}>Quick Links</h4>
						<ul className={styles.linkList}>
							<li>
								<a href='#home' className={styles.linkItem}>
									Home
								</a>
							</li>
							<li>
								<a href='#courses' className={styles.linkItem}>
									Featured Courses
								</a>
							</li>
							<li>
								<a href='#categories' className={styles.linkItem}>
									Categories
								</a>
							</li>
							<li>
								<a href='#fleet' className={styles.linkItem}>
									Our Fleet
								</a>
							</li>
						</ul>
					</div>

					{/* Resources */}
					<div className={styles.linkCol}>
						<h4 className={styles.colTitle}>Resources</h4>
						<ul className={styles.linkList}>
							<li>
								<a href='#' className={styles.linkItem}>
									Help Center
								</a>
							</li>
							<li>
								<a href='#' className={styles.linkItem}>
									Privacy Policy
								</a>
							</li>
							<li>
								<a href='#' className={styles.linkItem}>
									Terms of Service
								</a>
							</li>
							<li>
								<a href='#' className={styles.linkItem}>
									FAQs
								</a>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div className={styles.linkCol}>
						<h4 className={styles.colTitle}>Contact Us</h4>
						<ul className={styles.linkList}>
							<li className={styles.linkItem}>Bucharest, Romania</li>
							<li className={styles.linkItem}>info@uniworld.com</li>
							<li className={styles.linkItem}>+40 720 527 809</li>
						</ul>
					</div>
				</div>

				{/* Bottom copyright line */}
				<div className={styles.bottomBar}>
					<div className={styles.copyright}>
						<span>© 2026 Uniworld Academy. All rights reserved.</span>
					</div>
					<div className={styles.bottomLinks}>
						<a href='#' className={styles.bottomLink}>
							Privacy Policy
						</a>
						<a href='#' className={styles.bottomLink}>
							Terms of Use
						</a>
					</div>
				</div>

				{/* Bottom copyright line */}
				<div className={styles.bottomBar2}>
					<div className={styles.copyright}>
						<span>© 2026 Mircea Adrian. All rights reserved.</span>
					</div>
				</div>
			</div>
		</footer>
	);
}
