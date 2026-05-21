'use client';

import styles from './CategoryCard.module.css';

export default function CategoryCard({ category }) {
	const {
		name = 'Category',
		count = 0,
		imageUrl = '/images/LeopardBar.jpg',
	} = category;

	// Provide premium fallback images from Unsplash for different categories if needed
	const getFallbackImage = (name) => {
		const term = name.toLowerCase();
		if (
			term.includes('food') ||
			term.includes('beverage') ||
			term.includes('culinary')
		) {
			return 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&auto=format&fit=crop&q=60';
		}
		if (
			term.includes('service') ||
			term.includes('relations') ||
			term.includes('hospitality')
		) {
			return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&auto=format&fit=crop&q=60';
		}
		if (
			term.includes('operation') ||
			term.includes('deck') ||
			term.includes('nav')
		) {
			return 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=300&auto=format&fit=crop&q=60';
		}
		if (term.includes('wellness') || term.includes('spa')) {
			return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&auto=format&fit=crop&q=60';
		}
		if (term.includes('excursion') || term.includes('travel')) {
			return 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300&auto=format&fit=crop&q=60';
		}
		if (term.includes('butler')) {
			return 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&auto=format&fit=crop&q=60';
		}
		return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=60';
	};

	return (
		<div className={styles.card}>
			<img
				src={imageUrl}
				alt={name}
				className={styles.bgImage}
				onError={(e) => {
					e.target.src = getFallbackImage(name);
				}}
			/>
			<div className={styles.overlay}>
				<div className={styles.text}>
					<h4 className={styles.name}>{name}</h4>
					<span className={styles.count}>{count} Courses</span>
				</div>
			</div>
		</div>
	);
}
