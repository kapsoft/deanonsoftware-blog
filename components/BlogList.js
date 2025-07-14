import Link from 'next/link';
import { format } from 'date-fns';

export default function BlogList({ posts }) {
  console.log('BlogList: Received posts:', posts);
  
  if (!posts || posts.length === 0) {
    console.log('BlogList: No posts to display');
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {posts.map((post, index) => {
        console.log(`BlogList: Processing post ${index}:`, post);
        const { slug, date, title, excerpt, categories, readingTime } = post;
        
        if (!slug) {
          console.error('BlogList: Post missing slug:', post);
          return null;
        }
        
        return (
          <article key={slug} className="border-b border-gray-200 pb-8 last:border-0">
            <div className="flex items-baseline justify-between mb-2">
              <time className="text-sm text-gray-600">
                {date ? format(new Date(date), 'MMMM d, yyyy') : 'Unknown date'}
              </time>
              {readingTime && (
                <span className="text-sm text-gray-500">{readingTime}</span>
              )}
            </div>
            <h2 className="text-2xl font-bold mt-2 mb-3">
              <Link 
                href={`/blog/${slug}`} 
                className="text-gray-900 hover:text-blue-600 transition-colors"
              >
                {title}
              </Link>
            </h2>
            {categories && Array.isArray(categories) && categories.length > 0 && (
              <div className="mb-3">
                {categories.map((cat, index) => (
                  <span 
                    key={`${cat}-${index}`} 
                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mr-2"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-700 mb-3 leading-relaxed">{excerpt}</p>
            <Link 
              href={`/blog/${slug}`} 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </Link>
          </article>
        );
      })}
    </div>
  );
}