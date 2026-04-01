export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-widest uppercase text-white">About Us</h1>
          <div className="w-24 h-px bg-zinc-600 mx-auto"></div>
        </div>
        
        <div className="space-y-8 text-lg font-light text-zinc-400 leading-relaxed md:text-xl">
          <p>
            VogueEvents was founded with a singular vision: to curate fashion experiences that challenge conventions and elevate design to pure art. Based in the heart of the global fashion dialogue, we orchestrate events that celebrate the dark, the avant-garde, and the unequivocally modern aesthetic.
          </p>
          <p>
            Our team comprises industry veterans, set designers, and creative directors who treat every runway as a blank canvas. By fusing stark, minimalist architecture with transformative sonic landscapes, we ensure that the clothing remains the focal point while building an immersive world around it.
          </p>
          <p>
            We believe that true elegance lies in restraint. Our curation highlights designers who tell stories through silhouette, texture, and uncompromising vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          <div className="h-80 bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1533681904393-9ab6efa9e41b?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>
          <div className="h-80 bg-zinc-900 bg-[url('https://images.unsplash.com/photo-1490481651829-ba01ae871676?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale hover:grayscale-0 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
}
