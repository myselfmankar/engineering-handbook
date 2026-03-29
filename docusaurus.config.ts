import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Vaishnav's Engineering Handbook",
  tagline: 'A personal knowledge base for DSA, System Design, and Projects.',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://myselfmankar.github.io',
  baseUrl: '/engineering-handbook/',

  organizationName: 'myselfmankar',
  projectName: 'engineering-handbook',

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/myselfmankar/engineering-handbook/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Engineering Handbook',
      logo: {
        alt: 'Handbook Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'defaultSidebar',
          position: 'left',
          label: '📖 Docs',
        },
        {
          href: 'https://github.com/myselfmankar/engineering-handbook',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.linkedin.com/in/vaishnav-mankar',
          label: 'LinkedIn',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Connect',
          items: [
            { label: 'GitHub', href: 'https://github.com/myselfmankar/engineering-handbook' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vaishnav-mankar' },
          ],
        },
      ],
      copyright: `Built by Vaishnav Mankar • ${new Date().getFullYear()} • Powered by Docusaurus`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'yaml', 'python', 'java', 'cpp'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
