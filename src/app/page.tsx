import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';

const heroImages = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];

const faqs = [
  {
    q: "What is Fem House ?",
    a: "Fem House , or Fem House , is a dynamic platform that provides a prestigious stage for artists, including dancers, actors, singers, comedians, rappers, and models, to showcase their unique talents and compete in their respective fields."
  },
  {
    q: "Who can participate in Fem House ?",
    a: "FEM HOUSE welcomes individuals of all ages and backgrounds who are passionate about their art. There are no age restrictions, making it accessible to everyone with a talent to share."
  },
  {
    q: "How does the competition work?",
    a: "Participants can register on the FEM HOUSE website, audition in front of experienced judges, and compete in various rounds. Winners receive trophies, cash prizes, and scholarships, while all participants benefit from mentorship and training."
  },
  {
    q: "Is FEM HOUSE only for winners?",
    a: "No, FEM HOUSE is for everyone. Even if you don’t win, you can access mentorship, training, and recognition, fostering personal growth and development in your chosen field."
  },
  {
    q: "Can I watch the competitions on FEM HOUSE?",
    a: "Yes, FEM HOUSE competitions are live-streamed on an OTT platform, allowing a broader audience to enjoy and support the talented participants."
  },
  {
    q: "How can I get involved with FEM HOUSE as an audience member or supporter?",
    a: "You can follow FEM HOUSE on social media and the official website to stay updated on events and performances. Supporting and cheering for your favorite contestants is highly encouraged."
  },
  {
    q: "Can I collaborate with FEM HOUSE for creative projects?",
    a: "Yes, FEM HOUSE offers collaborative opportunities for brand assets, commissioned projects, and more. Reach out to FEM HOUSE to explore partnership possibilities."
  },
  {
    q: "How do I register for FEM HOUSE?",
    a: "To register, visit the official FEM HOUSE website, fill out the registration form, and submit the registration fee. You will receive a unique registration number for updates and auditions."
  },
  {
    q: "Is FEM HOUSE committed to fostering artistic growth?",
    a: "Absolutely, FEM HOUSE is dedicated to nurturing talent through mentorship, training, and constructive feedback, ensuring that every participant has the opportunity to grow and thrive in their artistic journey."
  },
  {
    q: "What happens during the audition process?",
    a: "During auditions, participants perform in front of a panel of experienced judges. The judges provide feedback, and successful participants advance to subsequent rounds."
  },
  {
    q: "Are there opportunities for audience participation or voting in competitions?",
    a: "FEM HOUSE occasionally includes audience participation or voting in certain competitions, allowing viewers to engage and support their favorite contestants."
  },
  {
    q: "How can I become a judge or mentor at FEM HOUSE?",
    a: "If you’re interested in becoming a judge or mentor at FEM HOUSE, you can reach out to our team through the official website or contact information provided."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <section className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden -z-0">
        <HeroSlider images={heroImages} />
      </section>

      {/* Featured Section / Who Are We */}
      <section className="sticky top-0 z-10 w-full min-h-screen flex flex-col justify-center py-16 lg:py-24 px-6 bg-black shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full md:w-1/2 space-y-6 lg:pr-8">
            <div className="uppercase inline-block mb-2 border border-[#D4A435] text-[#D4A435] text-xs tracking-[3px] px-3 py-1">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
              Welcome to <br />
              <span className="font-serif italic text-[#D4A435]">Fem House</span>
            </h2>
            <div className="w-24 h-[2px] bg-[#D4A435] opacity-80 my-8"></div>
            
            <div className="space-y-6">
              <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                <strong className="text-white font-medium">Fem House</strong> is a platform dedicated to showcasing and celebrating diverse talents and arts. Our mission is to provide a stage for individuals to express their creativity and hone their skills in various disciplines, including acting, singing, dancing, modeling, comedy, raps, and more.
              </p>
              <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                Through competitions, online learning resources, and community support, we aim to empower individuals to reach new heights in their artistic journeys. Join us in exploring and nurturing your talents at Fem House.
              </p>
            </div>
            
            <div className="pt-4">
              <Link href="/register" className="inline-block mt-4 px-8 py-4 border border-[#D4A435] text-[#D4A435] font-medium hover:bg-[#D4A435] hover:text-black transition-colors duration-500 tracking-widest uppercase text-sm">
                Join The Community
              </Link>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-[350px] sm:h-[450px] lg:h-[70vh] lg:max-h-[500px] bg-zinc-900 relative group overflow-hidden border border-zinc-800 mt-8 md:mt-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-luminosity hover:mix-blend-normal group-hover:scale-105 transition-all duration-[1500ms] ease-in-out"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Competitions & Odyssey Section */}
      <section className="sticky top-0 z-20 min-h-screen flex flex-col justify-center py-12 md:py-20 lg:py-24 px-6 bg-zinc-950 border-t border-zinc-900 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto space-y-8 mb-16 md:mb-20">
            <div className="uppercase inline-block border border-[#D4A435] text-[#D4A435] text-xs tracking-[3px] px-3 py-1">
              Competitions We Offer
            </div>
            <p className="text-zinc-400 leading-relaxed text-2xl md:text-3xl font-light tracking-wide font-serif italic">
              &quot;Explore a world of opportunities and showcase your prowess in dance, music, acting, and modeling through an array of exhilarating competitions brought to you by Fem House.&quot;
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[70vh] lg:max-h-[500px] bg-zinc-900 relative group overflow-hidden border border-zinc-800 order-2 lg:order-1 mt-8 md:mt-0">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-luminosity hover:mix-blend-normal group-hover:scale-105 transition-all duration-[1500ms] ease-in-out"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 to-transparent pointer-events-none"></div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6 lg:pl-8 order-1 lg:order-2">
              <div className="uppercase inline-block mb-2 border border-[#D4A435] text-[#D4A435] text-xs tracking-[3px] px-3 py-1">
                Your Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
                Embark on Your <br />
                <span className="font-serif italic text-[#D4A435]">Creative Odyssey</span>
              </h2>
              <div className="w-24 h-[2px] bg-[#D4A435] opacity-80 my-8"></div>
              
              <div className="space-y-6">
                <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                  Before you join <strong className="text-white font-medium">Fem House</strong>, take a moment to reflect on your unique journey. Embrace the boundless possibilities and undiscovered talents within you.
                </p>
                <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                  At Fem House, we&apos;re not just a platform; we&apos;re a canvas for your dreams. After you join us, your journey towards self-discovery and artistic growth begins. Together, we&apos;ll nurture your talents, fuel your passions, and inspire your creativity.
                </p>
                <p className="text-[#D4A435] leading-relaxed text-lg font-medium tracking-widest uppercase text-sm pt-4">
                  Welcome to a world where your artistic aspirations become reality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-30 min-h-screen flex flex-col justify-center py-32 px-6 bg-black shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-zinc-900">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center space-y-4 mb-20">
            <div className="uppercase inline-block mb-2 border border-[#D4A435] text-[#D4A435] text-xs tracking-[3px] px-3 py-1">
              Curiosity
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
              Frequently Asked <br />
              <span className="font-serif italic text-[#D4A435]">Questions</span>
            </h2>
            <div className="w-24 h-[2px] bg-[#D4A435] opacity-80 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
            {/* Left Column (First 6) */}
            <div className="flex flex-col border-t border-zinc-900">
              {faqs.slice(0, 6).map((faq, index) => (
                <div key={index} className="group border-b border-zinc-900 py-6 cursor-default">
                  <h3 className="font-light tracking-wide text-zinc-300 text-lg md:text-xl transition-colors duration-300 group-hover:text-[#D4A435]">
                    {faq.q}
                  </h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-zinc-400 leading-relaxed font-light text-sm md:text-base pr-8">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column (Last 6) */}
            <div className="flex flex-col border-t border-zinc-900">
              {faqs.slice(6, 12).map((faq, index) => (
                <div key={index + 6} className="group border-b border-zinc-900 py-6 cursor-default">
                  <h3 className="font-light tracking-wide text-zinc-300 text-lg md:text-xl transition-colors duration-300 group-hover:text-[#D4A435]">
                    {faq.q}
                  </h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-zinc-400 leading-relaxed font-light text-sm md:text-base pr-8">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
