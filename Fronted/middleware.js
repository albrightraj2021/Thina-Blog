export const config = { matcher: ['/blog/:id*'] };

export default async function middleware(req) {
  const ua = req.headers.get('user-agent') || '';
  const isBot = /facebookexternalhit|Twitterbot|LinkedInBot/i.test(ua);
  if (!isBot) return;

  // Extract blog ID from URL
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();

  // Fetch blog data from your API
  const apiRes = await fetch(`${url.origin}/api/blog/${id}`);
  if (!apiRes.ok) return;

  const { blog } = await apiRes.json();
  if (!blog) return;

  // Prepare meta tags
  const meta = `
    <meta property="og:title" content="${blog.title}" />
    <meta property="og:description" content="${blog.description.replace(/<[^>]+>/g, '').slice(0, 100)}" />
    <meta property="og:image" content="${blog.image}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${url.origin}/blog/${id}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${blog.title}" />
    <meta name="twitter:description" content="${blog.description.replace(/<[^>]+>/g, '').slice(0, 100)}" />
    <meta name="twitter:image" content="${blog.image}" />
  `;

  // Fetch the HTML and inject meta tags
  let html = await fetch(req.url).then(r => r.text());
  html = html.replace('</head>', meta + '</head>');
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}