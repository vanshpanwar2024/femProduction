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
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-12 bg-zinc-900 border border-zinc-800 p-8 md:p-12 shadow-2xl">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-white">
            {existingProfile ? "Registration Submitted" : "Complete Registration"}
          </h1>
          <div className="w-16 h-px bg-zinc-600"></div>
          {existingProfile ? (
            <div className="mt-6 p-4 bg-emerald-950/20 border border-emerald-900/50">
              <p className="text-emerald-400 text-sm tracking-wide">
                Thanks for registering! Our experts are currently reviewing your profile.
              </p>
            </div>
          ) : (
            <p className="text-zinc-400 mt-6 text-sm">
              Please complete your profile to register for events correctly.
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-6 pb-8 border-b border-zinc-800">
          {user.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full border-2 border-zinc-700 object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-3xl font-medium text-white tracking-widest uppercase">
              {user.name?.[0] || user.email?.[0] || "U"}
            </div>
          )}
          <div className="space-y-1">
            <h2 className="text-2xl text-white font-medium">{user.name}</h2>
            <p className="text-zinc-500 font-mono text-sm">{user.email}</p>
            <p className="text-zinc-400 text-xs uppercase tracking-widest pt-2">Role: {user.role}</p>
          </div>
        </div>

        <ProfileForm user={user} existingProfile={existingProfile} />

        <div className="pt-8 border-t border-zinc-800">
          <p className="text-zinc-500 italic text-xs">Connected via {user.provider === "google" ? "Google Authentication" : "Native Account"}.</p>
        </div>
      </div>
    </div>
  );
}
