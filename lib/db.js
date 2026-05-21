const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(process.cwd(), 'database.db');
const dbExists = fs.existsSync(dbPath) && fs.statSync(dbPath).size > 0;

const db = new Database(dbPath, { timeout: 10000 });

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

if (!dbExists) {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      content TEXT,
      image_url TEXT,
      rating INTEGER DEFAULT 5,
      category TEXT,
      duration TEXT,
      author TEXT,
      price TEXT DEFAULT 'Free'
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      image_url TEXT,
      count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS fleet (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      category TEXT NOT NULL, -- e.g., 'France', 'Italy', 'Central Europe'
      image_url TEXT,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      value TEXT NOT NULL,
      highlight INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT,
      category TEXT,
      image_url TEXT,
      date TEXT,
      author_name TEXT,
      author_avatar TEXT
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      quote TEXT NOT NULL,
      author TEXT NOT NULL,
      role TEXT,
      avatar_url TEXT
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      quote TEXT,
      avatar_url TEXT
    );
  `);
}

// Function to seed initial premium demo data if tables are empty
function seedData() {
  // Check if categories are empty
  const categoryCount = db.prepare('SELECT count(*) as count FROM categories').get();
  if (categoryCount.count === 0) {
    const insertCat = db.prepare('INSERT INTO categories (name, slug, image_url, count) VALUES (?, ?, ?, ?)');
    const cats = [
      ['Food & Beverage', 'food-beverage', '/images/Cocktails.jpg', 12],
      ['Onboard Service', 'onboard-service', '/images/Reception.jpg', 8],
      ['Ship Operations', 'ship-operations', '/images/butler.jpg', 15],
      ['Wellness & Spa', 'wellness-spa', '/images/Wellbeing.jpg', 6],
      ['Excursions', 'excursions', '/images/Nature.jpg', 10],
      ['Hospitality', 'hospitality', '/images/butler.jpg', 18],
      ['Safety & Security', 'safety-security', '/images/butler.jpg', 4],
      ['Culinary Arts', 'culinary-arts', '/images/Sommelier.jpg', 14],
      ['Housekeeping', 'housekeeping', '/images/house2.jpg', 9],
      ['Butler Service', 'butler-service', '/images/butler.jpg', 7],
      ['Navigation & Deck', 'navigation-deck', '/images/Screenshot-2022-05-16-204809.png', 11],
      ['Guest Relations', 'guest-relations', '/images/Reception.jpg', 5],
      ['Leadership', 'leadership', '/images/hotel-manager.jpg', 3]
    ];
    
    const insertTransaction = db.transaction(() => {
      for (const cat of cats) {
        insertCat.run(cat[0], cat[1], cat[2], cat[3]);
      }
    });
    insertTransaction();
  }

  // Check if courses are empty
  const courseCount = db.prepare('SELECT count(*) as count FROM courses').get();
  if (courseCount.count === 0) {
    const insertCourse = db.prepare('INSERT INTO courses (title, slug, content, image_url, rating, category, duration, author, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const courses = [
      ['Introduction to River Cruising', 'intro-to-river-cruising', 'Learn the basics of luxury river cruises, standard operational procedures, and the Uniworld legacy.', '/images/RC.jpg', 5, 'Hospitality', '3 hours', 'Uniworld Academy', 'Free'],
      ['Ship Classes & Deck Plans', 'ship-classes-deck-plans', 'Master the differences between our Super Ships (S.S.) and river ships, understanding guest capacities and layout structures.', '/images/Screenshot-2022-05-16-204809.png', 5, 'Ship Operations', '4 hours', 'Uniworld Academy', 'Free'],
      ['Food & Beverage Excellence', 'food-beverage-excellence', 'Delve into the fine dining standards, wine pairings, and elegant table service expected on onboard cruises.', '/images/Cocktails.jpg', 5, 'Culinary Arts', '5 hours', 'Uniworld Academy', 'Free'],
      ['Wine & Spirits Onboard', 'wine-spirits-onboard', 'Explore our comprehensive selection of premium wines, regional spirits, and standard cocktail crafting.', '/images/champagne-saber.jpg', 5, 'Food & Beverage', '6 hours', 'Uniworld Academy', 'Free'],
      ['Housekeeping Standards', 'housekeeping-standards', 'Understand the meticulous cleaning protocols, luxury turn-down services, and suite presentation requirements.', '/images/house2.jpg', 5, 'Housekeeping', '3.5 hours', 'Uniworld Academy', 'Free'],
      ['Butler Service Protocols', 'butler-service-protocols', 'Learn the butler service etiquette, personalized guest assistance, and luxury service standards.', '/images/butler.jpg', 5, 'Butler Service', '4.5 hours', 'Uniworld Academy', 'Free']
    ];

    const insertTransaction = db.transaction(() => {
      for (const course of courses) {
        insertCourse.run(course[0], course[1], course[2], course[3], course[4], course[5], course[6], course[7], course[8]);
      }
    });
    insertTransaction();
  }

  // Check if fleet is empty
  const fleetCount = db.prepare('SELECT count(*) as count FROM fleet').get();
  if (fleetCount.count === 0) {
    const insertFleet = db.prepare('INSERT INTO fleet (name, slug, category, image_url, description) VALUES (?, ?, ?, ?, ?)');
    const fleet = [
      // France
      ['S.S. Bon Voyage', 'ss-bon-voyage', 'Sailing in France', '/images/SS-Bon-Voiage.jpg', 'Designed to immerse guests in French culture, art, and wine, featuring stunning French decor.'],
      ['S.S. Joie de Vivre', 'ss-joie-de-vivre', 'Sailing in France', '/images/Joie-de-vivre.jpg', 'Reflects the French "joy of living" with elegant Parisian styling, fine fabrics, and beautiful accents.'],
      ['S.S. Catherine', 'ss-catherine', 'Sailing in France', '/images/SS-Catherine.jpg', 'Boasts exquisite interiors with custom-designed furnishings, Murano glass chandeliers, and beautiful artwork.'],
      
      // Italy
      ['S.S. La Venezia', 'ss-la-venezia', 'Sailing in Italy', '/images/ss-La-Venezia.jpg', 'Superbly styled to reflect Venitian culture, sailing guests through the heart of Venice and its beautiful lagoons.'],
      
      // Central Europe
      ['S.S. Maria Theresa', 'ss-maria-theresa', 'Sailing in Central Europe', '/images/Maria-theresa.jpg', 'A true floating palace, designed in royal Baroque style to honor the great Maria Theresa.'],
      ['S.S. Beatrice', 'ss-beatrice', 'Sailing in Central Europe', '/images/SSBeatrice.jpg', 'Features a fresh, modern luxury feel with bright open public spaces and elegant wood paneling.'],
      ['River Duchess', 'river-duchess', 'Sailing in Central Europe', '/images/RD.jpg', 'Decorated in soft, soothing hues, offering a peaceful and beautiful ambiance as you sail.'],
      ['River Queen', 'river-queen', 'Sailing in Central Europe', '/images/RQ-1.jpg', 'A classic, elegant cruise ship featuring a unique exterior reminiscent of 1930s classic steamships.'],
      ['River Princess', 'river-princess', 'Sailing in Central Europe', '/images/River-Princess.jpg', 'Offers elegant interiors, cozy public spaces, and standard amenities for European river sailings.'],
      ['River Empress', 'river-empress', 'Sailing in Central Europe', '/images/river-empress-uniworld.jpg', 'Features warm jewel tones and a classic design that creates an elegant and comfortable atmosphere.']
    ];

    const insertTransaction = db.transaction(() => {
      for (const ship of fleet) {
        insertFleet.run(ship[0], ship[1], ship[2], ship[3], ship[4]);
      }
    });
    insertTransaction();
  }

  // Check if stats are empty
  const statsCount = db.prepare('SELECT count(*) as count FROM stats').get();
  if (statsCount.count === 0) {
    const insertStat = db.prepare('INSERT INTO stats (label, value, highlight) VALUES (?, ?, ?)');
    const stats = [
      ['Destinations', '51+', 0],
      ['Cruises', '173+', 0],
      ['Countries', '15+', 0],
      ['Happy Guests', '2M+', 1]
    ];

    const insertTransaction = db.transaction(() => {
      for (const stat of stats) {
        insertStat.run(stat[0], stat[1], stat[2]);
      }
    });
    insertTransaction();
  }

  // Check if blog posts are empty
  const blogCount = db.prepare('SELECT count(*) as count FROM blog_posts').get();
  if (blogCount.count === 0) {
    const insertBlog = db.prepare('INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, date, author_name, author_avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    const blogs = [
      ['Sailing the Danube: A Journey Through Time', 'sailing-danube-journey-through-time', 'Discover the historical significance and breathtaking sights along the majestic Danube river route.', 'The Danube is not just a river; it is a ribbon of history that connects some of Central Europe\'s most beautiful cities and cultures.', 'Destinations', '/images/Nature.jpg', 'May 15, 2026', 'Astrid Veldwijk', '/images/Astrid.jpg'],
      ['Culinary Highlights: Fine Dining on River Cruises', 'culinary-highlights-fine-dining-river-cruises', 'Explore the regional specialties and premium chef creations served onboard our cruises.', 'We believe that culinary experiences are central to any luxury travel experience, especially onboard our river cruises.', 'Culinary', '/images/Sommelier.jpg', 'May 10, 2026', 'Toni M.', '/images/hotel-manager.jpg'],
      ['Green Cruising & Sustainability at Sea', 'green-cruising-sustainability-at-sea', 'Our commitment to protecting the environment and implementing eco-friendly cruise protocols.', 'As caretakers of the beautiful waterways we sail, Uniworld is committed to reducing environmental impact.', 'Sustainability', '/images/EarthDay.jpg', 'May 05, 2026', 'Astrid Veldwijk', '/images/Astrid.jpg'],
      ['Uniworld\'s Newest Ship: A Masterpiece of Design', 'uniworld-newest-ship-design-masterpiece', 'A sneak peek into the design details, boutique suites, and luxury amenities of our new ship.', 'Every new ship in our fleet is designed as an architectural masterpiece, tailored to reflect the regions it sails.', 'Fleet', '/images/SSBeatrice.jpg', 'April 28, 2026', 'Toni M.', '/images/hotel-manager.jpg']
    ];

    const insertTransaction = db.transaction(() => {
      for (const blog of blogs) {
        insertBlog.run(blog[0], blog[1], blog[2], blog[3], blog[4], blog[5], blog[6], blog[7], blog[8]);
      }
    });
    insertTransaction();
  }

  // Check if testimonials are empty
  const testimonialCount = db.prepare('SELECT count(*) as count FROM testimonials').get();
  if (testimonialCount.count === 0) {
    const insertTestimonial = db.prepare('INSERT INTO testimonials (quote, author, role, avatar_url) VALUES (?, ?, ?, ?)');
    const testimonials = [
      ['The training modules provided by the Uniworld Academy prepared me for the impeccable service expected onboard.', 'Elena Rostova', 'Stateroom Stewardess', '/images/testimonial-1.png'],
      ['As a chef, understanding the food and wine pairing courses raised my culinary standards to new heights.', 'Marco Bianchi', 'Executive Chef', '/images/testimonial-2.png'],
      ['The deck officer training was detailed, standard, and gave me confidence in navigating European waterways.', 'Jean-Pierre Laurent', 'First Officer', '/images/testimonial-3.png']
    ];

    const insertTransaction = db.transaction(() => {
      for (const t of testimonials) {
        insertTestimonial.run(t[0], t[1], t[2], t[3]);
      }
    });
    insertTransaction();
  }

  // Check if team members are empty
  const teamCount = db.prepare('SELECT count(*) as count FROM team_members').get();
  if (teamCount.count === 0) {
    const insertTeam = db.prepare('INSERT INTO team_members (name, role, quote, avatar_url) VALUES (?, ?, ?, ?)');
    const team = [
      ['Toni M.', 'Head of Academy', 'Our mission is to empower our crew with top-tier education, ensuring our guests receive the absolute best, award-winning river cruise experience in the world.', '/images/hotel-manager.jpg'],
      ['Astrid Veldwijk', 'Senior Director of Training', 'We combine standard river ship operations with five-star boutique hotel training to build the most capable hospitality crew in the industry.', '/images/Astrid.jpg']
    ];

    const insertTransaction = db.transaction(() => {
      for (const member of team) {
        insertTeam.run(member[0], member[1], member[2], member[3]);
      }
    });
    insertTransaction();
  }
}

if (!dbExists) {
  seedData();
}

module.exports = db;
