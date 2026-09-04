#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const templateDir = path.join(__dirname, '..', 'templates', 'default');

const targetArg = process.argv[2];
const targetDir = path.resolve(process.cwd(), targetArg ?? '.');
const defaultName = path.basename(targetDir);

function ask(question, fallback) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${question} (${fallback}) `, (answer) => {
      rl.close();
      resolve(answer.trim() || fallback);
    });
  });
}

function copyRecursive(src, dest, projectName) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry), projectName);
    }
    return;
  }

  const base = path.basename(dest);
  let destPath = dest;
  if (base === '_gitignore') destPath = path.join(path.dirname(dest), '.gitignore');
  if (base === 'package.json.template') destPath = path.join(path.dirname(dest), 'package.json');
  if (base === '.gitkeep') return; // placeholder only, drop it

  let content = fs.readFileSync(src, 'utf8');
  if (base === 'package.json.template') {
    content = content.replace('__PROJECT_NAME__', projectName);
  }
  fs.writeFileSync(destPath, content);
}

async function main() {
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.error(`✖ Target directory "${targetDir}" already exists and is not empty.`);
    process.exit(1);
  }

  const projectName = await ask('Project name?', defaultName);

  copyRecursive(templateDir, targetDir, projectName);

  // Recreate empty dirs even if their .gitkeep placeholder was dropped.
  fs.mkdirSync(path.join(targetDir, 'features'), { recursive: true });

  console.log(`\n✔ Created "${projectName}" in ${targetDir}\n`);
  console.log('Next steps:');
  if (targetArg) console.log(`  cd ${targetArg}`);
  console.log('  npm install');
  console.log('  npx playwright install');
  console.log('  npm test');
}

main();