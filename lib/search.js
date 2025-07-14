import Fuse from 'fuse.js';
import { getSortedPostsData } from './posts';

let searchIndex = null;

export function getSearchIndex() {
  if (!searchIndex) {
    const posts = getSortedPostsData();
    
    // Prepare posts for search by including content
    const searchablePosts = posts.map(post => ({
      ...post,
      // For search purposes, we'll use the excerpt as content
      // In a real implementation, you might want to include the full content
      content: post.excerpt
    }));
    
    searchIndex = new Fuse(searchablePosts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'excerpt', weight: 0.3 },
        { name: 'categories', weight: 0.2 },
        { name: 'content', weight: 0.1 }
      ],
      threshold: 0.4,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: 2
    });
  }
  
  return searchIndex;
}

export function searchPosts(query) {
  const index = getSearchIndex();
  const results = index.search(query);
  
  return results.map(result => ({
    ...result.item,
    score: result.score
  }));
}