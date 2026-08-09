// src/components/SEOHead.jsx

import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEOHead({
  title = "Rahul Kapgate — Full Stack Developer",
  description = "Full Stack Developer based in Bengaluru, India, building reliable web and mobile applications across frontend, backend, APIs, databases, and cloud infrastructure.",
  url = "https://rahulkapgate.in",
  image = "https://rahulkapgate.in/og-image.png",
  type = "website",
}) {
  return (
    <Helmet>
      {/* =====================================================
          PRIMARY SEO
      ====================================================== */}
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="author"
        content="Rahul Kapgate"
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        name="keywords"
        content="Rahul Kapgate, Full Stack Developer, Software Engineer, React Developer, Next.js Developer, Node.js Developer, React Native Developer, Bengaluru Developer"
      />

      {/* Canonical */}
      <link
        rel="canonical"
        href={url}
      />

      {/* =====================================================
          OPEN GRAPH
          Facebook / LinkedIn / Discord / WhatsApp
      ====================================================== */}
      <meta
        property="og:type"
        content={type}
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={url}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:image:alt"
        content="Rahul Kapgate — Full Stack Developer"
      />

      <meta
        property="og:site_name"
        content="Rahul Kapgate"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      {/* =====================================================
          TWITTER / X
      ====================================================== */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      <meta
        name="twitter:image:alt"
        content="Rahul Kapgate — Full Stack Developer"
      />

      <meta
        name="twitter:creator"
        content="@Rahul__Kapgate"
      />

      {/* =====================================================
          BROWSER / THEME
      ====================================================== */}
      <meta
        name="theme-color"
        content="#0a0a0a"
      />

      <meta
        name="color-scheme"
        content="dark"
      />

      {/* =====================================================
          FAVICONS
      ====================================================== */}
      <link
        rel="icon"
        type="image/svg+xml"
        href="/favicon.svg"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32.png"
      />

      <link
        rel="apple-touch-icon"
        href="/apple-touch-icon.png"
      />
    </Helmet>
  );
}