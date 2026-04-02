"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuthStore } from "@/store/store";
import { Play, Eye, EyeOff } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [showPassword, setShowPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username wajib diisi"),
      password: Yup.string()
        .min(6, "Minimal 6 karakter")
        .required("Kata sandi wajib diisi"),
    }),
    onSubmit: (values) => {
      setUser({ username: values.username });
      router.push("/");
    },
  });

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] md:w-[40%] md:h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-dark p-6 sm:p-8 md:p-12 rounded-3xl md:rounded-[3rem] apple-shadow space-y-6 md:space-y-8 z-10"
      >
        {/* Logo */}
        <div className="text-center space-y-4 pb-2">
          <Link href="/" className="inline-flex items-center gap-3 text-3xl md:text-4xl font-black tracking-tighter text-white/90 mb-2 transition-transform hover:scale-105">
            <div className="bg-purple-600 p-2 rounded-xl shadow-lg shadow-purple-600/20">
              <Play className="fill-white" size={28} />
            </div>
            CHILL
          </Link>

          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white/90 tracking-tight">Daftar</h2>
            <p className="text-gray-400/70 text-sm">Selamat datang kembali di Chill</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Masukkan username"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50 placeholder:text-gray-600"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan kata sandi"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-purple-600/50 placeholder:text-gray-600"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right text-xs text-gray-400 -mt-2">
            <Link href="/forgot-password" className="hover:text-white">
              Lupa kata sandi?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-2xl transition active:scale-[0.98]"
          >
            Masuk
          </button>

          {/* Register */}
          <div className="text-center text-xs text-gray-400">
            Belum punya akun?{" "}
            <Link href="/register" className="text-white font-semibold hover:underline">
              Daftar
            </Link>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0f172a] px-3 text-gray-500">Atau</span>
            </div>
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full py-3 glass hover:bg-white/10 text-white font-semibold rounded-2xl transition flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              width={20}
              height={20}
              alt="Google"
            />
            Masuk dengan Google
          </button>
        </form>
      </motion.div>
    </div>
  );
}