import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import AdminLogin from "./AdminLogin";
import AdminTable from "./AdminTable";
import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  let isAdmin = false;

  if (token) {
    const payload = await decrypt(token);
    // simple check to verify this is indeed our admin role token
    if (payload && payload.role === "admin") {
      isAdmin = true;
    }
  }

  // If not authenticated as an admin, show the standalone login component.
  if (!isAdmin) {
    return <AdminLogin />;
  }

  // Fetch true registration data from Supabase
  let profiles: any[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false });
    
    if (data) {
      profiles = data;
    }
  }

  const totalRegistrations = profiles.length;
  // Calculate pending dynamically based on status column (if falsy or "pending")
  const pendingApprovals = profiles.filter(p => !p.status || p.status === 'pending').length;
  // Calculate unique categories dynamically
  const uniqueCategories = new Set(profiles.map(p => p.category).filter(Boolean)).size;

  // THE SECURE DASHBOARD ONLY VISIBLE AFTER ADMIN LOGIN
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen relative z-10 max-w-[1400px] mx-auto flex flex-col items-center">
      
      <div className="w-full space-y-6">
        <h2 className="text-3xl md:text-4xl font-light tracking-widest uppercase text-white leading-tight">
          Admin <span className="text-[#D4A435]">Dashboard</span>
        </h2>
        <div className="w-32 h-[1px] bg-[#D4A435] opacity-50 mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 border border-[#D4A435]/30 bg-black/40 hover:bg-[#D4A435]/10 transition-colors cursor-default text-center space-y-3">
             <h3 className="text-[#D4A435] tracking-widest uppercase text-[10px]">Total Registrations</h3>
             <p className="text-4xl font-light text-white">{totalRegistrations}</p>
          </div>
          <div className="p-8 border border-[#D4A435]/30 bg-black/40 hover:bg-[#D4A435]/10 transition-colors cursor-default text-center space-y-3">
             <h3 className="text-[#D4A435] tracking-widest uppercase text-[10px]">Pending Approvals</h3>
             <p className="text-4xl font-light text-white">{pendingApprovals}</p>
          </div>
          <div className="p-8 border border-[#D4A435]/30 bg-black/40 hover:bg-[#D4A435]/10 transition-colors cursor-default text-center space-y-3">
             <h3 className="text-[#D4A435] tracking-widest uppercase text-[10px]">Active Categories</h3>
             <p className="text-4xl font-light text-white">{uniqueCategories}</p>
          </div>
        </div>

        <div className="mt-12 p-4 md:p-8 border border-zinc-800 bg-zinc-950/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between border-b border-zinc-800 pb-4 mb-6">
            <h3 className="text-white uppercase tracking-widest text-sm mb-4 md:mb-0">Recent Applications</h3>
          </div>
          
          <div className="w-full">
            <AdminTable initialProfiles={profiles} />
          </div>
        </div>

      </div>
    </div>
  );
}