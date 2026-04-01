const fs = require('fs');
let fileContent = fs.readFileSync('src/app/register/page.tsx', 'utf8');

const oldStart = `<div className="pt-32 pb-20 px-6 min-h-screen relative z-10 overflow-hidden">
      {/* Fixed Background Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <span className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif text-white/[0.05] tracking-[0.2em] uppercase whitespace-nowrap select-none">
          FEM HOUSE
        </span>
      </div>

      <div className="max-w-3xl mx-auto space-y-12 bg-black border border-[#D4A435]/30 p-8 md:p-12 shadow-[0_0_40px_rgba(212,164,53,0.15)] relative z-10">`;

const newStart = `<div className="pt-32 pb-20 px-6 min-h-screen relative z-10 overflow-hidden max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20">
      
      {/* Left Text Empty Space */}
      <div className="w-full md:w-5/12 pt-0 md:pt-12">
        {/* ADD YOUR TEXT HERconst fs = require('div>

    let fileContent = fs.rea
 
const oldStart = `<div className="pt-32 pb-20 px-6 min-h-screen relatsNa      {/* Fixed Background Watermark */}
      <div className="fixed inset-0 flex items-center=       <div className="fixed inset-0 fle;
        <span className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-serif text-white/[0.05className="text-z          FEM HOUSE
        </span>
      </div>

      <div className="max-w-3xl mx-auto space-y-12 bg-black border border-[#D4A435]/30 p-8 md:p-12 shaddi        </span>
          `;

const 
      <divdiv
const newStart = `<div className="pt-32 pb-20 px-6 min-h-screen relative z-10 overflow-hidden max-w-7xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-20use      
      {/* Left Text Empty Space */}
      <div className="w-full md:w-5/12 pt-0 md:pt-12">
        {/* ADD YOUR TEXT HERconst fs = require('div>

  nt  eplac      <div classNa

fs.writeFileSync        {/* ADD YOURage.tsx', fileContent);
