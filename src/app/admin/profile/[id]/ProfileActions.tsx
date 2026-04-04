"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileActions({ profileId, currentStatus }: { profileId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpdateStatus = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: profileId, status }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to update status");
      }
    } catch (error) {
      alert("Failed to update status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 w-full md:w-auto">
      <button
        onClick={() => handleUpdateStatus('approved')}
        disabled={loading || currentStatus === 'approved'}
        className="flex-1 md:flex-none px-8 py-3 bg-zinc-900 border border-green-900 text-green-500 hover:bg-green-950/50 hover:text-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-xs uppercase tracking-widest transition-colors font-medium"
      >
        {loading ? 'Processing...' : 'Approve Application'}
      </button>
      <button
        onClick={() => handleUpdateStatus('declined')}
        disabled={loading || currentStatus === 'declined'}
        className="flex-1 md:flex-none px-8 py-3 bg-zinc-900 border border-red-900 text-red-500 hover:bg-red-950/50 hover:text-red-400 disabled:opacity-30 disabled:cursor-not-allowed text-xs uppercase tracking-widest transition-colors font-medium"
      >
        {loading ? 'Processing...' : 'Decline Application'}
      </button>
    </div>
  );
}
