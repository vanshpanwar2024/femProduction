export default function DashboardPage() {
  return (
    <div className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-white">Dashboard</h1>
          <div className="w-24 h-px bg-zinc-600"></div>
          <p className="text-zinc-400 mt-6">Welcome back to the VogueEvents administrative panel.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-8">
          <div className="p-8 bg-zinc-900 border border-zinc-800">
            <h3 className="text-xl uppercase tracking-wider text-white">Events</h3>
            <p className="text-4xl text-zinc-300 font-light mt-4">3</p>
            <p className="text-zinc-500 text-sm mt-2">Upcoming events this season</p>
          </div>
          <div className="p-8 bg-zinc-900 border border-zinc-800">
            <h3 className="text-xl uppercase tracking-wider text-white">Guestlist</h3>
            <p className="text-4xl text-zinc-300 font-light mt-4">1,402</p>
            <p className="text-zinc-500 text-sm mt-2">Registered attendees</p>
          </div>
          <div className="p-8 bg-zinc-900 border border-zinc-800">
            <h3 className="text-xl uppercase tracking-wider text-white">Press</h3>
            <p className="text-4xl text-zinc-300 font-light mt-4">42</p>
            <p className="text-zinc-500 text-sm mt-2">Pending approvals</p>
          </div>
        </div>
      </div>
    </div>
  );
}
