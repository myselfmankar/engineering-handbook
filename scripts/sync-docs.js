const fs = require('fs');
const path = require('path');

/**
 *  Documizer Folder Scanner
 * 
 * This script scans the /docs directory to build a dynamic categories.json
 * file for the homepage. It ensures your site is truly dynamic based only
 * on the filesystem structure.
 */

const docsDir = path.join(__dirname, '..', 'docs');
const outputDir = path.join(__dirname, '..', 'src', 'data');
const outputFile = path.join(outputDir, 'categories.json');

// Folders to ignore
const IGNORE_FOLDERS = ['handbook'];

function sync() {
  console.log('  Scanning /docs for dynamic categories...');

  if (!fs.existsSync(docsDir)) {
    console.warn(' Docs directory missing.');
    return;
  }

  const items = fs.readdirSync(docsDir)
    .filter(item => {
      const fullPath = path.join(docsDir, item);
      return fs.lstatSync(fullPath).isDirectory() && !IGNORE_FOLDERS.includes(item);
    })
    .map(folder => {
      const configPath = path.join(docsDir, folder, '_category_.json');
      let config = {};

      if (fs.existsSync(configPath)) {
        try {
          config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e) {
          console.warn(`⚠️ Error parsing _category_.json in ${folder}`);
        }
      }

      // Format folder name to Title Case if label is missing
      const defaultLabel = folder
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        id: folder,
        title: config.label || defaultLabel,
        emoji: config.customProps?.emoji || '📁',
        desc: config.customProps?.description || 'Exploring engineering insights in this category.',
        position: config.position || 99,
        href: `/docs/${folder}/${fs.readdirSync(path.join(docsDir, folder))[0].replace('.md', '')}`
      };
    })
    .sort((a, b) => a.position - b.position);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(items, null, 2));
  // console.log(`✅ Dynamically generated ${items.length} categories in src/data/categories.json`);
}

sync();
