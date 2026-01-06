#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync, rmSync } from 'fs';
import { execSync } from 'child_process';
import { createInterface } from 'readline';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function updateJsonFile(filePath, updates) {
  if (!existsSync(filePath)) {
    console.log(`  Skipping ${filePath} (not found)`);
    return;
  }
  const content = JSON.parse(readFileSync(filePath, 'utf-8'));
  Object.assign(content, updates);
  writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
  console.log(`  Updated ${filePath}`);
}

function updatePyprojectToml(filePath, projectName) {
  if (!existsSync(filePath)) {
    console.log(`  Skipping ${filePath} (not found)`);
    return;
  }
  let content = readFileSync(filePath, 'utf-8');
  content = content.replace(/^name = ".*"$/m, `name = "${projectName}-api"`);
  writeFileSync(filePath, content);
  console.log(`  Updated ${filePath}`);
}

function generateReadme(projectName, description) {
  const desc = description || 'A fullstack application with React frontend and Python FastAPI backend.';
  const templatePath = join(__dirname, 'README.template.md');
  let template = readFileSync(templatePath, 'utf-8');

  template = template.replace(/\{\{PROJECT_NAME\}\}/g, projectName);
  template = template.replace(/\{\{DESCRIPTION\}\}/g, desc);

  return template;
}

async function main() {
  console.log('\n🚀 Project Setup\n');

  // Get project name
  const currentName = 'claude-tanstack-python-starter';
  const folderName = process.cwd().split('/').pop();
  const suggestedName = folderName !== currentName ? folderName : 'my-project';

  const projectName = (await question(`Project name (${suggestedName}): `)).trim() || suggestedName;

  // Validate project name
  if (!/^[a-z0-9-]+$/.test(projectName)) {
    console.error('\n❌ Project name must be lowercase alphanumeric with hyphens only');
    process.exit(1);
  }

  // Get optional info
  const description = (await question('Description (optional): ')).trim();
  const author = (await question('Author (optional): ')).trim();

  // Confirm git reinitialization
  const hasGit = existsSync(join(ROOT_DIR, '.git'));
  let reinitGit = false;
  if (hasGit) {
    const answer = (await question('Reinitialize git history? (y/N): ')).trim().toLowerCase();
    reinitGit = answer === 'y' || answer === 'yes';
  }

  console.log('\n📝 Updating project files...\n');

  // Update root package.json
  const rootUpdates = { name: projectName };
  if (description) rootUpdates.description = description;
  if (author) rootUpdates.author = author;
  updateJsonFile(join(ROOT_DIR, 'package.json'), rootUpdates);

  // Update apps/web/package.json
  updateJsonFile(join(ROOT_DIR, 'apps/web/package.json'), {
    name: `${projectName}-web`,
    ...(description && { description: `${description} - Web Frontend` }),
  });

  // Update apps/api/package.json
  updateJsonFile(join(ROOT_DIR, 'apps/api/package.json'), {
    name: `${projectName}-api`,
    ...(description && { description: `${description} - API Backend` }),
  });

  // Update apps/api/pyproject.toml
  updatePyprojectToml(join(ROOT_DIR, 'apps/api/pyproject.toml'), projectName);

  // Update README.md
  const readmePath = join(ROOT_DIR, 'README.md');
  writeFileSync(readmePath, generateReadme(projectName, description));
  console.log(`  Updated ${readmePath}`);

  // Reinitialize git if requested
  if (reinitGit) {
    console.log('\n🔄 Reinitializing git...\n');
    rmSync(join(ROOT_DIR, '.git'), { recursive: true, force: true });
    execSync('git init', { cwd: ROOT_DIR, stdio: 'inherit' });
    execSync('git add .', { cwd: ROOT_DIR, stdio: 'inherit' });
    execSync(`git commit -m "Initial commit from template"`, { cwd: ROOT_DIR, stdio: 'inherit' });
  }

  // Remove setup script reference from package.json (optional cleanup)
  const removeSetup = (await question('\nRemove init-project script from package.json? (y/N): ')).trim().toLowerCase();
  if (removeSetup === 'y' || removeSetup === 'yes') {
    const pkgPath = join(ROOT_DIR, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    delete pkg.scripts['init-project'];
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
    console.log('  Removed init-project script from package.json');
  }

  console.log('\n✅ Setup complete!\n');
  console.log('Next steps:');
  console.log('  1. pnpm install');
  console.log('  2. cp apps/web/.env.example apps/web/.env');
  console.log('  3. cp apps/api/.env.example apps/api/.env');
  console.log('  4. pnpm dev\n');

  rl.close();
}

main().catch((err) => {
  console.error('Setup failed:', err);
  process.exit(1);
});
