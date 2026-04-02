'use client';

import React, { useEffect, useState, use } from 'react';
import Navbar from '@/components/Navbar';
import { getMovieById } from '@/lib/api';
import { Star, Play, Info, ChevronLeft, ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const MovieDetailPage: React.FC<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = use(params);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieById(parseInt(id));
      setMovie(data);
      if (data) setImgSrc(data.image);
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-4xl font-bold mb-4">Film Tidak Ditemukan</h1>
        <Link href="/" className="text-purple-400 hover:underline flex items-center gap-2">
          <ChevronLeft size={20} /> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[70vh] bg-black overflow-hidden">
        {movie.trailerId ? (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&mute=1&loop=1&playlist=${movie.trailerId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full object-cover opacity-60"
          ></iframe>
        ) : (
          <div className="w-full h-full relative">
            <Image
              src={imgSrc}
              alt={movie.title}
              fill
              className="object-cover opacity-40 blur-sm"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-20 xl:p-28 space-y-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm font-medium">
              <ChevronLeft size={16} /> Kembali
            </Link>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight text-white/90 mb-4 leading-tight">
              {movie.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm md:text-base mb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                <Star size={18} fill="currentColor" />
                <span className="font-bold text-white">{movie.rating}/5</span>
              </div>
              <span className="text-gray-500">|</span>
              <span className="font-medium">{movie.year}</span>
              <span className="text-gray-500">|</span>
              <span className="px-2 py-0.5 bg-purple-600/20 text-purple-400 rounded text-xs font-bold uppercase">
                {movie.category}
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 md:px-8 py-3 bg-white/90 text-black/90 rounded-xl font-bold hover:bg-white active:scale-95"
              >
                <Play size={20} fill="black" /> Mulai Sekarang
              </button>

              <button className="flex items-center gap-2 px-6 md:px-8 py-3 glass text-white rounded-xl font-bold hover:bg-white/20 active:scale-95">
                <Info size={20} /> Tambah Daftar
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1920px] mx-auto px-6 md:px-12 lg:px-20 xl:px-28 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-purple-600 pl-4 text-white/80">
              Deskripsi
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed">
              {movie.fullDescription || movie.description || "Tidak ada deskripsi tersedia untuk film ini."}
            </p>
          </section>

          {movie.imdbLink || movie.tomatoLink ? (
            <section>
              <h2 className="text-2xl font-bold mb-4 border-l-4 border-purple-600 pl-4 text-white/80">
                Rating & Link Eksternal
              </h2>
              <div className="flex flex-wrap gap-4">
                {movie.imdbLink && (
                  <a
                    href={movie.imdbLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-white hover:bg-white/20 text-sm font-medium"
                  >
                    IMDb <ExternalLink size={16} />
                  </a>
                )}

                {movie.tomatoLink && (
                  <a
                    href={movie.tomatoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 glass rounded-xl text-white hover:bg-white/20 text-sm font-medium"
                  >
                    Rotten Tomatoes <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </section>
          ) : null}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-l-4 border-purple-600 pl-4 text-white/80">
            Poster
          </h2>
          <div className="relative aspect-[2/3] max-w-sm md:max-w-full rounded-3xl overflow-hidden apple-shadow group">
            <Image
              src={imgSrc}
              alt={movie.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={() =>
                setImgSrc(`https://picsum.photos/seed/${movie.title.replace(/\s/g, '')}/500/750`)
              }
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 px-6 md:px-12 lg:px-20 xl:px-28 py-16 border-t border-white/10 flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-2xl font-bold tracking-tighter text-white">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <Play className="fill-white" size={20} />
            </div>
            CHILL
          </div>
          <p className="text-gray-400 text-sm">
            © 2023 Chill. All Rights Reserved.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
          <div className="space-y-4">
            <h4 className="text-white font-bold">Genre</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>Aksi</li>
              <li>Drama</li>
              <li>Komedi</li>
              <li>Sains & Alam</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-white font-bold">Bantuan</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>FAQ</li>
              <li>Kontak Kami</li>
              <li>Privasi</li>
              <li>Syarat & Ketentuan</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modal Trailer */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl"
          >
            <motion.div className="w-full max-w-5xl flex flex-col gap-4">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-white text-xl md:text-3xl font-bold">
                  {movie.title}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 text-white rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.trailerId}?autoplay=1`}
                  title={movie.title}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default MovieDetailPage;