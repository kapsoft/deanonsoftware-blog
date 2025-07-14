import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Header({ onSearch }) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-gray-700">
            dean_on_software
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">Blog</Link>
            <a href="https://kapsoft.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Kapsoft</a>
            <a href="https://mobilestencil.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Stencils</a>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          </div>
        </div>
        <div className="flex-1 md:max-w-xs">
          <SearchBar onSearch={onSearch} />
        </div>
        {/* Mobile nav */}
        <div className="flex md:hidden items-center gap-4 mt-2">
          <Link href="/" className="text-gray-600 hover:text-gray-900">Blog</Link>
          <a href="https://kapsoft.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Kapsoft</a>
          <a href="https://mobilestencil.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">Stencils</a>
          <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
        </div>
      </nav>
    </header>
  );
}