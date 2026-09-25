import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Ақылды дүкендегі үш таңдау', description: '3-сыныпқа арналған ақша, сатып алу құны және қайтарымды есептеу ойыны.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="kk"><body>{children}</body></html>; }
