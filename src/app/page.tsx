import Link from 'next/link';
import HeroSlider from '@/components/HeroSlider';
import FAQItem from '@/components/FAQItem';

const heroImages = [
  "/image-1.png",
  "/image-2.png",
  "/image-3.png",
  "/image-4.png",
];

const faqs = [
  {
    q: "What is Fem House Pvt Ltd ?",
    a: "Fem House Pvt Ltd is a dynamic platform that provides a prestigious stage for artists, including dancers, actors, singers, comedians, rappers, and models, to showcase their unique talents and compete in their respective fields."
  },
  {
    q: "Who can participate in Fem House Pvt Ltd ?",
    a: "FEM HOUSE PVT LTD welcomes individuals of all ages and backgrounds who are passionate about their art. There are no age restrictions, making it accessible to everyone with a talent to share."
  },
  {
    q: "How does the competition work?",
    a: "Participants can register on the FEM HOUSE PVT LTD website, audition in front of experienced judges, and compete in various rounds. Winners receive trophies, cash prizes, and scholarships, while all participants benefit from mentorship and training."
  },
  {
    q: "Is FEM HOUSE PVT LTD only for winners?",
    a: "No, FEM HOUSE PVT LTD is for everyone. Even if you don't win, you can access mentorship, training, and recognition, fostering personal growth and development in your chosen field."
  },
  {
    q: "Can I watch the competitions on FEM HOUSE PVT LTD?",
    a: "Yes, FEM HOUSE PVT LTD competitions are live-streamed on an OTT platform, allowing a broader audience to enjoy and support the talented participants."
  },
  {
    q: "How can I get involved with FEM HOUSE PVT LTD as an audience member or supporter?",
    a: "You can follow FEM HOUSE PVT LTD on social media and the official website to stay updated on events and performances. Supporting and cheering for your favorite contestants is highly encouraged."
  },
  {
    q: "Can I collaborate with FEM HOUSE PVT LTD for creative projects?",
    a: "Yes, FEM HOUSE PVT LTD offers collaborative opportunities for brand assets, commissioned projects, and more. Reach out to FEM HOUSE PVT LTD to explore partnership possibilities."
  },
  {
    q: "How do I register for FEM HOUSE PVT LTD?",
    a: "To register, visit the official FEM HOUSE PVT LTD website, fill out the registration form, and submit the registration fee. You will receive a unique registration number for updates and auditions."
  },
  {
    q: "Is FEM HOUSE PVT LTD committed to fostering artistic growth?",
    a: "Absolutely, FEM HOUSE PVT LTD is dedicated to nurturing talent through mentorship, training, and constructive feedback, ensuring that every participant has the opportunity to grow and thrive in their artistic journey."
  },
  {
    q: "What happens during the audition process?",
    a: "During auditions, participants perform in front of a panel of experienced judges. The judges provide feedback, and successful participants advance to subsequent rounds."
  },
  {
    q: "Are there opportunities for audience participation or voting in competitions?",
    a: "FEM HOUSE PVT LTD occasionally includes audience participation or voting in certain competitions, allowing viewers to engage and support their favorite contestants."
  },
  {
    q: "How can I become a judge or mentor at FEM HOUSE PVT LTD?",
    a: "If you're interested in becoming a judge or mentor at FEM HOUSE PVT LTD, you can reach out to our team through the official website or contact information provided."
  }
];

export default function Home() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Hero Section */}
      <section className="relative lg:sticky lg:top-0 h-[100svh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden z-0">
        <HeroSlider images={heroImages} />
      </section>

      {/* Introduction Section */}
      <section className="relative lg:sticky lg:top-0 z-10 w-full min-h-[100svh] flex flex-col justify-center py-16 lg:py-24 px-6 bg-black shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-16 w-full">
          <div className="w-full md:w-1/2 space-y-6 lg:pr-8">
            <div className="uppercase inline-block mb-2 border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
              Welcome to <br />
              <span className="font-serif italic text-[#f3c5ae]">Fem House Pvt Ltd</span>
            </h2>
            <div className="w-24 h-[2px] bg-[#f3c5ae] opacity-80 my-8"></div>
            
            <div className="space-y-6">
              <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                <strong className="text-white font-medium">Fem House Pvt Ltd</strong> is a platform dedicated to showcasing and celebrating diverse talents and arts. Our mission is to provide a stage for individuals to express their creativity and hone their skills in various disciplines, including acting, singing, dancing, modeling, comedy, raps, and more.
              </p>
              <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                Through competitions, online learning resources, and community support, we aim to empower individuals to reach new heights in their artistic journeys. Join us in exploring and nurturing your talents at Fem House Pvt Ltd.
              </p>
            </div>
            
            <div className="pt-4">
              <Link href="/register" className="inline-block mt-4 px-8 py-4 border border-[#f3c5ae] text-[#f3c5ae] font-medium hover:bg-[#f3c5ae] hover:text-black transition-colors duration-500 tracking-widest uppercase text-sm">
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
      <section className="relative lg:sticky lg:top-0 z-20 w-full min-h-[100svh] flex flex-col justify-center py-12 md:py-20 lg:py-24 px-6 bg-zinc-950 border-t border-zinc-900 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-4xl mx-auto space-y-8 mb-16 md:mb-20">
            <div className="uppercase inline-block border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
              Competitions We Offer
            </div>
            <p className="text-zinc-400 leading-relaxed text-2xl md:text-3xl font-light tracking-wide font-serif italic">
              &quot;Explore a world of opportunities and showcase your prowess in dance, music, acting, and modeling through an array of exhilarating competitions brought to you by Fem House Pvt Ltd.&quot;
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 h-[350px] sm:h-[450px] lg:h-[70vh] lg:max-h-[500px] bg-zinc-900 relative group overflow-hidden border border-zinc-800 order-2 lg:order-1 mt-8 md:mt-0">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534126416832-a88fdf2911c2?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-70 mix-blend-luminosity hover:mix-blend-normal group-hover:scale-105 transition-all duration-[1500ms] ease-in-out"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950/80 to-transparent pointer-events-none"></div>
            </div>
            
            <div className="w-full lg:w-1/2 space-y-6 lg:pl-8 order-1 lg:order-2">
              <div className="uppercase inline-block mb-2 border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
                Your Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
                Embark on Your <br />
                <span className="font-serif italic text-[#f3c5ae]">Creative Odyssey</span>
              </h2>
              <div className="w-24 h-[2px] bg-[#f3c5ae] opacity-80 my-8"></div>
              
              <div className="space-y-6">
                <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                  Before you join <strong className="text-white font-medium">Fem House Pvt Ltd</strong>, take a moment to reflect on your unique journey. Embrace the boundless possibilities and undiscovered talents within you.
                </p>
                <p className="text-zinc-400 leading-relaxed text-lg font-light tracking-wide">
                  At Fem House Pvt Ltd, we&apos;re not just a platform; we&apos;re a canvas for your dreams. After you join us, your journey towards self-discovery and artistic growth begins. Together, we&apos;ll nurture your talents, fuel your passions, and inspire your creativity.
                </p>
                <p className="text-[#f3c5ae] leading-relaxed text-lg font-medium tracking-widest uppercase text-sm pt-4">
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
            <div className="uppercase inline-block mb-2 border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
              Curiosity
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
              Frequently Asked <br />
              <span className="font-serif italic text-[#f3c5ae]">Questions</span>
            </h2>
            <div className="w-24 h-[2px] bg-[#f3c5ae] opacity-80 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
            {/* Left Column (First 6) */}
            <div className="flex flex-col border-t border-zinc-900">
              {faqs.slice(0, 6).map((faq, index) => (
                <FAQItem key={index} q={faq.q} a={faq.a} />
              ))}
            </div>

            {/* Right Column (Last 6) */}
            <div className="flex flex-col border-t border-zinc-900">
              {faqs.slice(6, 12).map((faq, index) => (
                <FAQItem key={index + 6} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
