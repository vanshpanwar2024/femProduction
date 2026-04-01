export default function GalleryPage() {
  const images = [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549298240-0d8e60513026?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492633423870-43d1cd2a4c28?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop"
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white">Gallery</h1>
          <div className="w-24 h-px bg-zinc-600 mx-auto"></div>
          <p className="text-zinc-500 max-w-2xl mx-auto mt-6">A visual journey through past seasons, capturing moments of stark beauty and transformative design.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {images.map((src, idx) => (
            <div key={idx} className="relative aspect-[3/4] group overflow-hidden bg-zinc-900">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
                style={{ backgroundImage: `url(${src})` }}
              ></div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
