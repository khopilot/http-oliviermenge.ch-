'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import artworksData from '@/data/artworks.json'
import BlurImage from '@/components/BlurImage'
import ZoomableImage from '@/components/ZoomableImage'

type Artwork = {
  id: string
  title: string
  medium: string
  image: string
  description?: string
}

// Get unique mediums from artworks data
const mediums = ['All', ...new Set(artworksData.map(artwork => artwork.medium))]

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null)
  const [artworks, setArtworks] = useState<Artwork[]>([])

  useEffect(() => {
    // Filter out artworks without required fields and ensure proper image paths
    const validArtworks = (artworksData as Artwork[])
      .filter(artwork => artwork.title && artwork.image && artwork.medium)
      .map(artwork => ({
        ...artwork,
        id: artwork.id || artwork.title.toLowerCase().replace(/\s+/g, '-'),
        image: artwork.image.startsWith('/') ? artwork.image : `/${artwork.image}`
      }))
    setArtworks(validArtworks)
  }, [])

  const filteredArtworks = activeFilter === 'All'
    ? artworks
    : artworks.filter(artwork => artwork.medium === activeFilter)

  return (
    <div className="min-h-screen bg-neutral-50 pt-8">
      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="font-cormorant text-5xl mb-8 text-center">Gallery</h1>
        <div className="flex justify-center space-x-4 flex-wrap gap-y-2">
          {mediums.map(filter => (
            <motion.button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-montserrat text-sm px-6 py-2 rounded-full transition-colors
                ${activeFilter === filter
                  ? 'bg-neutral-900 text-white'
                  : 'bg-transparent text-neutral-600 hover:bg-neutral-200'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredArtworks.map(artwork => (
              <motion.div
                key={artwork.id}
                layoutId={artwork.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`group relative cursor-pointer bg-neutral-100 rounded-lg overflow-hidden
                  ${artwork.medium === 'Painting' ? 'aspect-[4/3]' : 
                    artwork.medium === 'Lithography' ? 'aspect-square' : 
                    artwork.medium === 'Bronze' ? 'aspect-[3/4]' : 
                    artwork.medium === 'Wood' ? 'aspect-[3/4]' : 'aspect-[3/4]'}
                  h-[400px]`}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <div className="absolute inset-0 w-full h-full">
                  <BlurImage
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority={artwork.medium === activeFilter || activeFilter === 'All'}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-cormorant text-2xl mb-2">{artwork.title}</h3>
                    <p className="font-montserrat text-sm opacity-90">{artwork.medium}</p>
                    {artwork.description && (
                      <p className="font-montserrat text-xs mt-2 opacity-75">{artwork.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Artwork Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full bg-white p-8 rounded-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className={`relative w-full
                  ${selectedArtwork.medium === 'Painting' ? 'aspect-[4/3]' : 
                    selectedArtwork.medium === 'Lithography' ? 'aspect-square' : 
                    selectedArtwork.medium === 'Bronze' ? 'aspect-[3/4]' : 
                    selectedArtwork.medium === 'Wood' ? 'aspect-[3/4]' : 'aspect-[3/4]'}`}
                >
                  <ZoomableImage
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                  />
                </div>
                <div>
                  <h2 className="font-cormorant text-4xl mb-4">{selectedArtwork.title}</h2>
                  <p className="font-montserrat text-neutral-600 mb-4">{selectedArtwork.medium}</p>
                  {selectedArtwork.description && (
                    <p className="font-montserrat text-neutral-600">{selectedArtwork.description}</p>
                  )}
                </div>
              </div>
              <button
                className="absolute top-4 right-4 text-neutral-500 hover:text-neutral-900"
                onClick={() => setSelectedArtwork(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 