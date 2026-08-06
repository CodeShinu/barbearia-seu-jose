import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const assetsDir = 'src/assets';
const publicAssetsDir = 'public/assets';

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const files = fs.readdirSync(assetsDir);
const mapping = {};

for (const file of files) {
  if (file.endsWith('.asset.json')) {
    const content = JSON.parse(fs.readFileSync(path.join(assetsDir, file), 'utf8'));
    const url = content.url;
    const originalFilename = content.original_filename;
    // To avoid collisions, we could use a hash or just the filename if unique
    const destName = `${path.basename(file, '.asset.json')}`;
    const destPath = path.join(publicAssetsDir, destName);
    
    console.log(`Downloading ${url} to ${destPath}...`);
    try {
      execSync(`curl -s -o "${destPath}" "http://localhost:8080${url}"`);
      mapping[file] = `/assets/${destName}`;
    } catch (e) {
      console.error(`Failed to download ${url}: ${e.message}`);
    }
  }
}

console.log('Finished downloading assets.');

// Now we need to update src/routes/index.tsx
let indexContent = fs.readFileSync('src/routes/index.tsx', 'utf8');

// Replace imports and usages
for (const [jsonFile, publicPath] of Object.entries(mapping)) {
  const variableNameMatch = indexContent.match(new RegExp(`import (\\w+) from "@\\/assets\\/${jsonFile.replace(/\./g, '\\.')}"`));
  if (variableNameMatch) {
    const variableName = variableNameMatch[1];
    console.log(`Updating ${variableName} to use ${publicPath}`);
    
    // Remove the import
    indexContent = indexContent.replace(new RegExp(`import ${variableName} from "@\\/assets\\/${jsonFile.replace(/\./g, '\\.')}";?\\n?`), '');
    
    // Replace variable.url with the string literal path
    // The code uses variable.url in many places
    indexContent = indexContent.split(`${variableName}.url`).join(`"${publicPath}"`);
    // Also check if it's used without .url (though unlikely based on previous view)
  }
}

fs.writeFileSync('src/routes/index.tsx', indexContent);
console.log('Updated src/routes/index.tsx');
