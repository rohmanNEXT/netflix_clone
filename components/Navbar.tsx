'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/store';
import { Play, LogOut, Search, X, Menu, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovies } from '@/lib/api';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Debounce search
  useEffect(() => {
    const term = searchTerm.trim();
    if (!term) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const delay = setTimeout(async () => {
      try {
        const allMovies = await getMovies();
        const filtered = allMovies.filter(movie =>
          movie.title.toLowerCase().includes(term.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 12)); // Fetch more to allow scrolling
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50
        transition-[background,backdrop-filter,box-shadow] duration-300 ease-out
        ${
          isScrolled
            ? 'bg-[#020617]/10 backdrop-blur-2xl shadow-lg border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        {/* WRAPPER */}
        <div
  className={`w-full flex items-center justify-between transition-all duration-300
  ${
    isScrolled
      ? 'px-6 md:px-12 lg:px-20 xl:px-28 py-3'
      : 'px-6 md:px-12 lg:px-20 xl:px-28 py-6 md:py-8'
  }`}
>
          {/* LEFT */}
          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-white">
              <div className="bg-purple-500/70 p-1 md:p-1.5 rounded-lg">
                <Play className="fill-white md:w-5 md:h-5" size={16} />
              </div>
              CHILL
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
              <button onClick={() => scrollToSection('series')} className="hover:text-white">Series</button>
              <button onClick={() => scrollToSection('film')} className="hover:text-white">Film</button>
              <button onClick={() => scrollToSection('daftar-saya')} className="hover:text-white">Daftar Saya</button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/subscribe"
              className="hidden sm:flex px-4 py-2 bg-purple-500/80 hover:bg-purple-600 text-white rounded-full text-xs md:text-sm font-bold"
            >
              Langganan
            </Link>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-300 hover:text-white"
            >
              <Search size={18} className="md:w-5 md:h-5" />
            </button>

            {user ? (
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-purple-500/80 flex items-center justify-center text-white font-bold text-[10px] md:text-xs">
                  {user.username[0].toUpperCase()}
                </div>
                <button onClick={logout} className="text-gray-300 hover:text-white">
                  <LogOut size={18} className="md:w-5 md:h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 md:gap-4">
                <Link href="/login" className="text-xs md:text-sm text-gray-300 hover:text-white">Masuk</Link>
                <Link
                  href="/register"
                  className="px-3 md:px-4 py-1.5 md:py-2 bg-white/10 backdrop-blur-2xl hover:bg-white/20 text-white rounded-full text-xs md:text-sm border border-white/10 transition-all"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* SEARCH MODAL */}
     <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-2xl"
              onClick={() => setIsSearchOpen(false)}
            />
            
            <motion.div
              ref={searchRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="relative w-full max-w-2xl glass-dark rounded-3xl overflow-hidden apple-shadow p-6"
            >
              <div className="flex items-center gap-4">
                <Search className="text-gray-400" size={24} />
                <input 
                  autoFocus
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (e.target.value.trim()) {
                      setIsSearching(true);
                    } else {
                      setIsSearching(false);
                      setSearchResults([]);
                    }
                  }}
                  placeholder="Cari film, series, atau genre..."
                  className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-gray-500"
                />
                {isSearching && (
                  <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                )}
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mt-8">
                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Hasil Pencarian</h4>
                    <div className="grid gap-2 max-h-[45vh] md:max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
                      {searchResults.map((movie) => (
                        <Link 
                          key={movie.id} 
                          href={`/movie/${movie.id}`}
                          onClick={() => setIsSearchOpen(false)}
                          className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-2xl transition-all group"
                        >
                          <div className="relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0">
                            <Image 
                              src={movie.image} 
                              alt={movie.title} 
                              fill 
                              className="object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="flex-grow">
                            <h5 className="text-white font-bold group-hover:text-purple-400 transition-colors">{movie.title}</h5>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                              <div className="flex items-center gap-1 text-yellow-400">
                                <Star size={12} fill="currentColor" />
                                <span>{movie.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{movie.year}</span>
                              <span>•</span>
                              <span className="text-purple-400">{movie.category}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : searchTerm.trim() ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">Tidak ada hasil ditemukan untuk &quot;{searchTerm}&quot;</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pencarian Populer</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Duty After School', 'Squid Game', 'Stranger Things', 'The Batman', 'Anime'].map((tag) => (
                        <button 
                          key={tag} 
                          onClick={() => {
                            setSearchTerm(tag);
                            setIsSearching(true);
                          }}
                          className="px-4 py-2 glass hover:bg-white/10 text-white text-sm rounded-xl transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;