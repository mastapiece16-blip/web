// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Replace 'your-repository-name' with the actual name of your GitHub repository.
const repoName = 'BAYMAX'; // Example: if your repo is github.com/user/BAYMAX

export default defineConfig({
  plugins: [react()],
  // Crucial for GitHub Pages deployment to /<repository-name>/
  base: `/${repoName}/`,
});
