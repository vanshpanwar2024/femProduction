import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProfileActions from "./ProfileActions";
import Link from "next/link";

export default async function AdminProfilePage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  let isAdmin = false;

  if (token) {
    const payload = await decrypt(token);
    if (payload && payload.role === "admin") {
      isAdmin = true;
    }
  }

  if (!isAdmin) {
    redirect("/admin");
  }

  const { id } = await params;

  let profile = null;
  if (supabase) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (data) {
      profile = data;
    }
  }

  if (!profile) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen relative z-10 max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl text-white tracking-widest uppercase">Profile Not Found</h1>
        <Link href="/admin" className="inline-block text-[#f3c5ae] uppercase tracking-widest text-sm hover:underline">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10 max-w-4xl mx-auto flex flex-col items-center">
      <div className="w-full mb-8 flex items-center justify-between">
        <Link href="/admin" className="text-zinc-400 hover:text-[#f3c5ae] text-xs uppercase tracking-[3px] transition-colors flex items-center gap-2">
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>

      <div className="w-full bg-zinc-950 border border-zinc-800 shadow-2xl relative overflow-hidden">
        {/* Status Header */}
        <div className={`w-full h-2 ${
          profile.status === 'approved' ? 'bg-green-500' :
          profile.status === 'declined' ? 'bg-red-500' :
          'bg-[#f3c5ae]'
        }`} />
        
        <div className="p-8 md:p-12 space-y-12">
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
            <div>
              <div className={`uppercase inline-block mb-4 border text-[10px] tracking-[2px] px-3 py-1 ${
                profile.status === 'approved' ? 'border-green-500 text-green-500 bg-green-500/10' :
                profile.status === 'declined' ? 'border-red-500 text-red-500 bg-red-500/10' :
                'border-[#f3c5ae] text-[#f3c5ae] bg-[#f3c5ae]/10'
              }`}>
                Status: {profile.status ? profile.status : 'Pending Review'}
              </div>
              <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-white leading-tight">
                {profile.name}
              </h2>
              <p className="text-zinc-400 mt-2 tracking-wide">{profile.email}</p>
            </div>
            
            <ProfileActions profileId={profile.id} currentStatus={profile.status || 'pending'} />
          </div>

          <div className="w-full h-[1px] bg-zinc-800"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="space-y-2 text-sm">
              <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Age</p>
              <p className="text-white text-lg font-light">{profile.age || "N/A"}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Date of Birth</p>
              <p className="text-white text-lg font-light">{profile.dob ? new Date(profile.dob).toLocaleDateString() : "N/A"}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Gender</p>
              <p className="text-white text-lg font-light capitalize">{profile.gender || "N/A"}</p>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Category</p>
              <p className="text-white text-lg font-light capitalize">{profile.category || "N/A"}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Artist Bio</p>
            <div className="bg-black/50 border border-zinc-800 p-6 rounded-sm">
              <p className="text-zinc-300 font-light leading-relaxed whitespace-pre-wrap">
                {profile.bio || "No bio provided."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {profile.social_link && (
              <div className="space-y-2">
                <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Social Profile</p>
                <a href={profile.social_link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#f3c5ae] text-sm break-all border-b border-zinc-700 pb-1 inline-block transition-colors">
                  {profile.social_link}
                </a>
              </div>
            )}
            
            {profile.portfolio_link && (
              <div className="space-y-2">
                <p className="text-[#f3c5ae] text-[10px] uppercase tracking-[3px]">Portfolio / Video Link</p>
                <a href={profile.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#f3c5ae] text-sm break-all border-b border-zinc-700 pb-1 inline-block transition-colors">
                  {profile.portfolio_link}
                </a>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
