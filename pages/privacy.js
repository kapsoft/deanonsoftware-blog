import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy - deanonsoftware</title>
        <meta name="description" content="Privacy policy and cookie information for deanonsoftware blog" />
      </Head>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <h2>Cookie Policy</h2>
          <p>
            This website uses cookies to enhance your browsing experience. Cookies are small text files 
            that are stored on your device when you visit our website.
          </p>
          
          <h3>Types of Cookies We Use</h3>
          <ul>
            <li>
              <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. 
              They enable basic functions like page navigation and access to secure areas of the website.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> We may use analytics cookies to understand how visitors interact 
              with our website, helping us improve our content and user experience.
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies remember your choices and preferences, 
              such as your cookie consent status.
            </li>
          </ul>
          
          <h3>Managing Cookies</h3>
          <p>
            You can control and manage cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul>
            <li>View what cookies are stored on your device</li>
            <li>Delete cookies from your device</li>
            <li>Block cookies from being set</li>
            <li>Set preferences for different types of cookies</li>
          </ul>
          
          <h2>Information We Collect</h2>
          <p>
            We collect information that you provide directly to us, such as when you:
          </p>
          <ul>
            <li>Subscribe to our RSS feed</li>
            <li>Contact us via email</li>
            <li>Interact with our content</li>
          </ul>
          
          <h2>How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul>
            <li>Provide and maintain our blog services</li>
            <li>Improve our content and user experience</li>
            <li>Respond to your inquiries and feedback</li>
            <li>Analyze website usage and trends</li>
          </ul>
          
          <h2>Third-Party Services</h2>
          <p>
            Our website may use third-party services that collect information, including:
          </p>
          <ul>
            <li><strong>Vercel:</strong> Our hosting provider may collect analytics data</li>
            <li><strong>Social Media:</strong> When you share content on social platforms</li>
          </ul>
          
          <h2>Your Rights</h2>
          <p>
            You have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your personal information</li>
            <li>Withdraw consent for cookie usage</li>
          </ul>
          
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our cookie practices, 
            please contact us at{' '}
            <a href="mailto:kaplan@kapsoft.com" className="text-blue-600 hover:underline">
              kaplan@kapsoft.com
            </a>
          </p>
          
          <div className="mt-12 pt-8 border-t">
            <Link href="/" className="text-blue-600 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 