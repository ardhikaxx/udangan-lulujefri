"use client";

import { useState, useSyncExternalStore } from "react";
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
  return () => {};
}
function getSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  
  // Menggunakan useSyncExternalStore sebagai pengganti useEffect(setIsMounted)
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#002B19]" />;

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <section className="flex flex-col items-center justify-center min-h-screen px-4 pb-36 overflow-hidden">
            {/* Nama Cover dengan Animasi Masuk */}
            <div className="relative w-full max-w-[450px] fade-up-enter -mt-15 sm:-mt-16">
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
            
            {/* Vector dengan Animasi Masuk Terlambat */}
            <div className="relative w-full max-w-[240px] -mt-20 sm:-mt-22 fade-up-enter [animation-delay:300ms]">
              <div className="animate-float-delayed">
                <Image
                  src="/assets/vector.png"
                  alt="Wedding Illustration"
                  width={400}
                  height={500}
                  className="w-full h-auto drop-shadow-xl"
                />
              </div>
            </div>
            
            {/* Tanggal & Teks dengan Animasi Masuk Terlambat */}
            <div className="-mt-15 flex flex-col items-center gap-2 text-center fade-up-enter [animation-delay:600ms]">
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
            <h2 className="mb-12 text-4xl sm:text-5xl font-serif text-amber-50 drop-shadow-lg italic">Pasangan Pengantin</h2>
            <div className="glass p-8 sm:p-12 rounded-[50px] w-full max-w-lg space-y-8 sm:space-y-12">
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
                  <p className="font-bold text-xl uppercase tracking-widest text-amber-200">Hari & Tanggal</p>
                  <p className="text-lg sm:text-xl">Jum&apos;at, 05 Juni 2026</p>
                </div>
                <div className="w-1/3 h-px bg-white/20 mx-auto"></div>
                <div className="space-y-1">
                  <p className="font-bold text-xl uppercase tracking-widest text-amber-200">Tempat</p>
                  <p className="text-sm sm:text-base leading-relaxed">
                    Dsn. Asemkandang, Buduan, Suboh, Situbondo
                  </p>
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
                <div key={i} className="aspect-[4/5] glass p-2 rounded-[32px] border border-white/20 shadow-2xl group relative overflow-hidden transition-all duration-500 hover:rotate-2">
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
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 font-sans selection:bg-amber-200/30">
      
      {/* Konten Utama */}
      <main className="w-full">
        {renderContent()}
      </main>

      {/* Floating Bottom Navigation */}
      <nav className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center px-4 w-full pointer-events-none">
        <div className="glass py-3 px-8 sm:px-11 rounded-full flex gap-7 sm:gap-10 items-center shadow-2xl border border-white/20 pointer-events-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
                activeTab === item.id ? "scale-105 -translate-y-1.5 text-amber-200" : "opacity-40 text-white hover:opacity-100"
              }`}
            >
              <div className="text-xl sm:text-2xl drop-shadow-md">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <span className={`text-[8px] sm:text-[10px] mt-1 font-bold tracking-widest uppercase transition-all duration-300 ${activeTab === item.id ? "opacity-100" : "opacity-0 h-0"}`}>
                {item.title}
              </span>
              {activeTab === item.id && (
                <div className="w-1.2 h-1.2 bg-amber-200 rounded-full mt-1 shadow-sm animate-pulse" />
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
