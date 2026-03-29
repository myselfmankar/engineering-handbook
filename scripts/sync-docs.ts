import * as fs from 'fs';
import * as path from 'path';

/**
 * 🛠️ Documizer Folder Scanner (TypeScript Edition)
 * 
 * This script scans the /docs directory to build a dynamic categories.json
 * file for the homepage. Unifying the project to 100% TypeScript.
 */

interface CategoryConfig {
  label?: string;
  position?: number;
  customProps?: {
    emoji?: string;
    description?: string;
  };
}

interface CategoryItem {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  position: number;
  href: string;
}

const docsDir = path.join(__dirname, '..', 'docs');
const outputDir = path.join(__dirname, '..', 'src', 'data');
const outputFile = path.join(outputDir, 'categories.json');

const IGNORE_FOLDERS = ['handbook'];

function sync(): void {
  console.log('🏗️  Scanning /docs for dynamic categories (TS mode)...');

  if (!fs.existsSync(docsDir)) {
    console.warn('❌ Docs directory missing.');
    return;
  }

  const items: CategoryItem[] = fs.readdirSync(docsDir)
    .filter(item => {
      const fullPath = path.join(docsDir, item);
      return fs.lstatSync(fullPath).isDirectory() && !IGNORE_FOLDERS.includes(item);
    })
    .map(folder => {
      const configPath = path.join(docsDir, folder, '_category_.json');
      let config: CategoryConfig = {};

      if (fs.existsSync(configPath)) {
        try {
          config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e) {
          console.warn(`⚠️ Error parsing _category_.json in ${folder}`);
        }
      }

      const defaultLabel = folder
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const firstDoc = fs.readdirSync(path.join(docsDir, folder))
        .find(file => file.endsWith('.md') || file.endsWith('.mdx'));

      return {
        id: folder,
        title: config.label || defaultLabel,
        emoji: config.customProps?.emoji || '📁',
        desc: config.customProps?.description || 'Exploring engineering insights in this category.',
        position: config.position || 99,
        href: `/docs/${folder}/${firstDoc ? firstDoc.replace(/\.mdx?$/, '') : ''}`
      };
    })
    .sort((a, b) => a.position - b.position);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  console.log(`✅ Dynamically generated ${items.length} categories in src/data/categories.json`);
}

sync();
