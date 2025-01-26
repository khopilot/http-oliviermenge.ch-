'use client'

import { useState } from 'react'
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import MobileMenu from '@/components/MobileMenu'
import "./globals.css";
import Link from 'next/link'
import Image from 'next/image'

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ['300', '400', '500', '600']
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <title>Olivier Menge - Artist Portfolio</title>
        <meta name="description" content="Discover the artistic works of Olivier Menge - Bronze sculptures, wood carvings, and lithographs" />
      </head>
      <body className="bg-neutral-50 text-neutral-900">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src="/images/logo-arbre.png"
                    alt="Logo"
                    width={50}
                    height={50}
                    className="mr-2"
                  />
                </Link>
              </div>
              <div className="hidden sm:block">
                <div className="flex space-x-8 font-montserrat text-sm">
                  <a href="/gallery" className="hover:text-neutral-600 transition-colors">Gallery</a>
                  <a href="/exhibitions" className="hover:text-neutral-600 transition-colors">Exhibitions</a>
                  <a href="/about" className="hover:text-neutral-600 transition-colors">About</a>
                  <a href="/contact" className="hover:text-neutral-600 transition-colors">Contact</a>
                </div>
              </div>
              <button 
                className="sm:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="pt-16">
          {children}
        </main>

        <footer className="mt-20 border-t border-neutral-200 py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <h3 className="font-cormorant text-xl mb-4">Contact</h3>
              <div className="font-montserrat text-sm text-neutral-600 space-y-2">
                <p>Email: contact@oliviermenge.ch</p>
                <p>Studio: By appointment only</p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-cormorant text-xl mb-4">Follow</h3>
              <div className="font-montserrat text-sm text-neutral-600 space-y-2">
                <a href="#" className="block hover:text-neutral-900 transition-colors">Instagram</a>
                <a href="#" className="block hover:text-neutral-900 transition-colors">Facebook</a>
              </div>
            </div>
            <div className="text-center md:text-right">
              <h3 className="font-cormorant text-xl mb-4">Visit</h3>
              <div className="font-montserrat text-sm text-neutral-600 space-y-2">
                <p>Switzerland</p>
                <p>© {new Date().getFullYear()} Olivier Menge</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
