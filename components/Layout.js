import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, onSearch }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={onSearch} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}