import esbuild from 'esbuild';

async function start() {
  const ctx = await esbuild.context({
    entryPoints: ['src/main.tsx'],
    bundle: true,
    outdir: 'public/dist',
    format: 'esm',
    jsx: 'automatic',
    conditions: ['style', 'module', 'import', 'default'],
    loader: {
      '.tsx': 'tsx',
      '.ts': 'ts',
      '.js': 'jsx',
      '.jsx': 'jsx',
      '.css': 'css',
      '.png': 'file',
      '.jpg': 'file',
      '.svg': 'file'
    },
    define: {
      'process.env.NODE_ENV': '"development"',
      'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.REACT_APP_SUPABASE_URL || 'https://fgjiztduqgoblwfwzpab.supabase.co'),
      'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_1szoi4S1gK0toJPcWJBPeA__yQVfCQq')
    },
    sourcemap: true,
  });

  await ctx.watch();

  let servedirResult;
  try {
    servedirResult = await ctx.serve({ servedir: '.', port: 3000 });
  } catch (err) {
    servedirResult = await ctx.serve({ servedir: '.', port: 0 });
  }

  console.log(`React App is running cleanly at http://localhost:${servedirResult.port}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
