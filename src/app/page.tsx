import Link from 'next/link'
import BlurImage from '@/components/BlurImage'
import artworksData from '@/data/artworks.json'

interface Artwork {
  id?: string;
  title: string;
  medium: string;
  image: string;
  description?: string;
}

export default function Home() {
  // Get one artwork of each medium for the categories section
  const categories = ['Bronze', 'Wood', 'Lithography', 'Sculpture', 'Mixed Media',].map(medium => {
    const artwork = (artworksData as Artwork[]).find(a => a.medium === medium)
    return {
      title: medium,
      image: artwork?.image || '/images/placeholder.jpg'
    }
  })

  // Get the latest artworks for the featured section
  const featuredArtworks = (artworksData as Artwork[]).slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <BlurImage
            src="/images/hero.jpg"
            alt="Featured artwork by Olivier Menge"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-light mb-6">
            Olivier Menge
          </h1>
          <p className="font-montserrat text-lg md:text-xl font-light tracking-wide">
            Exploring form and texture through bronze, wood, and lithography
          </p>
          <Link
            href="/gallery"
            className="inline-block mt-8 px-8 py-3 border-2 border-white text-white font-montserrat
              hover:bg-white hover:text-neutral-900 transition-colors duration-300"
          >
            View Gallery
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-cormorant text-4xl mb-12 text-center">Explore by Medium</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(category => (
              <Link
                key={category.title}
                href={`/gallery?medium=${category.title.toLowerCase()}`}
                className="group relative aspect-square overflow-hidden"
              >
                <BlurImage
                  src={category.image.startsWith('/') ? category.image : `/${category.image}`}
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="font-cormorant text-3xl text-white">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-cormorant text-4xl mb-12 text-center">Featured Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, i) => (
              <Link
                key={i}
                href={`/gallery?artwork=${artwork.id}`}
                className="group relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-lg"
              >
                <BlurImage
                  src={artwork.image.startsWith('/') ? artwork.image : `/${artwork.image}`}
                  alt={artwork.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="font-cormorant text-2xl mb-2">{artwork.title}</h3>
                    <p className="font-montserrat text-sm">{artwork.medium}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/gallery"
              className="inline-block px-8 py-3 bg-neutral-900 text-white font-montserrat text-sm
                hover:bg-neutral-800 transition-colors rounded-lg"
            >
              View All Works
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-cormorant text-4xl mb-6">Interested in a Piece?</h2>
          <p className="font-montserrat text-neutral-600 mb-8">
            Get in touch to learn more about the artworks or to schedule a studio visit.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-neutral-900 text-white font-montserrat text-sm
              hover:bg-neutral-800 transition-colors rounded-lg"
          >
            Contact
          </Link>
        </div>
      </section>
    </div>
  )
}
