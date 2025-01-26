'use client'

import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6">
        <button onClick={onClose} className="absolute top-4 right-4">Close</button>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-neutral-900 hover:text-neutral-600 hover:bg-neutral-100"
              >
                Accueil
              </Link>
            </li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
} 