'use client'

import { useState } from 'react'
import Navigation from './Navigation'
import MobileMenu from './MobileMenu'
import Footer from './Footer'

export default function ClientLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <Navigation onMenuClick={() => setIsMobileMenuOpen(true)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      {children}
      <Footer />
    </>
  )
} 