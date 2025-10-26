const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const imagesToOptimize = [
  { input: 'public/1kat.webp', output: 'public/1kat-optimized.webp', width: 800 },
  { input: 'public/2kat.webp', output: 'public/2kat-optimized.webp', width: 800 },
  { input: 'public/3kat.webp', output: 'public/3kat-optimized.webp', width: 800 },
  { input: 'public/main_photo.webp', output: 'public/main_photo-optimized.webp', width: 1200 }
]

async function optimizeImages() {
  for (const image of imagesToOptimize) {
    try {
      const stats = fs.statSync(image.input)
      console.log(`Optimizing ${image.input} (${(stats.size / 1024).toFixed(1)}KB)`)
      
      await sharp(image.input)
        .resize({ width: image.width })
        .webp({ quality: 80, effort: 6 })
        .toFile(image.output)
        
      const newStats = fs.statSync(image.output)
      console.log(`→ ${image.output} (${(newStats.size / 1024).toFixed(1)}KB) - ${((1 - newStats.size/stats.size) * 100).toFixed(1)}% smaller`)
    } catch (error) {
      console.error(`Error optimizing ${image.input}:`, error)
    }
  }
}

optimizeImages()
