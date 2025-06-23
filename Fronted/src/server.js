import express from 'express';
import fs from 'fs';
import path from 'path';
import { render } from './src/entry-server.jsx';

const isProd = process.env.NODE_ENV === 'production';
const app = express();

app.use(express.static('dist/client'));

app.get('/blog/:id', async (req, res) => {
  // Fetch blog data from your API
  const blogRes = await fetch(`https://thina-blog-server.vercel.app/api/blog/${req.params.id}`);
  const { blog } = await blogRes.json();

  // Read HTML template
  const template = fs.readFileSync(
    path.resolve(__dirname, 'dist/client/index.html'),
    'utf-8'
  );

  // Render React app to string
  const appHtml = render(req.url, blog);

  // Inject meta tags
  const meta = `
    <meta property="og:title" content="${blog.title}" />
    <meta property="og:description" content="${blog.description.replace(/<[^>]+>/g, '').slice(0, 100)}" />
    <meta property="og:image" content="${blog.image}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://your-domain.com/blog/${blog.id}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${blog.title}" />
    <meta name="twitter:description" content="${blog.description.replace(/<[^>]+>/g, '').slice(0, 100)}" />
    <meta name="twitter:image" content="${blog.image}" />
  `;

  // Inject meta and app HTML into template
  const html = template
    .replace('<!--app-head-->', meta)
    .replace('<!--app-html-->', appHtml);

  res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
});

app.listen(5173, () => {
  console.log('Server running at http://localhost:5173');
});