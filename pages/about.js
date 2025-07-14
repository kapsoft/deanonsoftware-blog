import Head from 'next/head';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - Kapsoft</title>
        <meta name="description" content="About Dean Kapland and Kapsoft blog" />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About</h1>
        
        <div className="prose prose-lg">
          <p>
            Welcome to Kapsoft, a blog about software development, technology, 
            and the experiences of building software in the modern world.
          </p>
          
          <h2>About Me</h2>
          <p>
            I&apos;m Dean Kapland, a software developer with a passion for creating 
            efficient, scalable solutions. With years of experience in various 
            technologies including Laravel, AWS, and modern JavaScript frameworks, 
            I share my insights and experiences through this blog.
          </p>
          
          <h2>What You&apos;ll Find Here</h2>
          <ul>
            <li>Technical deep-dives into software development topics</li>
            <li>Thoughts on software architecture and best practices</li>
            <li>Reviews and opinions on development tools and services</li>
            <li>Lessons learned from real-world projects</li>
          </ul>
          
          <h2>Connect</h2>
          <p>
            Feel free to reach out via:
          </p>
          <ul>
            <li>Email: kaplan@kapsoft.com</li>
            <li>Twitter: @kapsoft</li>
            <li>GitHub: github.com/kapsoft</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}