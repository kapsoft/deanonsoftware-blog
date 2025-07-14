import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import BlogList from '../components/BlogList';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  try {
    console.log('getStaticProps: Starting to fetch posts...');
    const allPostsData = getSortedPostsData();
    console.log('getStaticProps: Got posts data:', allPostsData.length, 'posts');
    console.log('getStaticProps: First post:', allPostsData[0]);
    return {
      props: {
        allPostsData
      }
    };
  } catch (error) {
    console.error('getStaticProps ERROR:', error);
    return {
      props: {
        allPostsData: []
      }
    };
  }
}

export default function Home({ allPostsData }) {
  console.log('Home component: Received allPostsData:', allPostsData);
  
  const router = useRouter();
  const [filteredPosts, setFilteredPosts] = useState(allPostsData || []);
  const [isSearching, setIsSearching] = useState(false);
  
  // Pagination settings
  const postsPerPage = 10;
  const currentPage = parseInt(router.query.page) || 1;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  
  // Calculate which posts to show on current page
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  // Reset to page 1 when search results change
  useEffect(() => {
    if (isSearching && router.query.page && router.query.page !== '1') {
      router.push('/', undefined, { shallow: true });
    }
  }, [isSearching, router.query.page]);

  const handleSearch = async (query) => {
    console.log('handleSearch called with:', query);
    try {
      if (!query) {
        console.log('No query, resetting to allPostsData');
        setFilteredPosts(allPostsData || []);
        setIsSearching(false);
        return;
      }

      console.log('Starting search...');
      setIsSearching(true);
      
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      console.log('Search results:', data);
      setFilteredPosts(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setFilteredPosts([]);
    }
  };

  return (
    <Layout onSearch={handleSearch}>
      <Head>
        <title>Kapsoft</title>
        <meta name="description" content="Thoughts on software development and technology" />
        <meta property="og:title" content="Kapsoft" />
        <meta property="og:description" content="Thoughts on software development and technology" />
        <meta property="og:type" content="website" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <a href="https://kapsoft.com" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-blue-600 transition-colors">
              Kapsoft
            </a>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thoughts on software development and technology
          </p>
        </div>

        {isSearching && filteredPosts.length === 0 && (
          <p className="text-center text-gray-500 my-8">
            No results found. Try a different search term.
          </p>
        )}

        {!isSearching && (
          <div className="mb-6 text-center text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} posts
          </div>
        )}

        <BlogList posts={currentPosts} />
        
        {!isSearching && totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            basePath="/"
          />
        )}
        
        <div className="mt-12 text-center">
          <Link 
            href="/rss.xml" 
            className="text-orange-600 hover:text-orange-700 inline-flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
              <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
            </svg>
            Subscribe via RSS
          </Link>
        </div>
      </div>
    </Layout>
  );
}