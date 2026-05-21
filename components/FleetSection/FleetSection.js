'use client';

import { useState } from 'react';
import styles from './FleetSection.module.css';

export default function FleetSection({ fleet = [] }) {
  const categories = ['Sailing in France', 'Sailing in Italy', 'Sailing in Central Europe'];
  const [activeTab, setActiveTab] = useState(categories[0]);

  const filteredFleet = fleet.filter(ship => ship.category === activeTab);

  // Fallback images from Unsplash for our beautiful ships
  const getFallbackShipImage = (name) => {
    const term = name.toLowerCase();
    if (term.includes('venezia')) {
      return 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800&auto=format&fit=crop&q=60';
    }
    if (term.includes('voyage') || term.includes('vivre') || term.includes('catherine')) {
      return 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?w=800&auto=format&fit=crop&q=60';
    }
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=60';
  };

  return (
    <section id="fleet" className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Our Fleet</h2>
          <p className={styles.subtitle}>
            Explore our state-of-the-art Boutique River Cruise ships, where luxury design meets flawless service standards across European waterways.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className={styles.tabsContainer}>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={`${styles.tabBtn} ${activeTab === cat ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Fleet Grid */}
        <div className={`${styles.fleetGrid} ${filteredFleet.length === 1 ? styles.singleGrid : ''}`}>
          {filteredFleet.map((ship) => (
            <div key={ship.id} className={styles.shipCard}>
              <img
                src={ship.image_url}
                alt={ship.name}
                className={styles.shipImage}
                onError={(e) => {
                  e.target.src = getFallbackShipImage(ship.name);
                }}
              />
              <div className={styles.shipOverlay}>
                <h3 className={styles.shipName}>{ship.name}</h3>
                <p className={styles.shipDesc}>{ship.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
