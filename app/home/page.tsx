"use client";

import { useState, useSyncExternalStore, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRing,
  faCalendarAlt,
  faImages,
  faPlay,
  faPause,
  faHeart,
  faLeaf,
  faQuoteLeft,
  faGift,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import { useAudio } from "../context/AudioContext";
import { motion, AnimatePresence } from "framer-motion";

// Fungsi pembantu untuk mendeteksi client-side secara aman
function subscribe() {
  return () => { };
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [prevTab, setPrevTab] = useState("home");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioContext = useAudio();

  const tabOrder = ["home", "bride", "story", "info", "gallery", "gift"];
  const currentIndex = tabOrder.indexOf(activeTab);
  const prevIndex = tabOrder.indexOf(prevTab);
  const direction = currentIndex > prevIndex ? 1 : -1;

  const handleTabChange = (newTab: string) => {
    setPrevTab(activeTab);
    setActiveTab(newTab);
  };

  useEffect(() => {
    const weddingDate = new Date('2026-06-05T08:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const navItems = [
    { id: "home", icon: faHome, title: "Home" },
    { id: "bride", icon: faRing, title: "Bride" },
    { id: "story", icon: faHeart, title: "Story" },
    { id: "info", icon: faCalendarAlt, title: "Event" },
    { id: "gallery", icon: faImages, title: "Gallery" },
    { id: "gift", icon: faGift, title: "Gift" },
  ];

  const galleryImages = [
    "/assets/gallery/foto1.jpeg",
    "/assets/gallery/foto2.jpeg",
    "/assets/gallery/foto3.jpeg",
    "/assets/gallery/foto4.jpeg",
    "/assets/gallery/foto5.jpeg",
    "/assets/gallery/foto6.jpeg",
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#002B19]" />;

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      y: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.98
    })
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-4 pb-24 overflow-hidden">
            <div className="relative w-full max-w-[450px] fade-up-enter">
              <div className="animate-float">
                <Image
                  src="/assets/nama-cover.png"
                  alt="The Wedding of Lulu & Jefri"
                  width={500}
                  height={500}
                  className="w-full h-auto drop-shadow-wedding"
                  priority
                />
              </div>
            </div>

            <div className="mt-2 flex flex-col items-center gap-2 text-center fade-up-enter [animation-delay:600ms]">
              <p className="text-lg sm:text-xl font-serif text-[#ce953a] tracking-wide drop-shadow-md">
                Jum&apos;at, 05 Juni 2026
              </p>
              <div className="px-6 py-2 glass rounded-full animate-pulse border border-white/10">
                <p className="text-xs tracking-[0.4em] uppercase font-light text-amber-50">
                  Wedding Invitation
                </p>
              </div>
              <div className="mt-4 glass px-6 py-3 rounded-[30px] border border-white/10">
                <div className="flex gap-4 sm:gap-6 text-[#ce953a]">
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-serif font-bold">{countdown.days}</p>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase opacity-70">Hari</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-serif font-bold">{countdown.hours}</p>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase opacity-70">Jam</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-serif font-bold">{countdown.minutes}</p>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase opacity-70">Menit</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl sm:text-3xl font-serif font-bold">{countdown.seconds}</p>
                    <p className="text-[10px] sm:text-xs tracking-widest uppercase opacity-70">Detik</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      case "bride":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pb-24">
            <h2 className="mb-6 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic">Pasangan Pengantin</h2>
            <div className="glass p-4 sm:p-8 rounded-[50px] w-full max-w-lg space-y-8 sm:space-y-12">
              <div className="flex justify-center gap-8 mb-4">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 text-[#ce953a]">
                  <Image src="/assets/lulu.jpeg" alt="Lukmanul Khotimah" fill sizes="112px" className="object-cover" />
                </div>
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 text-[#ce953a]">
                  <Image src="/assets/fais.jpeg" alt="Moh. Fais Jefri Albukhori" fill sizes="112px" className="object-cover" />
                </div>

              </div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif italic text-[#ce953a]">Lukmanul Khotimah, S.Tr., Ak</h3>
                <p className="text-xs opacity-70 italic">Putri dari</p>
                <p className="text-base sm:text-lg font-medium tracking-wide">Bpk. Hafid & Ibu Rumyati</p>
              </div>
              <div className="text-3xl font-serif opacity-30 italic">dengan</div>
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif italic text-[#ce953a]">Moh. Fais Jefri Albukhori, S.Tr., Ak</h3>
                <p className="text-xs opacity-70 italic">Putra dari</p>
                <p className="text-base sm:text-lg font-medium tracking-wide">Alm. Bpk. Jaelani & Ibu Suti’ah</p>
              </div>
            </div>
          </section>
        );
      case "story":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pb-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-10 left-10 opacity-10 rotate-12 animate-float">
              <FontAwesomeIcon icon={faLeaf} className="text-6xl text-[#ce953a]" />
            </div>
            <div className="absolute bottom-40 right-10 opacity-10 -rotate-12 animate-float-delayed">
              <FontAwesomeIcon icon={faLeaf} className="text-6xl text-[#ce953a]" />
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic relative"
            >
              Cerita Kami
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#ce953a] to-transparent"></div>
            </motion.h2>

            <div className="relative group w-full max-w-lg">
              {/* Outer Decorative Border */}
              <div className="absolute -inset-2 border border-[#ce953a]/20 rounded-[58px] pointer-events-none group-hover:border-[#ce953a]/40 transition-colors duration-500"></div>

              <div className="glass p-8 sm:p-12 rounded-[50px] w-full space-y-8 relative overflow-hidden">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 p-4 opacity-20">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-[#ce953a] rotate-180" />
                </div>

                <div className="relative">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="relative w-16 h-16 mx-auto mb-8"
                  >
                    <div className="absolute inset-0 bg-[#ce953a]/20 blur-xl rounded-full animate-pulse"></div>
                    <div className="relative flex items-center justify-center w-full h-full border border-[#ce953a]/40 rounded-full bg-black/20">
                      <FontAwesomeIcon icon={faHeart} className="text-2xl text-[#ce953a] animate-beat" />
                    </div>
                  </motion.div>

                  <div className="space-y-6 relative z-10">
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm sm:text-lg leading-relaxed italic text-amber-50/90 font-light tracking-wide"
                    >
                      &quot;Dipertemukan dalam satu study yang sama. Dari rekan menjadi teman hidup.&quot;
                    </motion.p>

                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ delay: 0.8, duration: 1 }}
                      className="h-px bg-gradient-to-r from-transparent via-[#ce953a]/50 to-transparent mx-auto"
                    ></motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="text-sm sm:text-lg leading-relaxed italic text-amber-50/90 font-light tracking-wide"
                    >
                      &quot;Demi hari kami yakin, bahwa rasa yang tumbuh bukan hanya suka sesama teman. Hari demi hari makin mantap dengan rasa yang ada.&quot;
                    </motion.p>

                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "40%" }}
                      transition={{ delay: 1.3, duration: 1 }}
                      className="h-px bg-gradient-to-r from-transparent via-[#ce953a]/50 to-transparent mx-auto"
                    ></motion.div>

                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-sm sm:text-lg leading-relaxed italic text-white font-serif font-medium"
                    >
                      &quot;Hingga di hari kemarin, kami memantapkan hati untuk berlanjut ke jenjang pernikahan.&quot;
                    </motion.p>
                  </div>
                </div>

                {/* Bottom Decorative Corner */}
                <div className="absolute bottom-0 left-0 p-4 opacity-20">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-3xl text-[#ce953a]" />
                </div>
              </div>
            </div>
          </section>
        );
      case "info":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pb-24">
            <h2 className="mb-8 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic">Waktu & Lokasi</h2>
            <div className="glass p-8 sm:p-10 rounded-[50px] w-full max-w-lg space-y-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="font-bold text-xl tracking-widest text-[#ce953a] font-serif italic">Hari & Tanggal</p>
                  <p className="text-lg sm:text-xl">Jum&apos;at, 05 Juni 2026</p>
                  <a
                    href="https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Lulu+%26+Jefri&dates=20260605/20260606&location=Dsn.+Asemkandang,+Buduan,+Suboh,+Situbondo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-6 py-2 bg-white border border-[#ce953a] rounded-full text-sm text-[#ce953a] hover:bg-slate-100 transition-colors"
                  >
                    Simpan Tanggal
                  </a>
                </div>
                <div className="w-1/3 h-px bg-white/20 mx-auto"></div>
                <div className="space-y-1">
                  <p className="font-bold text-xl tracking-widest text-[#ce953a] font-serif italic">Tempat</p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Dsn. Asemkandang, Buduan, Suboh, Situbondo
                  </p>
                  <a
                    href="https://maps.app.goo.gl/QtBwAwMgsUPjJoqVA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-6 py-2 bg-white border border-[#ce953a] rounded-full text-sm text-[#ce953a] hover:bg-slate-100 transition-colors"
                  >
                    Lihat Alamat
                  </a>
                </div>
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="italic text-xs sm:text-sm font-light leading-relaxed opacity-70 px-4">
                  &quot;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.&quot;
                </p>
                <p className="text-[10px] mt-2 opacity-40 uppercase tracking-widest">— Ar-Rum: 21 —</p>
              </div>
            </div>
          </section>
        );
      case "gallery":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 pb-32 pt-12">
            <h2 className="mb-10 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic text-center">Gallery Foto</h2>
            
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-2 gap-4 w-full max-w-2xl"
            >
              {/* Foto 1 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                onClick={() => setSelectedImage("/assets/gallery/foto1.jpeg")} 
                className="cursor-pointer glass p-2 rounded-2xl border border-white/20 shadow-xl hover:rotate-2 transition-transform duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  <Image src="/assets/gallery/foto1.jpeg" alt="Gallery 1" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </motion.div>

              {/* Foto 2 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                onClick={() => setSelectedImage("/assets/gallery/foto2.jpeg")} 
                className="cursor-pointer glass p-2 rounded-2xl border border-white/20 shadow-xl hover:rotate-2 transition-transform duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  <Image src="/assets/gallery/foto2.jpeg" alt="Gallery 2" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </motion.div>

              {/* Foto 3 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                onClick={() => setSelectedImage("/assets/gallery/foto3.jpeg")} 
                className="cursor-pointer glass p-2 rounded-2xl border border-white/20 shadow-xl hover:rotate-2 transition-transform duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  <Image src="/assets/gallery/foto3.jpeg" alt="Gallery 3" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </motion.div>

              {/* Foto 4 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                onClick={() => setSelectedImage("/assets/gallery/foto4.jpeg")} 
                className="cursor-pointer glass p-2 rounded-2xl border border-white/20 shadow-xl hover:rotate-2 transition-transform duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  <Image src="/assets/gallery/foto4.jpeg" alt="Gallery 4" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </motion.div>

              {/* Foto 5 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                onClick={() => setSelectedImage("/assets/gallery/foto5.jpeg")} 
                className="cursor-pointer glass p-2 rounded-2xl border border-white/20 shadow-xl hover:rotate-2 transition-transform duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  <Image src="/assets/gallery/foto5.jpeg" alt="Gallery 5" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </motion.div>

              {/* Foto 6 */}
              <motion.div 
                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                onClick={() => setSelectedImage("/assets/gallery/foto6.jpeg")} 
                className="cursor-pointer glass p-2 rounded-2xl border border-white/20 shadow-xl hover:rotate-2 transition-transform duration-300"
              >
                <div className="relative w-full aspect-square overflow-hidden rounded-xl">
                  <Image src="/assets/gallery/foto6.jpeg" alt="Gallery 6" fill sizes="(max-width: 768px) 50vw, 250px" className="object-cover hover:scale-110 transition-transform duration-500" />
                </div>
              </motion.div>
            </motion.div>
            {/* Image Modal */}
            <AnimatePresence>
              {selectedImage && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
                  onClick={() => setSelectedImage(null)}
                >
                  <motion.div
                    initial={{ scale: 0.5, rotate: -10, y: 50, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
                    exit={{ scale: 0.5, rotate: 10, y: 50, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      mass: 1
                    }}
                    className="relative w-full max-w-lg aspect-[4/5]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Image
                      src={selectedImage}
                      alt="Full size gallery"
                      fill
                      sizes="(max-width: 768px) 100vw, 512px"
                      className="object-contain rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                    />
                    <motion.button
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-12 right-0 text-white/80 hover:text-white text-4xl font-light transition-colors"
                      onClick={() => setSelectedImage(null)}
                    >
                      &times;
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </section>
        );
      case "gift":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 pt-12 pb-32">
            <h2 className="mb-6 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic text-center">Your Gift To Us</h2>
            
            <div className="glass p-6 sm:p-10 rounded-[50px] w-full max-w-lg space-y-8 text-center">
              <p className="text-sm sm:text-base leading-relaxed text-amber-50/80 font-light">
                Kehadiran Bapak/Ibu/Saudara/i merupakan hadiah terbaik bagi kami. 
                Tetapi jika memberi merupakan tanda kasih, kami dengan senang hati menerimanya. 
                Semoga kebaikan, keberkahan dan kesehatan selalu diberikan kepada kita semua. Aamiin ...
              </p>

              <div className="grid gap-4">
                {[
                  { bank: "Mandiri", account: "1430034989325", name: "LUKMANUL KHOTIMAH", logo: "/assets/logo-mandiri.svg" },
                  { bank: "BNI", account: "2035231900", name: "Lukmanul khotimah", logo: "/assets/logo-bni.svg" },
                  { bank: "BRI", account: "653201031950532", name: "Lukmanul Khotimah", logo: "/assets/logo-bri.svg" },
                  { bank: "DANA", account: "085696067526", name: "Moh. Fais Jefri Albukhori", logo: "/assets/logo-dana.svg" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-4 sm:p-5 text-left relative overflow-hidden group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="relative w-20 h-10 sm:w-24 sm:h-12">
                        <Image src={item.logo} alt={item.bank} fill className="object-contain object-left filter brightness-0 invert opacity-80" />
                      </div>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(item.account);
                          alert("Nomor rekening disalin!");
                        }}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-amber-50/50 hover:text-white"
                      >
                        <FontAwesomeIcon icon={faCopy} className="text-base sm:text-lg" />
                      </button>
                    </div>
                    
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase tracking-widest text-amber-50/40 font-bold">Atas Nama</p>
                      <p className="text-sm sm:text-base font-medium text-amber-50 tracking-wide uppercase">{item.name}</p>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/5 space-y-0.5">
                      <p className="text-[10px] uppercase tracking-widest text-amber-50/40 font-bold">Nomor Rekening / HP</p>
                      <p className="text-xl sm:text-2xl font-serif text-[#ce953a] tracking-wider font-bold">{item.account}</p>
                    </div>

                    <div className="absolute -right-3 -bottom-3 opacity-5 group-hover:opacity-10 transition-opacity">
                      <FontAwesomeIcon icon={faGift} className="text-6xl -rotate-12" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 font-sans selection:text-[#ce953a]/30">
      <button onClick={audioContext?.togglePlay} className="fixed top-4 right-4 z-[100] text-[#ce953a]/20 backdrop-blur-sm text-[#ce953a] w-10 h-10 rounded-full flex items-center justify-center border text-[#ce953a]/30">
        <FontAwesomeIcon icon={audioContext?.isPlaying ? faPause : faPlay} />
      </button>

      <main className="w-full overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={activeTab}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.8, ease: "easeInOut" },
              y: { type: "spring", stiffness: 100, damping: 20 },
              scale: { duration: 0.8, ease: "easeOut" }
            }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-4 w-full max-w-[500px] pointer-events-none">
        <div className="nav-glass py-3 px-5 sm:px-10 rounded-full flex gap-4 sm:gap-8 items-center justify-around shadow-2xl border border-white/20 pointer-events-auto w-full" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.2)' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={`flex flex-col items-center transition-all duration-300 cursor-pointer min-w-[40px] ${activeTab === item.id ? "scale-110 -translate-y-1 text-white" : "opacity-40 text-white hover:opacity-100"
                }`}
            >
              <div className="text-lg sm:text-2xl drop-shadow-md">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <span className={`text-[7px] sm:text-[10px] mt-1 font-bold tracking-widest uppercase transition-all duration-300 whitespace-nowrap ${activeTab === item.id ? "opacity-100 block" : "opacity-0 hidden"}`}>
                {item.title}
              </span>
              {activeTab === item.id && (
                <div className="w-1 h-1 bg-white rounded-full mt-1 shadow-sm animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
