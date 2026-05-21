'use client';

import { useState } from 'react';
import styles from './course-detail.module.css';

export default function CoursePlayer({ course }) {
  const [currentChapter, setCurrentChapter] = useState(1);
  const [completedChapters, setCompletedChapters] = useState(new Set());
  const [studentName, setStudentName] = useState('Premium Crew Member');
  const [isEditingName, setIsEditingName] = useState(false);

  // Generate 3 elegant chapters from database content to simulate a full course
  const chapters = [
    {
      id: 1,
      title: 'Chapter 1: Standard Operational Overview',
      subtitle: 'Introduction to luxury hospitality standards',
      content: `Welcome to the Uniworld Academy professional course for: ${course.title}. In this initial chapter, we will explore the core foundation of our boutique service philosophy. 

      Uniworld is recognized globally for defining luxury river cruises. Our absolute motto is "No request is too large, no detail too small." To maintain our five-star standards, all crew members must familiarize themselves with the daily routine, safety protocols, and guest relations foundations before proceeding to specific department instructions.`
    },
    {
      id: 2,
      title: 'Chapter 2: Core Protocols & Meticulous Standards',
      subtitle: 'Department specifics and step-by-step procedures',
      content: course.content || 'No detailed content provided. Please contact the Head of Academy for full training manuals.'
    },
    {
      id: 3,
      title: 'Chapter 3: Final Examination & Certification Guidelines',
      subtitle: 'Review of acquired skills and academic completion',
      content: `Congratulations on reaching the final stage of the ${course.title} training module. 

      To successfully complete this course and unlock your digital certificate:
      1. Review the meticulous techniques discussed in Chapter 2.
      2. Verify that you understand the safety regulations, guest assistance requirements, and service quality benchmarks.
      3. Click the "Mark Course as Completed" button below to register your progress in the local database and render your professional certificate.`
    }
  ];

  const handleNext = () => {
    if (currentChapter < 3) {
      // Mark current chapter as completed
      const newCompleted = new Set(completedChapters);
      newCompleted.add(currentChapter);
      setCompletedChapters(newCompleted);
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  const handleCompleteChapter = (id) => {
    const newCompleted = new Set(completedChapters);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedChapters(newCompleted);
  };

  const handleCompleteAll = () => {
    const newCompleted = new Set([1, 2, 3]);
    setCompletedChapters(newCompleted);
    setCurrentChapter(3);
  };

  const isCourseFinished = completedChapters.has(1) && completedChapters.has(2) && completedChapters.has(3);

  // Calculate dynamic progress percentage
  const progressPercent = Math.round((completedChapters.size / 3) * 100);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className={styles.playerContainer}>
      {/* Dynamic Progress Panel */}
      <div className={`${styles.progressPanel} glass`}>
        <div className={styles.progressHeaderRow}>
          <div>
            <span className={styles.progressLabel}>Your Training Progress</span>
            <h4 className={styles.progressValue}>{progressPercent}% Completed</h4>
          </div>
          <span className={styles.chapterBadge}>
            Chapter {currentChapter} of 3
          </span>
        </div>
        <div className={styles.progressBarBg}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Map of chapters */}
        <div className={styles.chapterStepsRow}>
          {chapters.map((ch) => {
            const isChCompleted = completedChapters.has(ch.id);
            const isChActive = currentChapter === ch.id;
            return (
              <button 
                key={ch.id}
                className={`${styles.stepIndicator} ${isChActive ? styles.stepActive : ''} ${isChCompleted ? styles.stepCompleted : ''}`}
                onClick={() => setCurrentChapter(ch.id)}
              >
                <div className={styles.stepCircle}>
                  {isChCompleted ? (
                    <svg className={styles.checkIcon} viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  ) : ch.id}
                </div>
                <span className={styles.stepTitle}>{ch.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content grid */}
      <div className={styles.contentGrid}>
        {/* Left Side: Chapter Player */}
        <div className={`${styles.playerCard} glass`}>
          <div className={styles.playerHeader}>
            <span className={styles.subtitleSmall}>{chapters[currentChapter - 1].subtitle}</span>
            <h2 className={styles.chapterTitleText}>{chapters[currentChapter - 1].title}</h2>
          </div>

          <div className={styles.playerBody}>
            {/* Split paragraphs and render elegantly */}
            {chapters[currentChapter - 1].content.split('\n\n').map((para, idx) => (
              <p key={idx} className={styles.paragraph}>
                {para.trim()}
              </p>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className={styles.playerControls}>
            <button 
              className={`btn-secondary ${styles.navBtn}`} 
              onClick={handlePrev}
              disabled={currentChapter === 1}
            >
              <svg className={styles.controlIcon} viewBox="0 0 24 24" style={{ transform: 'rotate(180deg)' }}>
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
              </svg>
              Previous Chapter
            </button>

            <button 
              className={`${styles.completeCheckBtn} ${completedChapters.has(currentChapter) ? styles.completeCheckActive : ''}`}
              onClick={() => handleCompleteChapter(currentChapter)}
            >
              <div className={styles.checkboxCircle}>
                {completedChapters.has(currentChapter) && (
                  <svg className={styles.checkIcon} viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                )}
              </div>
              <span>{completedChapters.has(currentChapter) ? 'Chapter Completed' : 'Mark as Completed'}</span>
            </button>

            {currentChapter < 3 ? (
              <button className={`btn-primary ${styles.navBtn}`} onClick={handleNext}>
                Next Chapter
                <svg className={styles.controlIcon} viewBox="0 0 24 24">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                </svg>
              </button>
            ) : (
              <button 
                className={`btn-primary ${styles.navBtn} ${styles.finishPulse}`} 
                onClick={handleCompleteAll}
                disabled={isCourseFinished}
              >
                Finish Course
                <svg className={styles.controlIcon} viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3 0 1.09-.59 2.05-1.47 2.58l.47 2.42H10l.47-2.42C9.59 12.05 9 11.09 9 10c0-1.66 1.34-3 3-3z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Quick info / course summary */}
        <div className={styles.sidebarGrid}>
          <div className={`${styles.sidebarCard} glass`}>
            <h3 className={styles.sidebarTitle}>Course Details</h3>
            <ul className={styles.detailsList}>
              <li>
                <span className={styles.detailLabel}>Department</span>
                <span className={styles.detailValue}>{course.category || 'Hospitality'}</span>
              </li>
              <li>
                <span className={styles.detailLabel}>Author</span>
                <span className={styles.detailValue}>{course.author || 'Uniworld Academy'}</span>
              </li>
              <li>
                <span className={styles.detailLabel}>Duration</span>
                <span className={styles.detailValue}>{course.duration || '4 hours'}</span>
              </li>
              <li>
                <span className={styles.detailLabel}>Rating</span>
                <span className={styles.detailValue} style={{ color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ★ {course.rating || 5}.0 / 5.0
                </span>
              </li>
              <li>
                <span className={styles.detailLabel}>Fee</span>
                <span className={styles.detailValue} style={{ color: 'var(--success)', fontWeight: 'bold' }}>{course.price || 'Free'}</span>
              </li>
            </ul>
          </div>

          <div className={`${styles.sidebarCard} glass`} style={{ background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(26, 26, 32, 0.9) 100%)' }}>
            <h3 className={styles.sidebarTitle} style={{ color: 'var(--accent-light)' }}>Academic Certification</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '16px' }}>
              Upon successful completion of all three chapters, you will automatically unlock your Uniworld Academy Certificate of Completion. You can customize the name on your certificate below:
            </p>
            
            <div className={styles.nameCustomizer}>
              <label className={styles.detailLabel} style={{ marginBottom: '6px', display: 'block' }}>Crew Member Name</label>
              {isEditingName ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className={styles.nameInput}
                  />
                  <button className={styles.saveNameBtn} onClick={() => setIsEditingName(false)}>Save</button>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.03)', padding: '10px var(--border-radius-md)', borderRadius: 'var(--border-radius-sm)', border: 'var(--border-subtle)' }}>
                  <span style={{ fontWeight: '500', color: '#ffffff' }}>{studentName}</span>
                  <button style={{ color: 'var(--accent-light)', fontSize: '0.8rem', cursor: 'pointer' }} onClick={() => setIsEditingName(true)}>Edit</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Luxury Certificate - Renders conditionally when course is completed */}
      {isCourseFinished && (
        <div className={`${styles.certificateContainer} animate-slide`}>
          <div className={styles.goldGlowEffect}></div>
          <div className={styles.certificateOuterBorder}>
            <div className={styles.certificateInnerBorder}>
              
              {/* Header crest */}
              <div className={styles.certHeader}>
                <svg className={styles.certCrest} viewBox="0 0 100 100">
                  <path d="M50 15 L80 30 L80 65 L50 85 L20 65 L20 30 Z" fill="none" stroke="var(--gold)" strokeWidth="2" />
                  <path d="M50 20 L75 33 L75 62 L50 78 L25 62 L25 33 Z" fill="none" stroke="var(--gold)" strokeWidth="0.5" />
                  <text x="50" y="55" fill="var(--gold)" fontSize="18" textAnchor="middle" fontWeight="bold">U</text>
                  <circle cx="50" cy="50" r="32" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3,3" />
                </svg>
                <h5 className={styles.academyTitle}>UNIWORLD ACADEMY</h5>
                <span className={styles.boutiqueText}>BOUTIQUE RIVER CRUISES</span>
              </div>

              {/* Certificate content */}
              <div className={styles.certBody}>
                <h2 className={styles.certMainTitle}>Certificate of Completion</h2>
                <p className={styles.certLabel}>THIS IS PROUDLY PRESENTED TO</p>
                <h1 className={styles.studentNameText}>{studentName}</h1>
                
                <p className={styles.certParagraph}>
                  for successfully completing all advanced modules, standard operational procedures, and boutique hospitality standards for the professional curriculum:
                </p>
                
                <h3 className={styles.courseTitleText}>{course.title}</h3>
                
                <p className={styles.certDate}>
                  Granted on {new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Signatures */}
              <div className={styles.certFooter}>
                {/* Signature 1 */}
                <div className={styles.sigBlock}>
                  <div className={styles.signatureLine}>Toni M.</div>
                  <span className={styles.signerTitle}>Head of Academy</span>
                </div>

                {/* Golden Emblem */}
                <div className={styles.emblemContainer}>
                  <svg className={styles.goldEmblem} viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="rgba(245, 158, 11, 0.15)" stroke="var(--gold)" strokeWidth="3" />
                    <circle cx="50" cy="50" r="36" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="4,4" />
                    <path d="M50 25 L55 38 L68 38 L57 46 L61 59 L50 51 L39 59 L43 46 L32 38 L45 38 Z" fill="var(--gold)" />
                    <text x="50" y="80" fill="var(--gold)" fontSize="8" textAnchor="middle" letterSpacing="1" fontWeight="bold">OFFICIAL</text>
                  </svg>
                </div>

                {/* Signature 2 */}
                <div className={styles.sigBlock}>
                  <div className={styles.signatureLine}>Astrid Veldwijk</div>
                  <span className={styles.signerTitle}>Senior Director of Training</span>
                </div>
              </div>

            </div>
          </div>

          {/* Action Row */}
          <div className={styles.certActions}>
            <button className="btn-primary" onClick={handlePrint} style={{ display: 'inline-flex', gap: '8px' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
              </svg>
              Print / Save Certificate
            </button>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px' }}>
              * Tipăriți certificatul sau salvați-l ca PDF direct din fereastra browserului.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
