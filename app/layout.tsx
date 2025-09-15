export const metadata = { title: 'Somov Production', description: 'Портфолио — Somov Production' }
import './globals.css'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="ru"><body>{children}</body></html>)
}
