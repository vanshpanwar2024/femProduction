import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VogueEvents | Fashion Events Co.',
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
        <Navbar isAuthenticated={isAuthenticated} />
        <main className="flex-1">{children}</main>
        <footer className="w-full text-center py-6 text-sm text-zinc-500 border-t border-zinc-900 mt-20">
          © {new Date().getFullYear()} VogueEvents. Dark Aesthetic Fashion.
        </footer>
      </body>
    </html>
  );
}
