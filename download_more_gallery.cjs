const https = require('https');
const fs = require('fs');
const path = require('path');

// Additional authentic Cassell Ridge gallery images
const moreGalleryImages = [
  // More Amenities
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190871675-UD1BVJ4WMU64PNUHBSV5/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%2820+of+25%29.jpg',
    title: 'Community Building',
    description: 'Beautiful community building exterior with modern architecture',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190872591-4JVWYCQ5JIWE116JKG28/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%2821+of+25%29.jpg',
    title: 'Leasing Office',
    description: 'Professional leasing office ready to welcome new residents',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190898681-H9TKB5NU47YTEYBYPHS2/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%286+of+25%29.jpg',
    title: 'Pool Deck',
    description: 'Spacious pool deck area with plenty of room for relaxation',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190904698-LSEK8MGY6VC3R21OC31O/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%287+of+25%29.jpg',
    title: 'Landscaped Grounds',
    description: 'Beautiful landscaping throughout the property',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190907168-9T3ZGSAM66C63EYWRB7M/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%288+of+25%29.jpg',
    title: 'Walking Paths',
    description: 'Paved walking paths connecting community areas',
    category: 'amenity'
  },
  // More 2-Bedroom Interior Photos
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190630479-X1YUUDYBNPUWUKPE91SM/Cassell+Ridge+%28WEB%29+%282BED%29+%286+of+21%29.jpg',
    title: '2-Bedroom Living Area',
    description: 'Another view of the spacious living area in 2-bedroom unit',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190635153-VDGSW7XU97OE5KZ0HUHM/Cassell+Ridge+%28WEB%29+%282BED%29+%288+of+21%29.jpg',
    title: '2-Bedroom Secondary Bedroom',
    description: 'Comfortable secondary bedroom with natural light',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190635593-YG8AG9LLB9CT4AWOHT23/Cassell+Ridge+%28WEB%29+%282BED%29+%289+of+21%29.jpg',
    title: '2-Bedroom Closet Space',
    description: 'Ample closet space and storage throughout the apartment',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190607755-H742127BFWUS11YULAKX/Cassell+Ridge+%28WEB%29+%282BED%29+%2818+of+21%29.jpg',
    title: '2-Bedroom Balcony View',
    description: 'Private balcony with scenic views of the surrounding area',
    category: 'interior'
  },
  // More 3-Bedroom Interior Photos
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190657260-5WDOHTHNDRQ6YVWBBJ9Q/Cassell+Ridge+%28WEB%29+%283BED%29+%2822+of+25%29.jpg',
    title: '3-Bedroom Master Suite',
    description: 'Spacious master suite in 3-bedroom layout',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190659220-A2MFQK7YV5EE4D4WQ4VR/Cassell+Ridge+%28WEB%29+%283BED%29+%2823+of+25%29.jpg',
    title: '3-Bedroom Third Bedroom',
    description: 'Third bedroom perfect for office or guest space',
    category: 'interior'
  },
  // More Aerial/Exterior Images
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190862050-FP7A9CEYUKY4WJLSXYH9/Cassell+Ridge+%28WEB%29+%28AERIAL%29+%2819+of+22%29.jpg',
    title: 'Aerial Community View',
    description: 'Aerial view showing the complete community layout',
    category: 'exterior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190859410-LCKJWPQ1VQKK9R8HFCDL/Cassell+Ridge+%28WEB%29+%28AERIAL%29+%2818+of+22%29.jpg',
    title: 'Property Overview',
    description: 'Complete overview of Cassell Ridge apartment community',
    category: 'exterior'
  }
];

async function downloadImage(imageData, index) {
  const filename = `cassell-${String(index + 15).padStart(2, '0')}.jpg`;
  const filepath = path.join('public/images/gallery', filename);
  
  return new Promise((resolve, reject) => {
    https.get(imageData.url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${imageData.url}: ${response.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(filepath);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✓ Downloaded: ${filename} - ${imageData.title}`);
        resolve({
          ...imageData,
          filename,
          filepath: `/images/gallery/${filename}`
        });
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Starting download of additional Cassell Ridge gallery images...\n');
  
  const downloadedImages = [];
  
  for (let i = 0; i < moreGalleryImages.length; i++) {
    try {
      const result = await downloadImage(moreGalleryImages[i], i);
      downloadedImages.push(result);
    } catch (error) {
      console.error(`✗ Failed to download image ${i + 1}:`, error.message);
    }
  }
  
  console.log(`\n✓ Downloaded ${downloadedImages.length} additional images successfully!`);
  
  // Generate SQL statements to update database
  console.log('\n--- ADDITIONAL SQL INSERT STATEMENTS ---\n');
  
  downloadedImages.forEach((img, index) => {
    const sqlStatement = `INSERT INTO gallery_images (title, description, image_url, category, featured, sort_order) VALUES ('${img.title.replace(/'/g, "''")}', '${img.description.replace(/'/g, "''")}', '${img.filepath}', '${img.category}', false, ${index + 15});`;
    console.log(sqlStatement);
  });
  
  return downloadedImages;
}

// Run if called directly
if (require.main === module) {
  downloadAllImages().catch(console.error);
}

module.exports = { downloadAllImages };