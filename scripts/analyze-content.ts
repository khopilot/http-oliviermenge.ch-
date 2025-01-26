const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const BACKUP_DIR = '../oliviermenge_backup'

interface ArtworkData {
  title: string
  medium: string
  year?: number
  dimensions?: string
  image: string
  description?: string
}

async function extractArtworkData(htmlFile: string): Promise<ArtworkData[]> {
  const content = await fs.promises.readFile(path.join(BACKUP_DIR, htmlFile), 'utf-8')
  const dom = new JSDOM(content)
  const document = dom.window.document

  const artworks: ArtworkData[] = []
  
  // Find all image elements that might be artworks
  const images = document.querySelectorAll('img')
  images.forEach((img: any) => {
    const src = img.getAttribute('src')
    if (!src) return
    
    // Extract data from surrounding elements
    const container = img.closest('div')
    if (!container) return

    const title = container.querySelector('h2, h3, h4')?.textContent || ''
    const description = container.querySelector('p')?.textContent || ''
    
    artworks.push({
      title: title.trim() || path.basename(src, path.extname(src)),
      medium: determineMedium(htmlFile, description),
      image: src,
      description: description.trim()
    })
  })

  return artworks
}

function determineMedium(filename: string, description: string): string {
  if (filename.includes('bronze')) return 'Bronze'
  if (filename.includes('bois')) return 'Wood'
  if (filename.includes('litho')) return 'Lithography'
  
  const lowerDesc = description.toLowerCase()
  if (lowerDesc.includes('bronze')) return 'Bronze'
  if (lowerDesc.includes('bois') || lowerDesc.includes('wood')) return 'Wood'
  if (lowerDesc.includes('litho')) return 'Lithography'
  
  return 'Other'
}

async function main() {
  const artworks: ArtworkData[] = []
  
  // Process all HTML files
  const files = await fs.promises.readdir(BACKUP_DIR)
  for (const file of files) {
    if (file.endsWith('.html')) {
      console.log(`Processing ${file}...`)
      const fileArtworks = await extractArtworkData(file)
      artworks.push(...fileArtworks)
    }
  }
  
  // Write results to a JSON file
  await fs.promises.writeFile(
    'src/data/artworks.json',
    JSON.stringify(artworks, null, 2)
  )
  
  console.log(`Extracted ${artworks.length} artworks`)
}

main().catch(console.error) 