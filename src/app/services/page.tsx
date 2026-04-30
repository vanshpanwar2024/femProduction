const coreServices = [
  {
    title: "Film & Series Production",
    description:
      "From script to screen, Fem House Pvt Ltd delivers full-scale production for films, web series, documentaries, and branded storytelling with cinematic precision.",
    items: [
      "Feature Films & Short Films",
      "Web Series & Episodic Content",
      "Documentaries & Biopics",
      "Line Production & Creative Direction",
    ],
  },
  {
    title: "Talent & Coordination",
    description:
      "We source the right talent and manage on-ground execution so every production, event, and campaign runs with clarity and control.",
    items: [
      "Talent Sourcing & On-Ground Coordination",
      "Talent Casting & Development",
      "Adult & Kids Casting",
      "Portfolio Creation & Screen Tests",
    ],
  },
  {
    title: "Music & Distribution",
    description:
      "End-to-end music creation, promotion, and rights management designed to place your content across major streaming and media platforms.",
    items: [
      "Original Music Composition",
      "Music Videos & Audio-Visual Albums",
      "Global Digital Distribution",
      "Rights Management & Licensing",
    ],
  },
  {
    title: "Brand, PR & Media",
    description:
      "We shape narratives, build recognition, and connect brands to the right audience through strategy, visibility, and media planning.",
    items: [
      "PR & Media Relations",
      "Brand Strategy & Creative Services",
      "Media Buying & Planning",
      "Advertising & Commercial Production",
    ],
  },
  {
    title: "Experiential & Platform Services",
    description:
      "Fem House Pvt Ltd creates memorable experiences and digital pathways that help brands, creators, and businesses reach people in powerful ways.",
    items: [
      "Event Production & Experiential Marketing",
      "OTT & Digital Distribution",
      "Film, Music & Content Distribution",
      "Studio Services & Infrastructure",
    ],
  },
  {
    title: "Research & Innovation",
    description:
      "Our research wing keeps projects future-ready with insight-driven strategy, trend analysis, and emerging technology exploration.",
    items: [
      "Audience Analytics & Trend Forecasting",
      "Script & Concept Testing",
      "Platform Algorithm Research",
      "Emerging Tech Integration",
    ],
  },
];

const brandLines = [
  "Designing memorable brands that connect.",
  "Branding solutions that drive growth.",
  "Smart branding for the modern world.",
  "Building brands with soul and strategy.",
  "Where ideas become iconic brands.",
  "Creating cohesive brand experiences.",
  "Elevating brands through design thinking.",
  "Crafting identities that stand out.",
];

const agencyServices = [
  {
    title: "Advertising & Commercial Production",
    description:
      "From TVCs to digital video ads, product shoots, corporate films, and branded content, we create campaigns that are built to convert attention into action.",
  },
  {
    title: "Music Production & Distribution",
    description:
      "We produce original music, background scores, jingles, and soundtracks that amplify campaigns, films, and digital storytelling with emotional impact.",
  },
  {
    title: "OTT & Digital Distribution",
    description:
      "Using our in-house platform and partner networks, we help content reach audiences with the right packaging, metadata, and monetization strategy.",
  },
  {
    title: "Event Production & Experiential Marketing",
    description:
      "We deliver product launches, fashion shows, award nights, talent shows, and hybrid experiences that connect audiences to brands in memorable ways.",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black pt-32 pb-24 px-6 relative z-10 overflow-hidden">
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif text-white/[0.05] tracking-[0.2em] uppercase whitespace-nowrap select-none">
          FEM HOUSE PVT LTD
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-20">
        <section className="text-center space-y-6">
          <div className="uppercase inline-block mb-2 border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
            Our Services
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wider uppercase text-white leading-tight max-w-5xl mx-auto">
            End-to-End Media, Entertainment &amp; <span className="font-serif italic text-[#f3c5ae]">Brand Solutions</span>
          </h1>
          <p className="text-zinc-400 leading-relaxed text-lg md:text-xl font-light max-w-4xl mx-auto">
            At Fem House Pvt Ltd, we offer a robust portfolio of integrated services designed to empower brands, creators, businesses, and agencies in today&apos;s content-driven, digital-first marketplace. We combine creativity, strategy, technology, and execution under one unified vision.
          </p>
          <div className="w-24 h-[1px] bg-[#f3c5ae] opacity-60 mx-auto"></div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {coreServices.map((service) => (
            <article key={service.title} className="border border-zinc-900 bg-zinc-950/60 p-6 md:p-7 space-y-5 hover:border-[#f3c5ae]/40 transition-colors">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[4px] text-[#f3c5ae]">Core Offering</p>
                <h2 className="text-2xl text-white font-medium tracking-wide leading-tight">{service.title}</h2>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{service.description}</p>
              </div>
              <ul className="space-y-3 border-t border-zinc-800 pt-5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm md:text-base leading-relaxed">
                    <span className="mt-1 text-[#f3c5ae]">●</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="space-y-8">
          <div className="space-y-4 text-center max-w-4xl mx-auto">
            <div className="uppercase inline-block border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
              Agency Services
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase text-white leading-tight">
              Creative execution for <span className="font-serif italic text-[#f3c5ae]">modern media brands</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-light">
              Our agency services cover production, strategy, distribution, and audience engagement for brands that want more than isolated campaigns. We build connected experiences that move from concept to delivery with clarity and consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agencyServices.map((service) => (
              <article key={service.title} className="border border-zinc-900 bg-black/40 p-6 md:p-8 space-y-4">
                <h3 className="text-xl md:text-2xl text-[#f3c5ae] font-medium tracking-wide uppercase">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8 border-t border-zinc-900 pt-16">
          <div className="text-center space-y-4">
            <div className="uppercase inline-block border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
              Brand Thinking
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase text-white leading-tight">
              Designing memorable <span className="font-serif italic text-[#f3c5ae]">brand experiences</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {brandLines.map((line) => (
              <div key={line} className="border border-zinc-900 bg-zinc-950/40 px-5 py-6 text-center text-zinc-300 font-light tracking-wide leading-relaxed">
                {line}
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch border-t border-zinc-900 pt-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="uppercase inline-block border border-[#f3c5ae] text-[#f3c5ae] text-xs tracking-[3px] px-3 py-1">
                Discover Our Process
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-wider uppercase text-white leading-tight">
                Advertising &amp; <span className="font-serif italic text-[#f3c5ae]">Commercial Production</span>
              </h2>
              <p className="text-zinc-400 leading-relaxed text-base md:text-lg font-light max-w-3xl">
                From high-concept ad films to corporate campaigns and branded content, Fem House Pvt Ltd creates visual narratives that resonate across platforms and deliver measurable impact.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                "TV Commercials (TVCs)",
                "Digital Video Ads",
                "Product & Brand Shoots",
                "Corporate Films & AVs",
                "Influencer & Branded Content",
              ].map((item) => (
                <div key={item} className="border border-zinc-900 bg-zinc-950/50 px-5 py-5 text-zinc-300 tracking-wide">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <aside className="border border-zinc-900 bg-zinc-950/60 p-6 md:p-8 space-y-6">
            <h3 className="text-2xl text-[#f3c5ae] font-medium tracking-wide uppercase">Extended Capabilities</h3>
            <ul className="space-y-4 text-zinc-300 text-sm md:text-base leading-relaxed">
              <li><span className="text-[#f3c5ae]">●</span> PR &amp; Media Relations</li>
              <li><span className="text-[#f3c5ae]">●</span> Media Buying &amp; Planning</li>
              <li><span className="text-[#f3c5ae]">●</span> Film, Music &amp; Content Distribution</li>
              <li><span className="text-[#f3c5ae]">●</span> Studio Services &amp; Infrastructure</li>
              <li><span className="text-[#f3c5ae]">●</span> Research &amp; Development</li>
            </ul>
            <div className="pt-4 border-t border-zinc-800 text-zinc-400 text-sm leading-relaxed">
              Let&apos;s make something great work together. Got a project in mind?
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
