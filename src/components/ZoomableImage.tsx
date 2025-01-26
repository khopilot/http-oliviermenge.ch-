'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type ZoomableImageProps = {
  src: string
  alt: string
  onClose?: () => void
}

export default function ZoomableImage({ src, alt, onClose }: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false)
          setScale(1)
          setPosition({ x: 0, y: 0 })
        } else if (onClose) {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isZoomed, onClose])

  const handleWheel = (e: React.WheelEvent) => {
    if (!isZoomed) return

    e.preventDefault()
    const delta = e.deltaY * -0.01
    const newScale = Math.min(Math.max(1, scale + delta), 4)
    setScale(newScale)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomed || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setPosition({
      x: (0.5 - x) * rect.width * (scale - 1),
      y: (0.5 - y) * rect.height * (scale - 1)
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-zoom-in"
      onClick={() => !isZoomed && setIsZoomed(true)}
      onWheel={handleWheel}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isZoomed && setPosition({ x: 0, y: 0 })}
    >
      <motion.div
        animate={{
          scale: isZoomed ? scale : 1,
          x: isZoomed ? position.x : 0,
          y: isZoomed ? position.y : 0
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsZoomed(false)
              setScale(1)
              setPosition({ x: 0, y: 0 })
            }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-montserrat text-white/70 pointer-events-none">
        {isZoomed ? 'Use mouse wheel to zoom, move mouse to pan' : 'Click to zoom'}
      </div>
    </div>
  )
} 