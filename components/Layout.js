import Header from './Header';
import Footer from './Footer';
import CookieConsent from './CookieConsent';

export default function Layout({ children, onSearch }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}