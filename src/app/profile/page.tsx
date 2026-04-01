import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const user = session ? await decrypt(session) : null;

  if (!user) {
    redirect("/login");
  }

  let profile = null;
  if (supabase) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', user.email)
      .single();
    
    if (data) {
      profile = data;
    }
  }

  if (!profile) {
    return (
      <div className="pt-40 pb-20 px-6 min-h-screen text-center">
        <h1 className="text-3xl font-light tracking-widest uppercase text-white mb-6">Profile Not Found</h1>
        <p className="text-zinc-500 mb-8">You haven't completed your registration yet.</p>
        <Link href="/register" className="px-8 py-3 bg-white text-black text-sm uppercase tracking-widest font-medium hover:bg-zinc-200 transition-colors">
          Complete Registration
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="md:flex">
          <div className="md:w-1/3 bg-zinc-950 p-8 flex flex-col items-center justify-center border-r border-zinc-800 text-center">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-32 h-32 rounded-full border-4 border-zinc-800 object-cover mb-4" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-zinc-800 border-4 border-zinc-700 flex items-center justify-center text-4xl font-medium text-white tracking-widest uppercase mb-4">
                {profile.name[0]}
              </div>
            )}
            <h1 className="text-2xl text-white font-medium tracking-wide">{profile.name}</h1>
            <p className="text-zinc-500 text-sm mt-1">{profile.category || "General Member"}</p>
            <div className="mt-8 pt-8 border-t border-zinc-800 w-full flex flex-col gap-3">
              <Link href="/register" className="text-xs uppercase tracking-widest border border-zinc-700 text-zinc-300 py-2 hover:bg-white hover:text-black transition-colors w-full inline-block">
                Edit Profile
              </Link>
            </div>
          </div>
          
          <div className="md:w-2/3 p-8 md:p-12 space-y-8">
            <div>
              <h2 className="text-sm uppercase tracking-widest text-zinc-500 mb-6">About Me</h2>
              <p className="text-zinc-300 leading-relaxed font-light">
                {profile.bio || <span className="italic text-zinc-600">No bio provided.</span>}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-zinc-800">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Age</p>
                <p className="text-lg text-white font-light">{profile.age || "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Gender</p>
                <p className="text-lg text-white font-light">{profile.gender || "—"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Date of Birth</p>
                <p className="text-lg text-white font-light">{profile.dob || "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-1">Contact Email</p>
                <p className="text-lg text-white font-light">{profile.email}</p>
              </div>
            </div>

            {(profile.social_link || profile.portfolio_link) && (
              <div className="pt-8 border-t border-zinc-800 flex gap-4">
                {profile.social_link && (
                  <a href={profile.social_link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs uppercase tracking-widest transition-colors">
                    Social Media
                  </a>
                )}
                {profile.portfolio_link && (
                  <a href={profile.portfolio_link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-zinc-700 hover:border-zinc-500 text-white text-xs uppercase tracking-widest transition-colors">
                    Portfolio
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
