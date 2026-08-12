import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      if (childItemName === 'dist' || childItemName === '.aistudio') return;
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function build() {
  console.log('1. Checking TypeScript types...');
  try {
    execSync('node node_modules/typescript/bin/tsc --noEmit', { stdio: 'inherit' });
    console.log('✓ TypeScript check passed cleanly (0 errors).');
  } catch (err) {
    console.error('✗ TypeScript type check failed.');
    process.exit(1);
  }

  const outDir = path.resolve('dist');

  console.log('2. Cleaning output directory (dist)...');
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  console.log('3. Bundling React application with esbuild...');
  await esbuild.build({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    outdir: 'dist',
    format: 'esm',
    jsx: 'automatic',
    minify: true,
    sourcemap: false,
    conditions: ['style', 'module', 'import', 'default'],
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.css': 'css',
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'file',
    },
    define: {
      'process.env.NODE_ENV': '"production"',
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL || 'https://fgjiztduqgoblwfwzpab.supabase.co'),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_1szoi4S1gK0toJPcWJBPeA__yQVfCQq'),
      'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fgjiztduqgoblwfwzpab.supabase.co'),
      'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_1szoi4S1gK0toJPcWJBPeA__yQVfCQq'),
      'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://fgjiztduqgoblwfwzpab.supabase.co'),
      'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_1szoi4S1gK0toJPcWJBPeA__yQVfCQq'),
    },
  });

  console.log('4. Copying static assets and preparing index.html for Vercel...');
  
  // Recursively copy all static files from public/ into dist/
  if (fs.existsSync('public')) {
    const publicFiles = fs.readdirSync('public');
    for (const file of publicFiles) {
      if (file === 'dist') continue; // Don't copy nested dev dist
      copyRecursiveSync(path.join('public', file), path.join('dist', file));
    }
  }

  // Recursively copy root assets/ into dist/assets/
  if (fs.existsSync('assets')) {
    copyRecursiveSync('assets', path.join('dist', 'assets'));
  }

  // Copy root brand assets if present
  const rootAssets = ['logo.png', 'logo.jpg', 'favicon.png'];
  for (const asset of rootAssets) {
    if (fs.existsSync(asset) && !fs.existsSync(path.join('dist', asset))) {
      fs.copyFileSync(asset, path.join('dist', asset));
    }
  }

  // Process index.html for production static output
  if (fs.existsSync('index.html')) {
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    
    // Replace development /public/dist/ paths with production dist root relative paths
    indexHtml = indexHtml.replace(/\/public\/dist\/main\.css/g, './main.css');
    indexHtml = indexHtml.replace(/\/public\/dist\/main\.js/g, './main.js');

    fs.writeFileSync(path.join('dist', 'index.html'), indexHtml, 'utf8');
  }

  console.log('✓ Production build completed successfully in /dist directory!');
}

build().catch((err) => {
  console.error('Build error:', err);
  process.exit(1);
});
