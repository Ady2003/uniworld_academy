const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

const xmlPath = path.resolve(process.cwd(), 'uniworld_academy.xml');
const dbPath = path.resolve(process.cwd(), 'database.db');

if (!fs.existsSync(xmlPath)) {
  console.log("------------------------------------------------------------------");
  console.log("NOTĂ: Fișierul 'uniworld_academy.xml' nu a fost găsit în rădăcina proiectului.");
  console.log("Website-ul va folosi datele demo premium create automat.");
  console.log("Pentru a importa datele reale, salvați fișierul XML ca 'uniworld_academy.xml'");
  console.log("în rădăcina proiectului și rulați comanda: node scripts/import-xml.js");
  console.log("------------------------------------------------------------------");
  process.exit(0);
}

console.log("S-a detectat fișierul XML! Se începe parsarea...");

const xmlContent = fs.readFileSync(xmlPath, 'utf8');

// Helper to extract CDATA or text contents between tag names
function getTagValue(itemStr, tagName) {
  const regex = new RegExp(`<${tagName}(?:\\s+[^>]*)*>([\\s\\S]*?)<\\/${tagName}>`, 'i');
  const match = itemStr.match(regex);
  if (!match) return '';
  let val = match[1].trim();
  if (val.startsWith('<![CDATA[')) {
    val = val.substring(9, val.length - 3).trim();
  }
  return val;
}

// Helper to extract postmeta values
function getPostMeta(itemStr, keyName) {
  const metaRegex = /<wp:postmeta>([\s\\S]*?)<\/wp:postmeta>/gi;
  let match;
  while ((match = metaRegex.exec(itemStr)) !== null) {
    const metaStr = match[1];
    const key = getTagValue(metaStr, 'wp:meta_key');
    if (key === keyName) {
      return getTagValue(metaStr, 'wp:meta_value');
    }
  }
  return '';
}

// Split XML into items
const items = xmlContent.split('<item>');
items.shift(); // Remove the header part

console.log(`S-au găsit ${items.length} elemente în fișierul XML.`);

const db = new Database(dbPath);

// Maps to store attachments and categories
const attachmentMap = new Map(); // attachment_id -> url
const courses = [];
const posts = [];
const categoriesMap = new Map(); // category slug -> category name

// First pass: Parse attachments and categories
for (const item of items) {
  const postType = getTagValue(item, 'wp:post_type');
  const title = getTagValue(item, 'title');
  
  if (postType === 'attachment') {
    const postId = getTagValue(item, 'wp:post_id');
    const attachmentUrl = getTagValue(item, 'wp:attachment_url') || getTagValue(item, 'guid');
    if (postId && attachmentUrl) {
      // Clean up local domain to relative or public path
      let cleanUrl = attachmentUrl;
      if (cleanUrl.includes('/wp-content/uploads/')) {
        cleanUrl = cleanUrl.substring(cleanUrl.indexOf('/wp-content/uploads/'));
      }
      attachmentMap.set(postId, cleanUrl);
    }
  }
}

// Parse categories and tags terms from RSS header
const categoryMatches = xmlContent.match(/<wp:category>([\s\S]*?)<\/wp:category>/g) || [];
for (const catXml of categoryMatches) {
  const name = getTagValue(catXml, 'wp:cat_name');
  const slug = getTagValue(catXml, 'wp:category_nicename');
  if (name && slug) {
    categoriesMap.set(slug, name);
  }
}

const termMatches = xmlContent.match(/<wp:term>([\s\S]*?)<\/wp:term>/g) || [];
for (const termXml of termMatches) {
  const taxonomy = getTagValue(termXml, 'wp:term_taxonomy');
  if (taxonomy === 'course-category' || taxonomy === 'product_cat') {
    const name = getTagValue(termXml, 'wp:term_name');
    const slug = getTagValue(termXml, 'wp:term_slug');
    if (name && slug) {
      categoriesMap.set(slug, name);
    }
  }
}

console.log(`S-au găsit și mapat ${attachmentMap.size} imagini (atașamente).`);
console.log(`S-au găsit ${categoriesMap.size} categorii definite.`);

// Second pass: Parse courses and posts
for (const item of items) {
  const title = getTagValue(item, 'title');
  if (!title || title.startsWith('woocommerce-placeholder')) continue;

  const postType = getTagValue(item, 'wp:post_type');
  const slug = getTagValue(item, 'wp:post_name') || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const content = getTagValue(item, 'content:encoded');
  const excerpt = getTagValue(item, 'excerpt:encoded') || content.substring(0, 150) + '...';
  const date = getTagValue(item, 'pubDate') || new Date().toUTCString();
  const authorName = getTagValue(item, 'dc:creator');
  
  // Resolve image
  const thumbnailId = getPostMeta(item, '_thumbnail_id');
  let imageUrl = '/images/course-placeholder.png';
  if (thumbnailId && attachmentMap.has(thumbnailId)) {
    imageUrl = attachmentMap.get(thumbnailId);
  }

  // Parse taxonomies for this item
  let category = 'Uncategorized';
  const categoryRegex = /<category\s+domain="([^"]+)"\s+nicename="([^"]+)"/gi;
  let catMatch;
  while ((catMatch = categoryRegex.exec(item)) !== null) {
    const domain = catMatch[1];
    const nicename = catMatch[2];
    if (domain === 'course-category' || domain === 'category' || domain === 'product_cat') {
      category = categoriesMap.get(nicename) || nicename;
      break;
    }
  }

  if (postType === 'course' || postType === 'product') {
    courses.push({
      title,
      slug,
      content,
      imageUrl,
      rating: 5,
      category,
      duration: '4 hours',
      author: 'Uniworld Academy'
    });
  } else if (postType === 'post') {
    posts.push({
      title,
      slug,
      excerpt,
      content,
      category,
      imageUrl,
      date: new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      authorName,
      authorAvatar: '/images/team-astrid.png'
    });
  }
}

console.log(`S-au parsat cu succes ${courses.length} cursuri și ${posts.length} articole de blog.`);

// Import data in SQLite transaction
db.transaction(() => {
  // Clear existing courses and blog posts if we found new ones in the XML
  if (courses.length > 0) {
    console.log("Ștergere cursuri demo existente și înlocuire cu datele reale...");
    db.prepare('DELETE FROM courses').run();
    const insertCourse = db.prepare('INSERT INTO courses (title, slug, content, image_url, rating, category, duration, author, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const c of courses) {
      insertCourse.run(c.title, c.slug, c.content, c.imageUrl, c.rating, c.category, c.duration, c.author, 'Free');
    }
  }

  if (posts.length > 0) {
    console.log("Ștergere articole blog demo existente și înlocuire cu datele reale...");
    db.prepare('DELETE FROM blog_posts').run();
    const insertPost = db.prepare('INSERT INTO blog_posts (title, slug, excerpt, content, category, image_url, date, author_name, author_avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    for (const p of posts) {
      insertPost.run(p.title, p.slug, p.excerpt, p.content, p.category, p.imageUrl, p.date, p.authorName, p.authorAvatar);
    }
  }

  // Update categories counts based on imported items
  if (courses.length > 0 || posts.length > 0) {
    db.prepare('DELETE FROM categories').run();
    const insertCategory = db.prepare('INSERT INTO categories (name, slug, image_url, count) VALUES (?, ?, ?, ?)');
    
    // Group counts
    const counts = {};
    for (const c of courses) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    for (const p of posts) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }

    for (const [catName, count] of Object.entries(counts)) {
      const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      insertCategory.run(catName, slug, `/images/cat-${slug}.png`, count);
    }
  }
})();

console.log("Import finalizat cu succes! Baza de date SQLite locală a fost actualizată.");
