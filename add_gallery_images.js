// Script to help add multiple gallery images from the Cassell Ridge gallery
// Usage: node add_gallery_images.js

const fs = require('fs');
const path = require('path');
const https = require('https');

// Function to download image from URL
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(`public/images/gallery/${filename}`);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve(filename);
      });
      
      file.on('error', (err) => {
        fs.unlink(`public/images/gallery/${filename}`, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Add image URLs here from the gallery page
const galleryImages = [
  // Example format:
  // {
  //   url: 'https://example.com/image1.jpg',
  //   title: 'Apartment Interior',
  //   description: 'Beautiful apartment interior with modern finishes',
  //   category: 'interior' // exterior, interior, amenity
  // }
];

async function addGalleryImages() {
  console.log('Starting gallery image download...');
  
  for (let i = 0; i < galleryImages.length; i++) {
    const image = galleryImages[i];
    const filename = `cassell-gallery-${String(i + 6).padStart(2, '0')}.jpg`;
    
    try {
      await downloadImage(image.url, filename);
      
      // Add to database (you'll need to run these SQL queries)
      console.log(`
INSERT INTO gallery_images (title, description, image_url, category, featured, sort_order) 
VALUES ('${image.title}', '${image.description}', '/images/gallery/${filename}', '${image.category}', false, ${i + 6});
      `);
      
    } catch (error) {
      console.error(`Failed to download ${image.url}:`, error.message);
    }
  }
  
  console.log('Gallery image processing complete!');
}

// Run if called directly
if (require.main === module) {
  addGalleryImages().catch(console.error);
}

module.exports = { addGalleryImages };