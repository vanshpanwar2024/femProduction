import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract Dark Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 -z-10" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center -z-10" />
        
        <div className="text-center space-y-8 px-6 max-w-4xl z-10">
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white uppercase drop-shadow-2xl">
            Elevate Your <span className="font-serif italic text-zinc-400">Style</span>
          </h1>
          <p className="text-lg md:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl mx-auto">
            Experience the avant-garde of fashion events. Where aesthetics meet exclusive industry insights.
          </p>
          <div className="flex justify-center gap-6 pt-8">
            <Link href="/events" className="px-8 py-4 bg-white text-black font-medium hover:bg-zinc-200 transition-colors duration-300 rounded-full tracking-wider uppercase text-sm">
              Explore Events
            </Link>
            <Link href="/gallery" className="px-8 py-4 border border-zinc-500 text-white font-medium hover:bg-zinc-900 transition-colors duration-300 rounded-full tracking-wider uppercase text-sm">
              View Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-light tracking-widest uppercase">The Essence of Dark Aesthetics</h2>
            <div className="w-16 h-px bg-zinc-600"></div>
            <p className="text-zinc-400 leading-relaxed text-lg font-light">
              We curate experiences that linger in memory. Our fashion shows embrace the dark, the minimal, and the profound. Join us in celebrating a curated collection of contemporary designers breaking the mold of traditional wear.
            </p>
          </div>
          <div className="w-full md:w-1/2 h-[500px] bg-zinc-900 relative group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-luminosity hover:mix-blend-normal group-hover:scale-105 transition-all duration-700"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
