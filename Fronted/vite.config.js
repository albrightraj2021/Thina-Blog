import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import pagesSitemap from 'vite-plugin-pages-sitemap';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    pagesSitemap({
      hostname: 'https://thina-blog.vercel.app',
      routes: [
        '/',
        '/blog',
      ],
    }),
  ],
});
