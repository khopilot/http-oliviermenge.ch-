'use client'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Olivier Menge. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href="mailto:contact@oliviermenge.ch"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              contact@oliviermenge.ch
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 