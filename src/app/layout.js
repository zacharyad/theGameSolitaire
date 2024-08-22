import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'The Game',
  description: 'A Number Placing Game',
};

export default function RootLayout({ children }) {
  return (
    <html className="" lang="en">
      <body
        className={`flex min-h-screen flex-col items-center justify-between`}
      >
        {children}
      </body>
    </html>
  );
}
