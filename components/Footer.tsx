'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Instagram, Twitter, Facebook, Youtube, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#0f172a] py-12 px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4 text-center md:text-left">
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 text-2xl font-bold tracking-tighter text-white">
            <div className="bg-purple-600 p-1.5 rounded-lg">
              <Play className="fill-white" size={20} />
            </div>
            CHILL
          </Link>
          <p className="text-gray-500 text-sm">
            © 2024 Chill. All Rights Reserved.
          </p>
        </div>

        <div className="flex gap-8 md:gap-12">
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">Genre</h4>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>Aksi</li>
              <li>Drama</li>
              <li>Komedi</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">Bantuan</h4>
            <ul className="text-gray-400 text-xs space-y-1">
              <li>FAQ</li>
              <li>Kontak</li>
              <li>Privasi</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
