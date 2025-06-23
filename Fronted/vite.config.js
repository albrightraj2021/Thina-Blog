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
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Thina Blog',
          description: 'Explore insightful articles on technology, lifestyle, startups, and more at Thina Blog.',
          keywords: 'technology, lifestyle, startups, blog',
          ogTitle: 'Thina Blog',
          ogDescription: 'Explore insightful articles on technology, lifestyle, startups, and more at Thina Blog.',
          ogImage: 'https://ik.imagekit.io/thinablog/blog/Description.png',
          twitterCard: 'summary_large_image',
          twitterTitle: 'Thina Blog',
          twitterDescription: 'Explore insightful articles on technology, lifestyle, startups, and more at Thina Blog.',
          twitterImage: 'https://ik.imagekit.io/thinablog/blog/Description.png',
        },
      },
    }),
  ],
});
