"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminTable({ initialProfiles }: { initialProfiles: any[] }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);
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
      console.error(error);
      alert("Failed to update status. Please make sure a 'status' column exists in your profiles table.");
    } finally {
      setLoadingId(null);
    }
  };

  if (profiles.length === 0) {
    return <div className="text-zinc-500 text-xs italic tracking-widest text-center py-10">No users registered yet.</div>;
  }

  return (
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
          {profiles.map((profile) => (
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
  );
}