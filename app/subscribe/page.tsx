'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Check, Play, Zap, Shield, Star } from 'lucide-react';
import { motion } from 'framer-motion';

import Footer from '@/components/Footer';

type PlanProps = {
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  icon: React.ReactNode;
  color: string;
}

const PlanCard: React.FC<PlanProps> = ({ name, price, features, isPopular, icon, color }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className={`relative flex flex-col p-8 rounded-[2.5rem] glass-dark border ${isPopular ? 'border-purple-500 apple-shadow' : 'border-white/10'} transition-all`}
  >
    {isPopular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-600 text-white text-xs font-bold rounded-full uppercase tracking-widest">
        Paling Populer
      </div>
    )}
    
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-white mb-6`}>
      {icon}
    </div>
    
    <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
    <div className="flex items-baseline gap-1 mb-8">
      <span className="text-4xl font-black text-white">{price}</span>
      <span className="text-gray-400">/bulan</span>
    </div>
    
    <ul className="space-y-4 mb-10 flex-grow">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-3 text-gray-300 text-sm">
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
            <Check size={12} className="text-purple-400" />
          </div>
          {feature}
        </li>
      ))}
    </ul>
    
    <button className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 ${isPopular ? 'bg-purple-600 hover:bg-purple-700 text-white apple-shadow' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
      Pilih Paket
    </button>
  </motion.div>
);

const SubscribePage: React.FC = () => {
  const plans = [
    {
      name: 'Berdua',
      price: 'Rp 49.000',
      color: 'bg-blue-500/20 text-blue-400',
      icon: <Shield size={28} />,
      features: [
        'Kualitas 720p (HD)',
        'Tonton di 2 perangkat sekaligus',
        'Tanpa iklan',
        'Download film favorit',
        'Akses semua konten'
      ]
    },
    {
      name: 'Keluarga',
      price: 'Rp 79.000',
      isPopular: true,
      color: 'bg-purple-500/20 text-purple-400',
      icon: <Zap size={28} />,
      features: [
        'Kualitas 1080p (Full HD)',
        'Tonton di 4 perangkat sekaligus',
        'Tanpa iklan',
        'Download film favorit',
        'Akses semua konten',
        'Kualitas audio premium'
      ]
    },
    {
      name: 'Premium',
      price: 'Rp 119.000',
      color: 'bg-yellow-500/20 text-yellow-400',
      icon: <Star size={28} />,
      features: [
        'Kualitas 4K (Ultra HD) + HDR',
        'Tonton di 6 perangkat sekaligus',
        'Tanpa iklan',
        'Download film favorit',
        'Akses semua konten',
        'Dolby Atmos Audio'
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white/90 pb-32">
      <Navbar />
      
      <div className="pt-52 md:pt-64 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-24 space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tighter leading-tight text-white/90"
          >
            Pilih Paket Yang <span className="text-purple-500">Tepat Untukmu</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400/80 text-lg md:text-xl"
          >
            Nikmati ribuan film dan series original tanpa gangguan iklan dengan kualitas terbaik.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
      
      <Footer />
    </main>
  );
};

export default SubscribePage;
