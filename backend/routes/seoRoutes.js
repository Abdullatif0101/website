const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Portfolio = require('../models/Portfolio');

// Generate XML Sitemap dynamically
router.get('/sitemap.xml', async (req, res) => {
    try {
        const baseUrl = 'https://nexoradigital.com';

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Static routes
        const staticRoutes = ['/', '/portfolio.html', '/blog.html', '/contact.html'];
        staticRoutes.forEach(route => {
            xml += `  <url>\n    <loc>${baseUrl}${route}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
        });

        // Dynamic Blog routes
        const blogs = await Blog.find({ status: 'published' }).select('slug updatedAt');
        blogs.forEach(blog => {
            xml += `  <url>\n    <loc>${baseUrl}/blog-post.html?slug=${blog.slug}</loc>\n    <lastmod>${blog.updatedAt.toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        // Dynamic Portfolio routes
        const portfolios = await Portfolio.find().select('slug updatedAt');
        portfolios.forEach(portfolio => {
            xml += `  <url>\n    <loc>${baseUrl}/portfolio-project.html?slug=${portfolio.slug}</loc>\n    <lastmod>${portfolio.updatedAt.toISOString()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
        });

        xml += `</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.status(200).send(xml);
    } catch (error) {
        res.status(500).send('Error generating sitemap');
    }
});

// Generate robots.txt
router.get('/robots.txt', (req, res) => {
    const robotsTxt = `User-agent: *\nAllow: /\nDisallow: /admin.html\nDisallow: /admin-login.html\n\nSitemap: https://nexoradigital.com/sitemap.xml`;
    res.header('Content-Type', 'text/plain');
    res.status(200).send(robotsTxt);
});

module.exports = router;
