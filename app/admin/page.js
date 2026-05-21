import db from '../../lib/db';
import { revalidatePath } from 'next/cache';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './admin.module.css';

export const metadata = {
  title: 'Uniworld Academy Admin | Database Management',
  description: 'Manage courses and fleet ships in the local SQLite database in real-time.',
};

export default function Admin() {
  // Query current items
  const courses = db.prepare('SELECT * FROM courses ORDER BY id DESC').all();
  const fleet = db.prepare('SELECT * FROM fleet ORDER BY id DESC').all();

  // Next.js Server Actions
  async function addCourse(formData) {
    'use server';
    const title = formData.get('title');
    const category = formData.get('category');
    const duration = formData.get('duration');
    const author = formData.get('author') || 'Uniworld Academy';
    const content = formData.get('content') || '';
    const imageUrl = formData.get('imageUrl') || '/images/course-placeholder.png';
    const rating = parseInt(formData.get('rating')) || 5;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);

    try {
      db.prepare('INSERT INTO courses (title, slug, content, image_url, rating, category, duration, author) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .run(title, slug, content, imageUrl, rating, category, duration, author);
      
      // Update Category count in SQLite
      const catSlug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const catExists = db.prepare('SELECT count(*) as count FROM categories WHERE slug = ?').get(catSlug);
      if (catExists.count > 0) {
        db.prepare('UPDATE categories SET count = count + 1 WHERE slug = ?').run(catSlug);
      } else {
        db.prepare('INSERT INTO categories (name, slug, image_url, count) VALUES (?, ?, ?, ?)')
          .run(category, catSlug, `/images/cat-${catSlug}.png`, 1);
      }

      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {
      console.error("Error inserting course:", e);
    }
  }

  async function deleteCourse(formData) {
    'use server';
    const id = parseInt(formData.get('id'));
    try {
      const course = db.prepare('SELECT category FROM courses WHERE id = ?').get(id);
      if (course) {
        db.prepare('DELETE FROM courses WHERE id = ?').run(id);
        
        // Decrement Category count
        const catSlug = course.category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        db.prepare('UPDATE categories SET count = MAX(0, count - 1) WHERE slug = ?').run(catSlug);
        db.prepare('DELETE FROM categories WHERE count = 0').run();
      }
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {
      console.error("Error deleting course:", e);
    }
  }

  async function addShip(formData) {
    'use server';
    const name = formData.get('name');
    const category = formData.get('category'); // Sailing route
    const description = formData.get('description');
    const imageUrl = formData.get('imageUrl') || '/images/fleet-placeholder.png';

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.floor(Math.random() * 1000);

    try {
      db.prepare('INSERT INTO fleet (name, slug, category, image_url, description) VALUES (?, ?, ?, ?, ?)')
        .run(name, slug, category, imageUrl, description);
      
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {
      console.error("Error inserting ship:", e);
    }
  }

  async function deleteShip(formData) {
    'use server';
    const id = parseInt(formData.get('id'));
    try {
      db.prepare('DELETE FROM fleet WHERE id = ?').run(id);
      revalidatePath('/');
      revalidatePath('/admin');
    } catch (e) {
      console.error("Error deleting ship:", e);
    }
  }

  return (
    <main className={styles.adminPage}>
      <Navbar />

      <div className="container">
        {/* Title Section */}
        <div className={styles.titleSection}>
          <h1 className={styles.title}>LMS Academy Admin</h1>
          <p className={styles.subtitle}>Manage courses and fleet ships database via Next.js Server Actions.</p>
        </div>

        {/* Dashboard grid forms */}
        <div className={styles.grid}>
          {/* Form 1: Add Course */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg className={styles.cardIcon} viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5.47 12.5L12 16l6.53-3.5L12 9l-6.53 3.5z" />
              </svg>
              Add New Course
            </h2>
            <form action={addCourse} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Course Title</label>
                <input name="title" type="text" required placeholder="e.g. Master Suite Housekeeping" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Category</label>
                <select name="category" required className={styles.select}>
                  <option value="Hospitality">Hospitality</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Ship Operations">Ship Operations</option>
                  <option value="Culinary Arts">Culinary Arts</option>
                  <option value="Butler Service">Butler Service</option>
                  <option value="Housekeeping">Housekeeping</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Duration</label>
                <input name="duration" type="text" required placeholder="e.g. 3.5 hours" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Rating (1-5)</label>
                <input name="rating" type="number" min="1" max="5" defaultValue="5" required className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Course Image URL</label>
                <input name="imageUrl" type="text" placeholder="/images/course-new.png" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Brief Description</label>
                <textarea name="content" placeholder="Enter course description details..." className={styles.textarea}></textarea>
              </div>
              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>Save Course</button>
            </form>
          </div>

          {/* Form 2: Add Ship */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              <svg className={styles.cardIcon} viewBox="0 0 24 24">
                <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v-2h2c1.02 0 1.96-.37 2.8-1.05L12 14l5.2 3.95c.84.68 1.78 1.05 2.8 1.05h2v2h-2zM4 14V4c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10l-8-6.15L4 14z" />
              </svg>
              Add New Ship to Fleet
            </h2>
            <form action={addShip} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Ship Name</label>
                <input name="name" type="text" required placeholder="e.g. S.S. Sphinx" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Sailing Route / Category</label>
                <select name="category" required className={styles.select}>
                  <option value="Sailing in France">Sailing in France</option>
                  <option value="Sailing in Italy">Sailing in Italy</option>
                  <option value="Sailing in Central Europe">Sailing in Central Europe</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Ship Image URL</label>
                <input name="imageUrl" type="text" placeholder="/images/fleet-new.png" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Description</label>
                <textarea name="description" required placeholder="Provide boutique ship descriptions..." className={styles.textarea}></textarea>
              </div>
              <button type="submit" className={`btn-primary ${styles.submitBtn}`}>Save Ship to Fleet</button>
            </form>
          </div>
        </div>
      </div>

      {/* Database lists */}
      <section className={styles.listSection}>
        <div className="container">
          <div className={styles.listGrid}>
            {/* Courses List */}
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Active Courses ({courses.length})
              </h3>
              {courses.map(course => (
                <div key={course.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{course.title}</span>
                    <span className={styles.itemMeta}>{course.category} • {course.duration}</span>
                  </div>
                  <form action={deleteCourse}>
                    <input type="hidden" name="id" value={course.id} />
                    <button type="submit" className={styles.deleteBtn}>Delete</button>
                  </form>
                </div>
              ))}
            </div>

            {/* Fleet List */}
            <div>
              <h3 style={{ color: '#ffffff', marginBottom: '24px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Active Fleet Ships ({fleet.length})
              </h3>
              {fleet.map(ship => (
                <div key={ship.id} className={styles.listItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{ship.name}</span>
                    <span className={styles.itemMeta}>{ship.category}</span>
                  </div>
                  <form action={deleteShip}>
                    <input type="hidden" name="id" value={ship.id} />
                    <button type="submit" className={styles.deleteBtn}>Delete</button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
