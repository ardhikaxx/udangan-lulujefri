"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAudio } from "./context/AudioContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";

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
        <h1 className="text-xl font-serif mb-4 tracking-widest uppercase">Celebrating Our Wedding</h1>
        <div className="mb-8 w-80 md:w-96">
          <Image 
            src="/assets/nama-cover.png" 
            alt="Lulu & Jefri" 
            width={600} 
            height={300} 
            className="w-full h-auto drop-shadow-md"
          />
        </div>
        <button 
          onClick={handleOpen}
          className="flex items-center gap-2 px-8 py-3 bg-white text-[#ce953a] border border-[#ce953a] rounded-full font-semibold font-serif hover:bg-slate-100 transition-all shadow-lg"
        >
          <FontAwesomeIcon icon={faEnvelopeOpenText} />
          Buka Undangan
        </button>
      </div>
    </motion.div>
  );
}
