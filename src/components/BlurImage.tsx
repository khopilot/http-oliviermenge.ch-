'use client'

import Image from 'next/image'
import { useState } from 'react'

type BlurImageProps = {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
}

export default function BlurImage({ src, alt, className = '', fill = false, sizes }: BlurImageProps) {
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <Image
      src={error ? '/images/placeholder.jpg' : src}
      alt={alt}
      className={`
        duration-700 ease-in-out
        ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        ${className}
      `}
      fill={fill}
      sizes={sizes}
      onLoadingComplete={() => setLoading(false)}
      onError={() => setError(true)}
      priority={true}
    />
  )
} 