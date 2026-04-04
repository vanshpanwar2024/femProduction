import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FEM PRODUCTION | Fashion & Events',
  description: 'Aesthetic fashion event planner and showcase.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const user = session ? await decrypt(session) : null;
  const isAuthenticated = !!user;

  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-zinc-950 text-neutral-50 min-h-screen flex flex-col antialiased`}>
        <Navbar isAuthenticated={isAuthenticated} user={user as any} />
        <main className="flex-1">{children}</main>
        <footer className="w-full relative mt-auto border-t border-zinc-900 bg-black/60 backdrop-blur-xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {/* Brand Section */}
              <div className="space-y-6">
                <Image 
                  src="/new-logo.png" 
                  alt="Fem Production Logo" 
                  width={240} 
                  height={80} 
                  className="w-auto h-20 md:h-28 object-contain"
                />
                <p className="text-zinc-400 font-light leading-relaxed max-w-sm">
                  A dynamic platform providing a prestigious stage for artists to showcase their unique talents and compete in their respective fields.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h4 className="uppercase inline-block border border-[#f3c5ae] text-[#f3c5ae] text-[10px] tracking-[3px] px-2 py-1">
                  Contact Us
                </h4>
                <div className="space-y-4 text-zinc-300 font-light text-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-[#f3c5ae] text-lg mt-0.5">●</span>
                    <p className="leading-relaxed">
                      <strong className="text-white font-medium block mb-1">Head Office</strong>
                      613A, Tower-C,<br />
                      KLJ Noida One, Sector 62,<br />
                      Noida
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#f3c5ae] text-lg">●</span>
                    <p className="tracking-widest">+91 9217640015, +91 9211119942</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[#f3c5ae] text-lg">●</span>
                    <a href="mailto:info@femproduction.in" className="hover:text-[#f3c5ae] transition-colors duration-300">
                      info@femproduction.in
                    </a>
                  </div>
                </div>
              </div>

              {/* Legal / Actions */}
              <div className="space-y-6 flex flex-col items-start md:items-end md:text-right">
                <h4 className="uppercase inline-block border border-[#f3c5ae] text-[#f3c5ae] text-[10px] tracking-[3px] px-2 py-1">
                  Legal
                </h4>
                <p className="text-zinc-400 font-light text-sm max-w-[250px]">
                  Your privacy matters to us. Learn more about how we protect your data.
                </p>
                <Link 
                  href="/privacy-policy" 
                  className="inline-block mt-4 px-6 py-3 border border-zinc-700 text-zinc-300 font-medium hover:border-[#f3c5ae] hover:text-[#f3c5ae] bg-black/40 hover:bg-[#f3c5ae]/10 transition-all duration-300 tracking-widest uppercase text-[11px]"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-zinc-500 tracking-widest">
              <p>© {new Date().getFullYear()} FEM PRODUCTION. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
