import { searchPosts } from '../../lib/search';

export default function handler(req, res) {
  const { q } = req.query;
  
  if (!q || q.length < 2) {
    return res.status(400).json({ 
      error: 'Query must be at least 2 characters' 
    });
  }
  
  try {
    const results = searchPosts(q);
    res.status(200).json({ results });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ 
      error: 'An error occurred while searching' 
    });
  }
}