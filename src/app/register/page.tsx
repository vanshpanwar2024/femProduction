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
      <div className="w-full md:w-6/12 lg:w-7/12 pt-0 md:pt-12">
        {/* ADD YOUR TEXT HERE */}
      </div>

      {/* Right Form Box */}
      <div className="w-full md:w-6/12 lg:w-5/12 mt-8 md:mt-0 ml-auto">
        <div className="max-w-[400px] w-full ml-auto space-y-8 bg-transparent p-0 relative z-10">
        <div className="space-y-3">
          <div className="uppercase inline-block mb-2 border border-[#D4A435] text-[#D4A435] text-[10px] tracking-[2px] px-2 py-0.5">
            Sign Up
          </div>
          <h1 className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white leading-tight">
            {existingProfile ? "Registration Submitted" : "Complete Registration"}
          </h1>
          <div className="w-16 h-[1px] bg-[#D4A435] opacity-50"></div>
          {existingProfile ? (
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
