"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user, existingProfile }: { user: any, existingProfile: any }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [acceptedLegalTerms, setAcceptedLegalTerms] = useState(false);

  const isRegistered = !!existingProfile;

  const [formData, setFormData] = useState({
    name: existingProfile?.name || user?.name || "",
    email: existingProfile?.email || user?.email || "",
    age: existingProfile?.age || "",
    dob: existingProfile?.dob || "",
    gender: existingProfile?.gender || "",
    category: existingProfile?.category || "",
    bio: existingProfile?.bio || "",
    socialLink: existingProfile?.social_link || "",
    portfolioLink: existingProfile?.portfolio_link || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (isRegistered) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegistered) return;

    if (!acceptedLegalTerms) {
      setErrorMsg("Please accept the legal terms before completing registration.");
      return;
    }

    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to save profile.");
      }

      setSuccessMsg("Registration saved successfully! Redirecting...");
      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      {errorMsg && (
        <div className="p-4 bg-red-950/20 border border-red-900/50 text-red-500 text-sm font-light tracking-wide">
          {errorMsg}
        </div>
      )}
      
      {successMsg && (
        <div className="p-4 bg-[#f3c5ae]/10 border border-[#f3c5ae]/50 text-[#f3c5ae] text-sm font-light tracking-wide">
          {successMsg}
        </div>
      )}

      <div className={`grid grid-cols-1 gap-6 ${isRegistered ? "opacity-60 pointer-events-none" : ""}`}>
        {/* Name */}
        <div className="space-y-2">
          <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="name">Full Name</label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            value={formData.name} 
            onChange={handleChange} 
            required
            disabled={isRegistered}
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors disabled:bg-zinc-900 disabled:text-zinc-500"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="email">Email Address</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email} 
            onChange={handleChange} 
            required
            disabled={isRegistered || !!user?.email}
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors disabled:bg-zinc-900 disabled:text-zinc-500"
          />
        </div>

        {/* Age and DOB Group */}
        <div className="flex gap-4">
          <div className="space-y-2 w-1/3">
            <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="age">Age</label>
            <input 
              type="number" 
              name="age" 
              id="age" 
              min="16" 
              max="99" 
              value={formData.age} 
              onChange={handleChange} 
              disabled={isRegistered}
              className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors disabled:bg-zinc-900 disabled:text-zinc-500"
            />
          </div>
          <div className="space-y-2 w-2/3">
            <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="dob">Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              id="dob" 
              value={formData.dob} 
              onChange={handleChange} 
              disabled={isRegistered}
              className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors uppercase disabled:bg-zinc-900 disabled:text-zinc-500"
            />
          </div>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="gender">Gender</label>
          <select 
            name="gender" 
            id="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            disabled={isRegistered}
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors appearance-none disabled:bg-zinc-900 disabled:text-zinc-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Other">Other / Prefer not to say</option>
          </select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="category">Category</label>
          <select 
            name="category" 
            id="category" 
            value={formData.category} 
            onChange={handleChange} 
            required
            disabled={isRegistered}
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors appearance-none disabled:bg-zinc-900 disabled:text-zinc-500"
          >
            <option value="">Select Category</option>
            <option value="Dancer">Dancer</option>
            <option value="Singer">Singer</option>
            <option value="Model">Model</option>
            <option value="Actor">Actor</option>
            <option value="Influencer">Influencer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Social Link */}
        <div className="space-y-2">
          <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="socialLink">Social Media Profile</label>
          <input 
            type="url" 
            name="socialLink" 
            id="socialLink" 
            placeholder="https://instagram.com/..." 
            value={formData.socialLink} 
            onChange={handleChange} 
            disabled={isRegistered}
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors disabled:bg-zinc-900 disabled:text-zinc-500"
          />
        </div>

        {/* Portfolio Link */}
        <div className="space-y-2">
          <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="portfolioLink">Portfolio Link</label>
          <input 
            type="url" 
            name="portfolioLink" 
            id="portfolioLink" 
            placeholder="https://yourportfolio.com" 
            value={formData.portfolioLink} 
            onChange={handleChange} 
            disabled={isRegistered}
            className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors disabled:bg-zinc-900 disabled:text-zinc-500"
          />
        </div>
      </div>

      {/* Bio */}
      <div className={`space-y-2 pt-2 ${isRegistered ? "opacity-60 pointer-events-none" : ""}`}>
        <label className="text-[10px] pb-1 mb-1 uppercase tracking-[3px] text-[#f3c5ae] block" htmlFor="bio">Professional Bio</label>
        <textarea 
          name="bio" 
          id="bio" 
          rows={4}
          placeholder="Tell us a bit about your experience and background..."
          value={formData.bio} 
          onChange={handleChange} 
          disabled={isRegistered}
          className="w-full bg-zinc-950 border border-zinc-700 px-4 py-3 text-white focus:outline-none focus:border-[#f3c5ae] focus:ring-1 focus:ring-[#f3c5ae]/50 transition-colors resize-none disabled:bg-zinc-900 disabled:text-zinc-500"
        ></textarea>
      </div>

      <div className={`flex items-start gap-3 ${isRegistered ? "opacity-60 pointer-events-none" : ""}`}>
        <input
          type="checkbox"
          id="legalTerms"
          checked={acceptedLegalTerms}
          onChange={(e) => setAcceptedLegalTerms(e.target.checked)}
          required
          disabled={isRegistered}
          className="mt-1 h-4 w-4 accent-[#f3c5ae]"
        />
        <label htmlFor="legalTerms" className="text-[11px] md:text-xs leading-relaxed text-zinc-300 cursor-pointer">
          I accept the legal terms and confirm that the information I provide is accurate.
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isRegistered || isLoading || !acceptedLegalTerms}
          className={`w-full md:w-auto px-8 py-4 uppercase tracking-widest text-sm font-medium transition-colors ${
            isRegistered 
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
              : "bg-[#f3c5ae] text-black hover:bg-white border border-transparent disabled:opacity-50"
          }`}
        >
          {isRegistered ? "Registration Under Review" : (isLoading ? "Saving..." : "Complete Registration")}
        </button>
      </div>
    </form>
  );
}
