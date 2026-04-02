"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export default function AdminTable({ initialProfiles }: { initialProfiles: any[] }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "declined">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleUpdateStatus = async (id: string, status: string) => {
    setLoadingId(id);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setProfiles((prev) => 
          prev.map((p) => p.id === id ? { ...p, status } : p)
        );
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to update status");
      }
    } catch (error) {
      alert("Failed to update status. Please make sure a 'status' column exists in your profiles table.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      // 1. Status Filter
      const statusMatch = 
        filterStatus === "all" ? true :
        filterStatus === "pending" ? (!p.status || p.status === "pending") :
        p.status === filterStatus;
      
      // 2. Search Query Filter (Name or Email)
      const searchLower = searchQuery.toLowerCase();
      const stringMatches = 
        (p.name?.toLowerCase() || "").includes(searchLower) || 
        (p.email?.toLowerCase() || "").includes(searchLower) ||
        (p.category?.toLowerCase() || "").includes(searchLower);

      return statusMatch && stringMatches;
    });
  }, [profiles, filterStatus, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950/50 p-4 border border-[#D4A435]/30">
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {(["all", "pending", "approved", "declined"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest border transition-colors whitespace-nowrap ${
                filterStatus === status 
                  ? "border-[#D4A435] bg-[#D4A435]/10 text-[#D4A435]" 
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="w-full md:w-64 relative">
          <input 
            type="text" 
            placeholder="Search by name, email or category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-2.5 focus:outline-none focus:border-[#D4A435] focus:ring-1 focus:ring-[#D4A435]/50 transition-colors placeholder:text-zinc-600 tracking-wide"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -transform-y-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#D4A435]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredProfiles.length === 0 ? (
        <div className="text-zinc-500 text-xs italic tracking-widest text-center py-10 border border-zinc-800 bg-zinc-950/30">
          No records found matching your filters.
        </div>
      ) : (
        <div className="overflow-x-auto border border-zinc-800">
          <table className="w-full text-left text-sm text-zinc-400">
            <thead className="bg-[#D4A435]/10 text-[#D4A435] text-[10px] uppercase tracking-widest border-b border-[#D4A435]/30">
              <tr>
                <th className="px-6 py-4 font-medium">Name / Email</th>
                <th className="px-6 py-4 font-medium hidden md:table-cell">Age & DOB</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Category</th>
                <th className="px-6 py-4 font-medium hidden lg:table-cell">Links</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-zinc-950/50">
              {filteredProfiles.map((profile) => (
                <tr key={profile.id} className="hover:bg-zinc-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium text-xs md:text-sm">{profile.name}</div>
                    <div className="text-[10px] text-zinc-500">{profile.email}</div>
                  </td>
              <td className="px-6 py-4 hidden md:table-cell">
                <div className="text-zinc-300 text-xs">{profile.age || "-"} yrs</div>
                <div className="text-[10px] text-zinc-500">{profile.dob || "-"}</div>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell">
                <span className="inline-block px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] rounded uppercase tracking-wider">
                  {profile.category || "-"}
                </span>
              </td>
              <td className="px-6 py-4 hidden lg:table-cell space-y-1">
                {profile.socialLink && (
                  <a href={profile.socialLink} target="_blank" rel="noreferrer" className="block text-[10px] text-[#D4A435] hover:underline underline-offset-2">Social</a>
                )}
                {profile.portfolioLink && (
                  <a href={profile.portfolioLink} target="_blank" rel="noreferrer" className="block text-[10px] text-[#D4A435] hover:underline underline-offset-2">Portfolio</a>
                )}
                {!profile.socialLink && !profile.portfolioLink && "-"}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-medium tracking-widest rounded-full border border-opacity-50 ${
                  profile.status === 'approved' 
                    ? 'text-green-400 bg-green-950/20 border-green-500/30'
                    : profile.status === 'declined'
                    ? 'text-red-400 bg-red-950/20 border-red-500/30'
                    : 'text-zinc-400 bg-zinc-800 border-zinc-700'
                }`}>
                  <span className={`w-1 h-1 rounded-full ${
                    profile.status === 'approved' ? 'bg-green-500' : profile.status === 'declined' ? 'bg-red-500' : 'bg-zinc-500'
                  }`}></span>
                  {profile.status || "Pending"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleUpdateStatus(profile.id, 'approved')}
                    disabled={loadingId === profile.id || profile.status === 'approved'}
                    className="px-3 py-1.5 bg-zinc-900 border border-green-900 text-green-500 hover:bg-green-950/50 hover:text-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-[10px] uppercase tracking-widest transition-colors"
                  >
                    {loadingId === profile.id ? '...' : 'Approve'}
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(profile.id, 'declined')}
                    disabled={loadingId === profile.id || profile.status === 'declined'}
                    className="px-3 py-1.5 bg-zinc-900 border border-red-900 text-red-500 hover:bg-red-950/50 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed text-[10px] uppercase tracking-widest transition-colors"
                  >
                    {loadingId === profile.id ? '...' : 'Decline'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      )}
    </div>
  );
}