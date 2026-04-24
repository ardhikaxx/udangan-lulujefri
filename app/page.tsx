"use client";

import { useState, useSyncExternalStore, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRing,
  faCalendarAlt,
  faImages
} from "@fortawesome/free-solid-svg-icons";

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Menggunakan useSyncExternalStore sebagai pengganti useEffect(setIsMounted)
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const navItems = [
    { id: "home", icon: faHome, title: "Home" },
    { id: "bride", icon: faRing, title: "Bride" },
    { id: "info", icon: faCalendarAlt, title: "Event" },
    { id: "gallery", icon: faImages, title: "Gallery" },
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

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-4 pb-24 overflow-hidden">
            <div className="relative w-full max-w-[450px] fade-up-enter">
              <div className="animate-float">
                <Image
                  src="/assets/nama-cover.png"
                  alt="The Wedding of Lukmanul & Fais"
                  width={500}
                  height={500}
                  className="w-full h-auto drop-shadow-wedding"
                  priority
                />
              </div>
            </div>

            <div className="mt-2 flex flex-col items-center gap-2 text-center fade-up-enter [animation-delay:600ms]">
              <p className="text-lg sm:text-xl font-serif text-amber-200 tracking-wide drop-shadow-md">
                Jum&apos;at, 05 Juni 2026
              </p>
              <div className="px-6 py-2 glass rounded-full animate-pulse border border-white/10">
                <p className="text-xs tracking-[0.4em] uppercase font-light text-amber-50">
                  Wedding Invitation
                </p>
              </div>
            </div>
          </section>
        );
      case "bride":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pb-24 animate-in slide-in-from-bottom-20 duration-1000">
            <h2 className="mb-6 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic">Pasangan Pengantin</h2>
              <div className="glass p-4 sm:p-8 rounded-[50px] w-full max-w-lg space-y-8 sm:space-y-12">
                <div className="flex justify-center gap-8 mb-4">
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-200">
                    <Image src="/assets/lulu.jpeg" alt="Lukmanul Khotimah" fill className="object-cover" />
                  </div>
                  <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-200">
                    <Image src="/assets/fais.jpeg" alt="Moh. Fais Jefri Albukhori" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-amber-200">Lukmanul Khotimah, S.Tr., Ak</h3>
                  <p className="text-xs opacity-70 italic">Putri dari</p>
                  <p className="text-base sm:text-lg font-medium tracking-wide">Bpk. Hafid & Ibu Rumyati</p>
                </div>
                <div className="text-3xl font-serif opacity-30 italic">dengan</div>
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-serif italic text-amber-200">Moh. Fais Jefri Albukhori, S.Tr., Ak</h3>
                  <p className="text-xs opacity-70 italic">Putra dari</p>
                  <p className="text-base sm:text-lg font-medium tracking-wide">Alm. Bpk. Jaelani & Ibu Suti’ah</p>
                </div>
              </div>
          </section>
        );
      case "info":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center pb-24 animate-in slide-in-from-bottom-20 duration-1000">
            <h2 className="mb-8 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic">Waktu & Lokasi</h2>
            <div className="glass p-8 sm:p-10 rounded-[50px] w-full max-w-lg space-y-8">
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="font-bold text-xl tracking-widest text-amber-200 font-serif italic">Hari & Tanggal</p>
                  <p className="text-lg sm:text-xl">Jum&apos;at, 05 Juni 2026</p>
                  <a
                    href="https://www.google.com/calendar/render?action=TEMPLATE&text=The+Wedding+of+Lukmanul+%26+Fais&dates=20260605/20260606&location=Dsn.+Asemkandang,+Buduan,+Suboh,+Situbondo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-6 py-2 border border-amber-200/50 rounded-full text-sm text-amber-200 hover:bg-amber-200/10 transition-colors"
                  >
                    Simpan Tanggal
                  </a>
                </div>
                <div className="w-1/3 h-px bg-white/20 mx-auto"></div>
                <div className="space-y-1">
                  <p className="font-bold text-xl tracking-widest text-amber-200 font-serif italic">Tempat</p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Dsn. Asemkandang, Buduan, Suboh, Situbondo
                  </p>
                  <a
                    href="https://maps.app.goo.gl/QtBwAwMgsUPjJoqVA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 px-6 py-2 border border-amber-200/50 rounded-full text-sm text-amber-200 hover:bg-amber-200/10 transition-colors"
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
          <section className="flex flex-col items-center justify-center min-h-screen px-6 pb-32 pt-12 animate-in fade-in duration-1000">
            <h2 className="mb-10 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic text-center">Gallery Foto</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 w-full max-w-3xl">
              {galleryImages.map((src, i) => (
                <div key={i} onClick={() => setSelectedImage(src)} className="cursor-pointer aspect-[4/5] glass p-2 rounded-[32px] border border-white/20 shadow-2xl group relative overflow-hidden transition-all duration-500 hover:rotate-2">
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={`Gallery ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
              <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative w-full max-w-lg aspect-[4/5]">
                  <Image
                    src={selectedImage}
                    alt="Full size gallery"
                    fill
                    className="object-contain rounded-2xl"
                  />
                </div>
                <button
                  className="absolute top-6 right-6 text-white text-3xl font-light hover:text-amber-200 transition-colors"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
              </div>
            )}
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 font-sans selection:bg-amber-200/30">

      {/* Audio Element */}
      <audio ref={audioRef} src="/assets/audio.mp3" loop />

      {/* Music Control Button */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="fixed top-4 right-4 z-[100] bg-amber-200/20 backdrop-blur-sm text-amber-200 px-4 py-2 rounded-full text-sm border border-amber-200/30 hover:bg-amber-200/30 transition-colors cursor-pointer pointer-events-auto"
        >
          Putar Musik
        </button>
      )}

      {/* Konten Utama */}
      <main className="w-full">
        {renderContent()}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-4 w-full pointer-events-none">
        <div className="nav-glass py-3 px-8 sm:px-11 rounded-full flex gap-7 sm:gap-10 items-center shadow-2xl border border-white/20 pointer-events-auto" style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(255,255,255,0.2)' }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${activeTab === item.id ? "scale-105 -translate-y-1.5 text-amber-200" : "opacity-40 text-white hover:opacity-100"
                }`}
            >
              <div className="text-xl sm:text-2xl drop-shadow-md">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <span className={`text-[8px] sm:text-[10px] mt-1 font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === item.id ? "opacity-100" : "opacity-0 h-0"}`}>
                {item.title}
              </span>
              {activeTab === item.id && (
                <div className="w-1.5 h-1.5 bg-amber-200 rounded-full mt-1 shadow-sm animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
      `}</style>
    </div>
  );
}
