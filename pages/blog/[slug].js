import { getAllPostSlugs, getPostData } from '../../lib/posts';
import Layout from '../../components/Layout';
import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticPaths() {
  const paths = getAllPostSlugs();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.slug);
  return {
    props: {
      postData
    }
  };
}

export default function Post({ postData }) {
  const formattedDate = postData.date ? format(new Date(postData.date), 'MMMM d, yyyy') : 'Unknown date';
  
  return (
    <Layout>
      <Head>
        <title>{postData.title || 'Post'} - deanonsoftware</title>
        <meta name="description" content={postData.excerpt || ''} />
        <meta property="og:title" content={postData.title || ''} />
        <meta property="og:description" content={postData.excerpt || ''} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={postData.date} />
        <meta property="article:author" content={postData.author || 'Dean Kapland'} />
      </Head>

      <article className="max-w-3xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          <div className="flex items-center text-gray-600 space-x-4 text-sm">
            <time>{formattedDate}</time>
            {postData.author && <span>By {postData.author}</span>}
            <span>{postData.readingTime}</span>
          </div>
          {postData.categories && Array.isArray(postData.categories) && postData.categories.length > 0 && (
            <div className="mt-4">
              {postData.categories.map((cat, index) => (
                <span 
                  key={`${cat}-${index}`} 
                  className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}
        </header>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml }} 
        />
        
        <hr className="my-12 border-gray-200" />
        
        <div className="flex justify-between items-center mb-12">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Back to all posts
          </Link>
        </div>
        
        {/* Discussion Links */}
        <div className="mt-12 border-t pt-8">
          <h3 className="text-lg font-semibold mb-4">Discuss this post</h3>
          <div className="flex gap-4">
            <a 
              href={`https://twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL || 'https://kapsoft.com'}/blog/${postData.slug}&text=${encodeURIComponent(postData.title || 'Blog Post')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Discuss on Twitter
            </a>
            <a 
              href={`mailto:kaplan@kapsoft.com?subject=Re: ${encodeURIComponent(postData.title || 'Blog Post')}`}
              className="text-blue-500 hover:underline"
            >
              Email me
            </a>
          </div>
        </div>
      </article>
    </Layout>
  );
}