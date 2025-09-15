import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Somov Production — Портфолио',
  description: 'Сайты, дизайн, видеомонтаж. Somov Production — портфолио Никиты.',
  metadataBase: new URL('https://example.com'),
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
