import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
export const metadata: Metadata = {
  title: 'MyEvents',
  description: 'MyEvents.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <nav>
            <Navbar />
          </nav>
          {children}
        </Provider>
      </body>
    </html>
  );
}
