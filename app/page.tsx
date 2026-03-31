'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import { getMovies } from '@/lib/api';

const LandingPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await getMovies();
      setMovies(data);
    };
    fetchMovies();
  }, []);

  if (movies.length === 0) return null;

  const heroMovies = movies.filter(m => 
    ['Duty After School', 'Squid Game', 'Money Heist', 'All of Us Are Dead'].includes(m.title)
  );

  return (
    <main className="min-h-screen bg-[#0f172a] pb-20">
      <Navbar />
      <Hero 
        movies={heroMovies.length > 0 ? heroMovies : [movies[0]]} 
      />
      
      <div className="relative mt-8 md:mt-12 z-10 space-y-6 md:space-y-10">
        <div id="series" className="scroll-mt-24">
          <MovieRow title="Series Populer" movies={movies.filter(m => m.category === 'Series').slice(0, 10)} />
        </div>
        
        <div id="film" className="scroll-mt-24">
          <MovieRow title="Film Terlaris" movies={movies.filter(m => m.category === 'Film').slice(0, 10)} />
        </div>

        <div id="rilis-baru" className="scroll-mt-24">
          <MovieRow title="Rilis Baru" movies={movies.filter(m => m.isNewEpisode).slice(0, 8)} />
        </div>

        <div id="daftar-saya" className="scroll-mt-24">
          <MovieRow title="Daftar Saya" movies={movies.slice(4, 12)} />
        </div>
        
        <MovieRow title="Trending Sekarang" movies={movies.slice(2, 10)} />
      </div>

      <Footer />
    </main>
  );
};

export default LandingPage;
