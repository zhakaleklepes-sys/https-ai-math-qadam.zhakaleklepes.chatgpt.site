import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'AI-MATH QADAM — Жеке математикалық оқу платформасы', description: 'Әр оқушының қатесін талдап, келесі оқу қадамын ұсынатын интеллектуалды математикалық платформа.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="kk"><body>{children}</body></html>; }
