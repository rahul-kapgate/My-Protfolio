// src/components/SEOHead.jsx
//
// Uses react-helmet-async for managing <head> tags.
// Install: npm install react-helmet-async
//
// In your main App.jsx or index.jsx, wrap with:
//   import { HelmetProvider } from "react-helmet-async";
//   <HelmetProvider><App /></HelmetProvider>

import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEOHead({
  title = "Rahul Kapgate — Software Engineer",
  description = "Full-stack developer building modern web apps with React, Next.js, Node.js, FastAPI, and DevOps workflows. Based in Bengaluru, India.",
  url = "https://rahul-kapgate.netlify.app",
  image = "https://rahul-kapgate.netlify.app/og-image.png",
  type = "website",
}) {
  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Rahul Kapgate" />
      <meta
        name="keywords"
        content="Rahul Kapgate, software engineer, full stack developer, React, Next.js, Node.js, FastAPI, portfolio"
      />
      <link rel="canonical" href={url} />

      {/* Open Graph (Facebook, LinkedIn, Discord) */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Rahul Kapgate" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@Rahul__Kapgate" />

      {/* Theme */}
      <meta name="theme-color" content="#030014" />

      {/* Favicon (place files in /public) */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
}