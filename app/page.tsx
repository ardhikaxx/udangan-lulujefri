"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAudio } from "./context/AudioContext";

export default function LandingPage() {
  const router = useRouter();
  const audioContext = useAudio();

  const handleOpen = () => {
    audioContext?.playMusic();
    router.push("/home");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center justify-center min-h-screen text-white p-4 text-center overflow-hidden"
    >
      {/* Background images */}
      <div className="absolute inset-0 z-0">
        <div className="hidden md:block w-full h-full bg-[url('/assets/bg-desktop.png')] bg-cover bg-center" />
        <div className="md:hidden w-full h-full bg-[url('/assets/bg-mobile.png')] bg-cover bg-center" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-serif mb-4">CELEBRATING OUR WEDDING</h1>
        <div className="mb-8 w-64">
          <Image 
            src="/assets/nama-cover.png" 
            alt="Lulu & Jefri" 
            width={400} 
            height={200} 
            className="w-full h-auto drop-shadow-md"
          />
        </div>
        <button 
          onClick={handleOpen}
          className="px-8 py-3 bg-white text-slate-900 rounded-full font-semibold hover:bg-slate-200 transition-colors shadow-lg"
        >
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}
