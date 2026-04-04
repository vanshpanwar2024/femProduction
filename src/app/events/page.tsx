export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center relative z-10 overflow-hidden">
      {/* Fixed Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif text-white/[0.05] tracking-[0.2em] uppercase whitespace-nowrap select-none">
          FEM HOUSE
        </span>
      </div>

      <div className="relative z-10 text-center space-y-6 px-6">
        <div className="uppercase inline-block mb-4 border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-4 py-2">
          Upcoming Events
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-widest uppercase text-white leading-tight">
          Coming <span className="font-serif italic text-[#f3c5ae]">Soon</span>
        </h1>
        <div className="w-24 h-[1px] bg-[#f3c5ae] opacity-50 mx-auto mt-8"></div>
        <p className="text-zinc-500 font-light tracking-widest text-sm md:text-base uppercase pt-6">
          Prepare for the next stage of our creative odyssey.
        </p>
      </div>
    </div>
  );
}
