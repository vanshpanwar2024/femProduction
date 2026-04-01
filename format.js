const fs = require('fs');
let form = fs.readFileSync('src/app/register/ProfileForm.tsx', 'utf8');

// Ensure inputs look good
form = form.replace(/className="w-full bg-black border border-\[#D4A435\]\/30 p-3 text-white focus:outline-none focus:border-\[#D4A435\] focus:ring-1 focus:ring-\[#D4A435\]\/50 transition-all duration-300 placeholder-zinc-700"/g, 
  'className="w-full bg-black border border-[#D4A435]/30 p-3 text-white focus:outline-none focus:border-[#D4A435] focus:ring-1 focus:ring-[#D4A435]/50 transition-all duration-300 placeholder-zinc-700 rounded-none bg-black/50 backdrop-blur-sm"');

// Ensure labels look good
form = form.replace(/className="text-xs uppercase tracking-widest text-\[#D4A435\]"/g,
  'className="text-[10px] pb-1 mb-1 block uppercase tracking-[3px] text-[#D4A435]/80 font-medium"');

fs.writeFileSync('src/app/register/ProfileForm.tsx', form);
