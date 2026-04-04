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
    redirect("/");
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
      <div className="pt-40 pb-20 px-6 min-h-screen text-center flex flex-col items-center justify-center">
        <h1 className="text-3xl font-light tracking-widest uppercase text-white mb-6">Profile Not Found</h1>
        <p className="text-zinc-500 mb-8 max-w-md text-sm leading-relaxed">You haven't completed your registration yet. Please provide your details to access your FEM PRODUCTION profile.</p>
        <Link href="/register" className="px-8 py-3 bg-[#f3c5ae] text-black text-xs uppercase tracking-[2px] font-medium hover:bg-[#e0a585] transition-colors shadow-[0_0_15px_rgba(212,164,53,0.3)]">
          Complete Registration
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10 flex flex-col space-y-2">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-white">
            Artist <span className="text-[#f3c5ae]">Profile</span>
          </h1>
          <div className="w-16 h-[1px] bg-[#f3c5ae] opacity-50"></div>
        </div>

        <div className="overflow-hidden bg-black border border-[#f3c5ae]/30 shadow-2xl relative">
          
          <div className="md:flex">
            {/* Left Sidebar Profile Card */}
            <div className="md:w-1/3 bg-zinc-950/50 p-8 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-[#f3c5ae]/30 relative">
              
              <div className="absolute top-4 left-4">
                <div className={`uppercase inline-block border text-[9px] tracking-[2px] px-2 py-0.5 ${
                  profile.status === 'approved' ? 'border-green-500 text-green-500 bg-green-500/10' :
                  profile.status === 'declined' ? 'border-red-500 text-red-500 bg-red-500/10' :
                  'border-[#f3c5ae] text-[#f3c5ae] bg-[#f3c5ae]/10'
                }`}>
                  {profile.status === 'approved' ? "Approved" : 
                   profile.status === 'declined' ? "Declined" : "Under Review"}
                </div>
              </div>

              <div className="mt-8 mb-6">
                {user.avatar ? (
                  <img src={user.avatar} alt="Profile" className="w-36 h-36 rounded-full border border-[#f3c5ae] object-cover p-1 shadow-[0_0_20px_rgba(212,164,53,0.15)]" />
                ) : (
                  <div className="w-36 h-36 rounded-full bg-black border border-[#f3c5ae] flex items-center justify-center text-4xl font-light text-[#f3c5ae] tracking-widest uppercase p-1 shadow-[0_0_20px_rgba(212,164,53,0.15)]">
                    {profile.name[0]}
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl text-white font-light tracking-widest uppercase">{profile.name}</h2>
              <p className="text-[#f3c5ae] text-xs tracking-[2px] uppercase mt-2">{profile.category || "General Artist"}</p>
              
              <div className="mt-auto pt-10 w-full flex flex-col gap-3">
                <Link href="/register" className="text-[10px] uppercase tracking-[3px] border border-[#f3c5ae]/50 text-[#f3c5ae] py-3 hover:bg-[#f3c5ae] hover:text-black transition-all w-full inline-block text-center">
                  Edit Profile
                </Link>
              </div>
            </div>
            
            {/* Right Side Content Info */}
            <div className="md:w-2/3 p-8 md:p-12 space-y-10 bg-black">
              
              {/* Bio Section */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae] mb-4 flex items-center gap-4">
                  Professional Bio
                  <div className="h-[1px] bg-[#f3c5ae]/20 flex-1"></div>
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {profile.bio || <span className="italic text-zinc-600">No bio provided.</span>}
                </p>
              </div>

              {/* Grid Demographics */}
              <div>
                <h3 className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae] mb-6 flex items-center gap-4">
                  Personal Details
                  <div className="h-[1px] bg-[#f3c5ae]/20 flex-1"></div>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-zinc-500 mb-2">Age</p>
                    <p className="text-lg text-white font-light">{profile.age || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-zinc-500 mb-2">Gender</p>
                    <p className="text-lg text-white font-light capitalize">{profile.gender || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-zinc-500 mb-2">Date of Birth</p>
                    <p className="text-lg text-white font-light">{profile.dob || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[2px] text-zinc-500 mb-2">Contact Email</p>
                    <p className="text-sm md:text-lg text-white font-light truncate">{profile.email}</p>
                  </div>
                </div>
              </div>

              {/* Links Section */}
              {(profile.social_link || profile.portfolio_link) && (
                <div>
                   <h3 className="text-[10px] uppercase tracking-[3px] text-[#f3c5ae] mb-6 flex items-center gap-4">
                    Links & Portfolio
                    <div className="h-[1px] bg-[#f3c5ae]/20 flex-1"></div>
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {profile.social_link && (
                      <a href={profile.social_link.startsWith('http') ? profile.social_link : `https://${profile.social_link}`} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-[#f3c5ae]/50 text-white text-[10px] uppercase tracking-[2px] transition-colors flex items-center gap-2">
                        Social Media
                        <span className="text-[#f3c5ae]">↗</span>
                      </a>
                    )}
                    {profile.portfolio_link && (
                      <a href={profile.portfolio_link.startsWith('http') ? profile.portfolio_link : `https://${profile.portfolio_link}`} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-[#f3c5ae]/50 text-white text-[10px] uppercase tracking-[2px] transition-colors flex items-center gap-2">
                        Portfolio
                        <span className="text-[#f3c5ae]">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
