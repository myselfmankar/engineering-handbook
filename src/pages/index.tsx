import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

//  Importing the dynamically generated categories
// This file is updated automatically by scripts/sync-docs.js every time the site starts!
import categories from '../data/categories.json';

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.badge}>💻 Developing in Public</div>
        <h1 className={styles.heroTitle}>
          The Engineering
          <span className={styles.heroTitleAccent}> Handbook</span>
        </h1>
        <p className={styles.heroSubtitle}>
          A minimalist personal knowledge base for DSA, System Design, and Project architecture — by{' '}
          <a
            href="https://www.linkedin.com/in/vaishnav-mankar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.authorLink}
          >
            Vaishnav Mankar
          </a>
          .
        </p>
        <div className={styles.heroCTA}>
          <Link className={styles.ctaPrimary} to="/docs/handbook">
            Explore Handbook →
          </Link>
          <a
            className={styles.ctaSecondary}
            href="https://github.com/myselfmankar/engineering-handbook"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sponsor / GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

function TopicCards() {
  return (
    <section className={styles.topics}>
      <div className={styles.topicsGrid}>
        {categories.map((t) => (
          <Link key={t.id} to={t.href} className={styles.card}>
            <span className={styles.cardEmoji}>{t.emoji}</span>
            <h3 className={styles.cardTitle}>{t.title}</h3>
            <p className={styles.cardDesc}>{t.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function Home(): React.JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        <Hero />
        <TopicCards />
      </main>
    </Layout>
  );
}
