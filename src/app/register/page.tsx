import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";
import { supabase } from "@/lib/supabase";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const user = session ? await decrypt(session) : null;

  if (!user) {
    redirect("/login");
  }

  // Fetch existing profile data if it exists
  let existingProfile = null;
  if (supabase) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .single();
    
    if (data) {
      existingProfile = data;
    }
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10 overflow-hidden max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
      
      {/* Left Text Space */}
      <div className="w-full md:w-6/12 lg:w-7/12 pt-0 md:pt-4 md:pr-10 lg:pr-16 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white leading-tight mb-4">
          Talented Artists, <br className="hidden md:block"/>
          <span className="text-[#D4A435]">Diverse Categories</span>
        </h2>
        <div className="w-20 h-[1px] bg-[#D4A435] opacity-50 mb-8"></div>
        
        <div className="space-y-6 pb-4">
          
          <div className="space-y-1.5 relative before:absolute before:left-[-14px] before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#D4A435] before:rounded-full pl-4">
            <h3 className="text-[#D4A435] text-[10px] uppercase tracking-[3px]">Dancers</h3>
            <h4 className="text-white text-sm md:text-base font-light tracking-wide">Elevate Your Dance Skills</h4>
            <p className="text-zinc-400 text-[10px] md:text-[11px] leading-relaxed">
              At Fem House, we provide a dedicated platform for dancers to showcase their artistry. Join our vibrant community of dancers and immerse yourself in an environment that celebrates your passion. Compete, learn, and grow with constructive feedback and mentorship from experienced judges.
            </p>
          </div>

          <div className="space-y-1.5 relative before:absolute before:left-[-14px] before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#D4A435] before:rounded-full pl-4">
            <h3 className="text-[#D4A435] text-[10px] uppercase tracking-[3px]">Actors</h3>
            <h4 className="text-white text-sm md:text-base font-light tracking-wide">Unleash Your Acting Potential</h4>
            <p className="text-zinc-400 text-[10px] md:text-[11px] leading-relaxed">
              For aspiring actors, Fem House is your stage to shine. Explore your acting talents, audition in front of seasoned judges, and receive valuable feedback to refine your craft. We believe in nurturing your potential through mentorship and training, both online and offline.
            </p>
          </div>

          <div className="space-y-1.5 relative before:absolute before:left-[-14px] before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#D4A435] before:rounded-full pl-4">
            <h3 className="text-[#D4A435] text-[10px] uppercase tracking-[3px]">Singers</h3>
            <h4 className="text-white text-sm md:text-base font-light tracking-wide">Harmonize Your Voice with Excellence</h4>
            <p className="text-zinc-400 text-[10px] md:text-[11px] leading-relaxed">
              At Fem House, we recognize the power of the human voice. Singers of all genres and styles are welcomed to participate and showcase their vocal prowess. Compete in a supportive environment, receive expert feedback, and access mentorship to fine-tune your singing skills.
            </p>
          </div>

          <div className="space-y-1.5 relative before:absolute before:left-[-14px] before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#D4A435] before:rounded-full pl-4">
            <h3 className="text-[#D4A435] text-[10px] uppercase tracking-[3px]">Comedians</h3>
            <h4 className="text-white text-sm md:text-base font-light tracking-wide">Spread Laughter and Comedy Brilliance</h4>
            <p className="text-zinc-400 text-[10px] md:text-[11px] leading-relaxed">
              Comedy is an art, and at Fem House, we celebrate the brilliance of comedians. Join our community of funny and witty minds, perform your best routines, and compete for recognition. Our experienced judges provide valuable insights to enhance your comedic timing and delivery.
            </p>
          </div>

          <div className="space-y-1.5 relative before:absolute before:left-[-14px] before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#D4A435] before:rounded-full pl-4">
            <h3 className="text-[#D4A435] text-[10px] uppercase tracking-[3px]">Rappers</h3>
            <h4 className="text-white text-sm md:text-base font-light tracking-wide">Rap with Passion and Precision</h4>
            <p className="text-zinc-400 text-[10px] md:text-[11px] leading-relaxed">
              Rap is a form of lyrical artistry, and at Fem House, we provide a stage for passionate rappers to showcase their skills. Participate in rap battles, impress judges with your lyrical prowess, and receive constructive feedback to elevate your craft.
            </p>
          </div>

          <div className="space-y-1.5 relative before:absolute before:left-[-14px] before:top-1.5 before:w-1.5 before:h-1.5 before:bg-[#D4A435] before:rounded-full pl-4">
            <h3 className="text-[#D4A435] text-[10px] uppercase tracking-[3px]">Models</h3>
            <h4 className="text-white text-sm md:text-base font-light tracking-wide">Strut Your Style on the Runway</h4>
            <p className="text-zinc-400 text-[10px] md:text-[11px] leading-relaxed">
               For aspiring models, Fem House is the runway to strut your style and grace. Showcase your modeling talent, compete with confidence, and receive expert guidance to enhance your modeling skills. Join us and make your presence felt on the glamorous stage.
            </p>
          </div>
          
        </div>
      </div>

      {/* Right Form Box */}
      <div className="w-full md:w-6/12 lg:w-5/12 mt-8 md:mt-0 ml-auto">
        <div className="max-w-[400px] w-full ml-auto space-y-8 bg-transparent p-0 relative z-10">
        <div className="space-y-3">
          <div className={`uppercase inline-block mb-2 border text-[10px] tracking-[2px] px-2 py-0.5 ${
            existingProfile?.status === 'approved' ? 'border-green-500 text-green-500' :
            existingProfile?.status === 'declined' ? 'border-red-500 text-red-500' :
            'border-[#D4A435] text-[#D4A435]'
          }`}>
            {existingProfile?.status === 'approved' ? "Approved" : 
             existingProfile?.status === 'declined' ? "Declined" : 
             existingProfile ? "Under Review" : "Sign Up"}
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white leading-tight">
            {existingProfile?.status === 'approved' ? "Congratulations!" : 
             existingProfile?.status === 'declined' ? "We're Sorry" : 
             existingProfile ? "Registration Submitted" : "Complete Registration"}
          </h1>
          <div className={`w-16 h-[1px] opacity-50 ${
            existingProfile?.status === 'approved' ? 'bg-green-500' :
            existingProfile?.status === 'declined' ? 'bg-red-500' :
            'bg-[#D4A435]'
          }`}></div>
          
          {existingProfile?.status === 'approved' ? (
            <div className="mt-4 p-4 bg-green-500/10 border border-green-500/50">
              <p className="text-green-400 text-[13px] md:text-sm tracking-wide font-medium leading-relaxed">
                Your profile has been approved! We are excited to welcome you to FEM PRODUCTION. Our team will be in touch with you shortly.
              </p>
            </div>
          ) : existingProfile?.status === 'declined' ? (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50">
              <p className="text-red-400 text-[13px] md:text-sm tracking-wide font-medium leading-relaxed">
                Unfortunately, your profile has been declined at this time. Thank you for your interest and we wish you the best in your future endeavors.
              </p>
            </div>
          ) : existingProfile ? (
            <div className="mt-4 p-3 bg-[#D4A435]/10 border border-[#D4A435]/50">
              <p className="text-[#D4A435] text-[11px] md:text-xs tracking-wide">
                Thanks for registering! Our experts are currently reviewing your profile.
              </p>
            </div>
          ) : (
            <p className="text-zinc-400 mt-4 text-[11px] md:text-xs italic font-serif">
              Please complete your profile to register for events correctly.
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-4 pb-6 border-b border-[#D4A435]/30">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-14 h-14 rounded-full border border-[#D4A435] object-cover p-0.5" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-black border border-[#D4A435] text-[#D4A435] flex items-center justify-center text-xl font-medium tracking-widest uppercase">
              {user.name?.[0] || user.email?.[0] || "U"}
            </div>
          )}
          <div className="space-y-1">
            <h2 className="text-lg text-white font-medium">{user.name}</h2>
          </div>
        </div>

        <ProfileForm user={user} existingProfile={existingProfile} />

        <div className="pt-6 border-t border-[#D4A435]/30 text-center">
          <p className="text-zinc-500 italic text-[9px] uppercase tracking-[2px]">Connected via {user.provider === "google" ? "Google Authentication" : "Native Account"}.</p>
        </div>
        </div>
      </div>
    </div>
  );
}
