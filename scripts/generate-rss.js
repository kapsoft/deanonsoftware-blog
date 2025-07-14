const { Feed } = require('feed');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), 'posts');
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deanonsoftware.com';

function generateRssFeed() {
  console.log('Generating RSS feed...');
  
  const feed = new Feed({
    title: 'Kapsoft',
    description: 'Thoughts on software development and technology',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Dean Kapland`,
    author: {
      name: 'Dean Kapland',
      email: 'kaplan@kapsoft.com',
      link: `${siteUrl}/about`
    },
    feedLinks: {
      rss: `${siteUrl}/rss.xml`,
      json: `${siteUrl}/feed.json`,
      atom: `${siteUrl}/atom.xml`
    }
  });

  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory);
    console.log('Created posts directory');
    return;
  }

  // Get all posts
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter(fn => fn.endsWith('.md'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Extract excerpt if not provided
      let excerpt = data.excerpt;
      if (!excerpt) {
        const stripped = content.replace(/```[\s\S]*?```/g, '');
        const plainText = stripped
          .replace(/#{1,6}\s/g, '')
          .replace(/\*\*|__/g, '')
          .replace(/\*|_/g, '')
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
          .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
          .replace(/`/g, '')
          .replace(/>/g, '')
          .trim();
        
        const lines = plainText.split('\n').filter(line => line.trim() !== '');
        excerpt = lines[0] || '';
        if (excerpt.length > 200) {
          excerpt = excerpt.substring(0, 200).trim() + '...';
        }
      }
      
      return {
        ...data,
        excerpt,
        slug: fileName.replace(/\.md$/, '')
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Add posts to feed
  posts.forEach(post => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/blog/${post.slug}`,
      link: `${siteUrl}/blog/${post.slug}`,
      description: post.excerpt,
      content: post.excerpt, // You could include full content here if desired
      author: [{
        name: post.author || 'Dean Kapland',
        email: 'kaplan@kapsoft.com'
      }],
      date: new Date(post.date),
      category: post.categories ? post.categories.map(cat => ({ name: cat })) : []
    });
  });

  // Create public directory if it doesn't exist
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  // Write the RSS feed
  fs.writeFileSync(
    path.join(publicDir, 'rss.xml'),
    feed.rss2()
  );

  // Also generate Atom and JSON feeds
  fs.writeFileSync(
    path.join(publicDir, 'atom.xml'),
    feed.atom1()
  );

  fs.writeFileSync(
    path.join(publicDir, 'feed.json'),
    feed.json1()
  );
  
  console.log('RSS feed generated successfully!');
  console.log(`- RSS: ${siteUrl}/rss.xml`);
  console.log(`- Atom: ${siteUrl}/atom.xml`);
  console.log(`- JSON: ${siteUrl}/feed.json`);
}

// Run the generator
generateRssFeed();