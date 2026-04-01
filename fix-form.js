const fs = require('fs');
let text = fs.readFileSync('src/app/register/ProfileForm.tsx', 'utf8');

text = text.replace(/bg-zinc-800 border border-zinc-700/g, 'bg-black border border-[#D4A435]/30');
text = text.replace(/focus:border-zinc-500/g, 'focus:border-[#D4A435] focus:ring-1 focus:ring-[#D4A435]/50');
text = text.replace(/text-zinc-400/g, 'text-[#D4A435]');
text = text.replace(/bg-white text-black py-4 uppercase tracking-widest text-sm font-medium hover:bg-zinc-200 transition-colors/g, 'bg-[#D4A435] text-black py-4 uppercase tracking-[4px] text-xs font-semibold hover:bg-white hover:text-black border border-transparent transition-all duration-500 mt-4');

fs.writeFileSync('src/app/register/ProfileForm.tsx', text);
