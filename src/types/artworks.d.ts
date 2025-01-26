declare module '@/data/artworks.json' {
  interface Artwork {
    id: string
    title: string
    medium: string
    year?: number
    dimensions?: string
    image: string
    description?: string
  }

  const artworks: Artwork[]
  export default artworks
} 