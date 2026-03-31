'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Info, Volume2, VolumeX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Movie = {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  trailerId?: string;
};

type HeroProps = {
  movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMute = localStorage.getItem('hero-video-muted');
    if (savedMute !== null) {
      setIsMuted(savedMute === 'true');
    }
  }, []);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem('hero-video-muted', String(newMuted));
  };

  const movie = movies[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
    setIsPreviewMode(false);
  }, [movies.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
    setIsPreviewMode(false);
  }, [movies.length]);

  useEffect(() => {
    if (isDragging) return;
    
    let previewTimeout: NodeJS.Timeout;
    let slideTimeout: NodeJS.Timeout;

    // Start preview after 7 seconds
    previewTimeout = setTimeout(() => {
      setIsPreviewMode(true);
      
      // Video plays from 4s to 21s (17s duration)
      slideTimeout = setTimeout(() => {
        nextSlide();
      }, 17000);
    }, 7000);

    return () => {
      clearTimeout(previewTimeout);
      clearTimeout(slideTimeout);
    };
  }, [currentIndex, nextSlide, isDragging]);

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const threshold = 100;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  if (!movie) return null;

  return (
    <div className="relative h-[70vh] sm:h-[80vh] md:h-[90vh] lg:h-[96vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {!isPreviewMode ? (
          <motion.div
            key={`image-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={movie.image}
              alt={movie.title}
              fill
              className="object-cover pointer-events-none select-none"
              priority
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ) : (
          <motion.div
            key={`video-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            className="absolute top-0 left-0 right-0 bottom-0 z-0 cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=0&loop=0&rel=0&start=4&end=30&modestbranding=1&iv_load_policy=3&disablekb=1`}
                title="Preview"
                frameBorder="0"
                className="w-full h-full scale-[1.35] translate-y-[4%] origin-center object-cover"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Premium Blur & Gradient Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 backdrop-blur-[4px] [mask-image:linear-gradient(to_top,black,transparent)]" />
      </div>
      
      <div className="absolute bottom-32 md:bottom-40 left-6 md:left-12 lg:left-20 xl:left-28 right-6 md:right-auto max-w-2xl space-y-6 md:space-y-8 z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 mb-4 md:mb-6 leading-tight drop-shadow-2xl">
              {movie.title}
            </h1>
            <p className="text-sm md:text-lg text-white/90 line-clamp-3 mb-8 md:mb-10 leading-relaxed max-w-xl drop-shadow-md">
              {movie.description}
            </p>
            
            <div className="flex flex-col items-start gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-48 md:w-56 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-2xl hover:bg-white/20 text-white border border-white/10 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm md:text-base active:scale-95"
              >
                <Play size={20} fill="white" className="md:w-6 md:h-6" />
                Mulai
              </button>
              <Link 
                href={`/movie/${movie.id}`}
                className="w-48 md:w-56 px-6 md:px-8 py-3 md:py-4 bg-white/10 backdrop-blur-2xl hover:bg-white/20 text-white border border-white/10 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm md:text-base active:scale-95"
              >
                <Info size={20} className="md:w-6 md:h-6" />
                Selengkapnya
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators - Placed in the empty space at the bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsPreviewMode(false);
            }}
            className={`w-2.5 h-2.5 transition-all duration-500 rounded-full ${
              index === currentIndex ? 'bg-white scale-110' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-10 md:bottom-20 right-6 md:right-12 lg:right-20 xl:right-28 z-20">
        <button 
          onClick={toggleMute}
          className="p-2.5 md:p-3 bg-white/10 backdrop-blur-2xl hover:bg-white/20 border border-white/10 rounded-full text-white transition-all"
        >
          {mounted ? (
            isMuted ? <VolumeX size={20} className="md:w-6 md:h-6" /> : <Volume2 size={20} className="md:w-6 md:h-6" />
          ) : (
            <Volume2 size={20} className="md:w-6 md:h-6" />
          )}
        </button>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl flex flex-col gap-6"
            >
              <div className="flex justify-between items-center px-2">
                <h2 className="text-white/90 text-xl md:text-3xl font-bold tracking-tight">
                  {movie.title}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/10 text-white rounded-full transition-all active:scale-90"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="relative w-full aspect-video bg-black rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${movie.trailerId}?autoplay=1&rel=0&modestbranding=1`}
                  title={movie.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Hero;
