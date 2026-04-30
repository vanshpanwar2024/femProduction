export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 relative z-10 overflow-hidden">
      {/* Fixed Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif text-white/[0.05] tracking-[0.2em] uppercase whitespace-nowrap select-none">
          FEM HOUSE
        </span>
      </div>

      <div className="max-w-4xl mx-auto space-y-16 relative z-10">
        <div className="text-center space-y-4">
          <div className="uppercase inline-block mb-2 border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
            Who We Are
          </div>
          <h1 className="text-4xl md:text-5xl font-light tracking-wider uppercase text-white leading-tight">
            About <span className="font-serif italic text-[#f3c5ae]">Us</span>
          </h1>
        </div>

        <div className="w-24 h-[1px] bg-[#f3c5ae] opacity-50 mx-auto"></div>

        <div className="space-y-16 text-zinc-300 font-light leading-relaxed text-lg pb-16">
          
          <section className="space-y-4">
            <h2 className="text-3xl text-[#f3c5ae] font-medium tracking-wide">Discover Fem House Pvt Ltd</h2>
            <p>
              <strong className="text-white font-medium">Fem House Pvt Ltd </strong> is more than just a platform; it&apos;s a vibrant and passionate community dedicated to nurturing and celebrating artistic talent in all its diverse forms. With a commitment to providing aspiring artists the opportunity to shine on a prestigious stage, Fem House Pvt Ltd has become a beacon for talent from various fields including dance, acting, singing, comedy, rap, and modeling. Our mission is clear: to empower individuals, regardless of age or background, to showcase their unique abilities, receive constructive feedback from experienced judges, and access comprehensive mentorship and training programs. We believe that within every artist lies immense potential, and Fem House Pvt Ltd is here to help them unlock it. Join us on this thrilling journey, where talent meets recognition, and dreams take flight.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl text-[#f3c5ae] font-medium tracking-wide">Our Vision and Mission</h2>
            <h3 className="text-xl text-white font-medium tracking-wide pb-2">Empowering Artistic Excellence: Fem House Pvt Ltd</h3>
            <p>
              At <strong className="text-white font-medium">Fem House Pvt Ltd</strong>, our unwavering commitment lies in the nurturing and celebration of artistic talent. We take pride in offering a prestigious platform that welcomes individuals of all ages and diverse backgrounds to showcase their exceptional abilities. Our primary mission is to actively foster growth, promote recognition, and cultivate artistic excellence. This is achieved through our meticulously organized competitions, constructive feedback from seasoned experts, and comprehensive mentorship and training programs, ensuring that every participant can thrive and reach their full potential in the world of arts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-3xl text-[#f3c5ae] font-medium tracking-wide">Distinguished Awards, Recognitions, and Milestones at Fem House Pvt Ltd</h2>
            <p>
              Fem House Pvt Ltd has consistently celebrated excellence and creativity within the artistic community. Over the years, our platform has witnessed remarkable talents emerging and flourishing. We take immense pride in acknowledging and rewarding outstanding achievements in various domains, including dance, singing, comedy, acting, modeling, and rap. Our winners have not only received prestigious trophies but have also been honored with cash prizes and scholarships, enabling them to further their artistic journeys. Fem House Pvt Ltd has also been recognized for its commitment to fostering talent and promoting inclusivity within the arts.
            </p>
            <p className="pt-4">
              We specialize in hosting national and international events that empower individuals to showcase their talent, confidence, and personality on prestigious platforms.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-3xl text-[#f3c5ae] font-medium tracking-wide uppercase">Our Pageants:</h2>
            
            <div className="space-y-6 pl-4 border-l border-[#f3c5ae]/30">
              <div>
                <h3 className="text-xl text-white font-medium tracking-wide mb-2 uppercase">Fem Miss India</h3>
                <p>One of our most powerful and impactful national pageants, offering a global-stage opportunity for women across India.</p>
              </div>
              
              <div>
                <h3 className="text-xl text-white font-medium tracking-wide mb-2 uppercase">Fem Miss Teen India</h3>
                <p>Empowering young teenage girls, this pageant celebrates grace, confidence, and intelligence, giving them a platform to shine globally.</p>
              </div>
              
              <div>
                <h3 className="text-xl text-white font-medium tracking-wide mb-2 uppercase">Fem Miss Bharat</h3>
                <p>A prestigious national pageant highlighting the poise, talent, and achievements of Indian women. Offering Indian women the opportunity to represent the nation internationally.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-8">
            <h2 className="text-3xl text-[#f3c5ae] font-medium tracking-wide uppercase">History:</h2>
            <p>
              Founded in 2019 by <strong className="text-white font-medium">Vikas, Manoj Sagwan and Vivek Panwar</strong> as co-founders, with <strong className="text-white font-medium">Pankaj Kumar</strong> as project coordinator, Fem House Pvt Ltd has emerged as a pioneer in pageantry and entertainment.
            </p>
            <p>
              With a mission to inspire, empower, and transform lives, Fem House Pvt Ltd continues to be a trusted leader — creating platforms, nurturing talent, and raising the standards of beauty pageants and fashion and Dance events in India.
            </p>
            <p className="text-[#f3c5ae] font-serif italic text-xl pt-4">
              Join us on this extraordinary journey of empowerment, elegance, and opportunity.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-zinc-900">
            <div className="space-y-3">
              <h2 className="text-2xl text-[#f3c5ae] font-medium tracking-wide">Our Vision:</h2>
              <p className="text-sm">
                Our vision is to create a global community where artistic talent knows no boundaries. We aim to empower aspiring artists, whether dancers, actors, singers, comedians, rappers, or models, to reach their full potential and find success in their chosen fields.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl text-[#f3c5ae] font-medium tracking-wide">Our Mission:</h2>
              <p className="text-sm">
                Our mission is to provide a supportive and inclusive platform for artists to shine. We are dedicated to offering opportunities for growth, recognition, and personal development through competition, mentorship, and comprehensive training programs.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl text-[#f3c5ae] font-medium tracking-wide">Our Commitment:</h2>
              <p className="text-sm">
                We are committed to fostering a diverse and vibrant community of artists, where passion and creativity are celebrated. At Fem House Pvt Ltd, talent meets opportunity, and dreams are transformed into reality. Join us in this exciting journey of artistic exploration and achievement.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
