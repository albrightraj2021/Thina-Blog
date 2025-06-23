import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet-async';
const Home = () => {
  return (
    <div>
      <Helmet>
      <title>Thina Blog</title>
      <link rel="icon" type="image/svg+xml" href="./src/assets/logoWoText.svg" />
      <meta name="description" content="Explore insightful articles on technology, lifestyle, startups, and more at Thina Blog." />
      {/* Open Graph / Facebook */}
      <meta property="og:title" content="Thina Blog" />
      <meta property="og:description" content="Explore insightful articles on technology, lifestyle, startups, and more at Thina Blog." />
      <meta property="og:image" content="https://ik.imagekit.io/thinablog/blog/logoWoText.png" />
      <meta property="og:url" content="https://thina-blog.vercel.app" />
      <meta property="og:type" content="website" />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Thina Blog" />
      <meta name="twitter:description" content="Explore insightful articles on technology, lifestyle, startups, and more at Thina Blog." />
      <meta name="twitter:image" content="https://ik.imagekit.io/thinablog/blog/logoWoText.png" />
      <meta name="twitter:url" content="https://thina-blog.vercel.app" />
    </Helmet>
      <Navbar />
      <Header />
      <BlogList />
      <Footer />
    </div>
  )
}

export default Home
