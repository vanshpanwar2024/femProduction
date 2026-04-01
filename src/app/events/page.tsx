import Link from 'next/link';

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Paris Dark Matter Collection",
      date: "October 14, 2026",
      location: "Le Palais Monochrome, Paris",
      description: "An exploration of texture and shadow featuring emerging avant-garde designers.",
      image: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=2074&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "NYFW: The Void Showcase",
      date: "September 08, 2026",
      location: "The Industrial Warehouse, NY",
      description: "Minimalist streetwear colliding with high fashion tailoring in a stark environment.",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Tokyo Shadows & Light",
      date: "December 05, 2026",
      location: "Neo Shibuya Gallery, Tokyo",
      description: "Deconstructed traditional wear viewed through a modernized dark aesthetic lens.",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white">Upcoming Events</h1>
          <div className="w-24 h-px bg-zinc-600 mx-auto"></div>
          <p className="text-zinc-500 max-w-2xl mx-auto mt-6">Secure your place in the front row of the fashion world's most exclusive showcases.</p>
        </div>
        
        <div className="space-y-16 pt-12">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col md:flex-row gap-12 items-center bg-zinc-900 overflow-hidden group">
              <div 
                className="w-full md:w-1/2 aspect-video bg-cover bg-center grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                style={{ backgroundImage: `url(${event.image})` }}
              ></div>
              <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
                <div className="text-zinc-500 uppercase tracking-widest text-sm font-medium">{event.date}</div>
                <h2 className="text-3xl lg:text-4xl text-white font-light uppercase tracking-wider">{event.title}</h2>
                <div className="text-zinc-400 font-medium italic">{event.location}</div>
                <p className="text-zinc-300 leading-relaxed font-light">{event.description}</p>
                <div className="pt-6">
                  <button className="px-8 py-3 border border-zinc-600 text-white hover:bg-white hover:text-black uppercase text-xs tracking-widest transition-colors duration-300">
                    RSVP to Waitlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-20">
          <Link href="/contact" className="text-zinc-400 hover:text-white underline underline-offset-4 tracking-widest text-sm uppercase transition-colors">
            Inquire for Press Access
          </Link>
        </div>
      </div>
    </div>
  );
}
