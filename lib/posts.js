import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  console.log('getSortedPostsData: Starting...');
  
  // Create posts directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    console.log('getSortedPostsData: Posts directory does not exist, creating...');
    fs.mkdirSync(postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  console.log('getSortedPostsData: Found files:', fileNames);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      console.log('getSortedPostsData: Processing file:', fileName);
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      // Calculate reading time
      const stats = readingTime(content);
      
      return {
        slug,
        readingTime: stats.text,
        ...data,
        date: data.date instanceof Date ? data.date.toISOString() : data.date,
        excerpt: data.excerpt || extractExcerpt(content),
        categories: Array.isArray(data.categories) ? data.categories : []
      };
    });

  return allPostsData.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
}

export async function getPostData(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data, content } = matter(fileContents);
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();
  
  // Calculate reading time
  const stats = readingTime(content);

  return {
    slug,
    contentHtml,
    readingTime: stats.text,
    ...data,
    date: data.date instanceof Date ? data.date.toISOString() : data.date,
    categories: Array.isArray(data.categories) ? data.categories : []
  };
}

export function getAllPostSlugs() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, '')
        }
      };
    });
}

export function getPostsByCategory(category) {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => 
    post.categories && post.categories.includes(category)
  );
}

export function getAllCategories() {
  const allPosts = getSortedPostsData();
  const categories = new Set();
  
  allPosts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(cat => categories.add(cat));
    }
  });
  
  return Array.from(categories).sort();
}

function extractExcerpt(content, length = 200) {
  // Remove code blocks
  const stripped = content.replace(/```[\s\S]*?```/g, '');
  // Remove markdown syntax
  const plainText = stripped
    .replace(/#{1,6}\s/g, '') // headers
    .replace(/\*\*|__/g, '') // bold
    .replace(/\*|_/g, '') // italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // images
    .replace(/`/g, '') // inline code
    .replace(/>/g, '') // blockquotes
    .trim();
  
  const lines = plainText.split('\n').filter(line => line.trim() !== '');
  const excerpt = lines[0] || '';
  
  return excerpt.length > length 
    ? excerpt.substring(0, length).trim() + '...' 
    : excerpt;
}