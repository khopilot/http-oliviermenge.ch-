import './globals.css'
import { Montserrat, Cormorant_Garamond } from 'next/font/google'
import { metadata } from './metadata'
import ClientLayout from '@/components/ClientLayout'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700']
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
})

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ClientLayout>
          <main className="flex-grow">
            {children}
          </main>
        </ClientLayout>
      </body>
    </html>
  )
} 