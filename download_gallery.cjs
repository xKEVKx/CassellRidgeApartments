const https = require('https');
const fs = require('fs');
const path = require('path');

// All authentic Cassell Ridge gallery images
const galleryImages = [
  // Hero/Aerial Images
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/ac553cc9-e16b-49f7-aa69-0e451f3698ca/Cassell+Ridge+%28WEB%29+%28AERIAL%29+%2820+of+22%29.jpg',
    title: 'Aerial View of Cassell Ridge',
    description: 'Beautiful aerial view showing the full Cassell Ridge apartment complex and surrounding area',
    category: 'exterior',
    featured: true
  },
  // 2-Bedroom Interior Images
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190617305-KB6KZOXQN74VBQMEDR7C/Cassell+Ridge+%28WEB%29+%282BED%29+%281+of+21%29.jpg',
    title: '2-Bedroom Living Room',
    description: 'Spacious living room with modern furnishings and large windows',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190623025-WJ1X9KY0HEU4OTW04L1I/Cassell+Ridge+%28WEB%29+%282BED%29+%282+of+21%29.jpg',
    title: '2-Bedroom Kitchen',
    description: 'Modern fully-equipped kitchen with granite countertops and stainless appliances',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190622772-10C0ZFNQDJCXJ24SVX94/Cassell+Ridge+%28WEB%29+%282BED%29+%283+of+21%29.jpg',
    title: '2-Bedroom Dining Area',
    description: 'Open concept dining area perfect for entertaining',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190626511-GNL8Y8OWVHZHIUQOH0EH/Cassell+Ridge+%28WEB%29+%282BED%29+%284+of+21%29.jpg',
    title: '2-Bedroom Master Bedroom',
    description: 'Comfortable master bedroom with ample natural light',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190626890-NXBQ5ZLYY6JCT4Q6BOJ7/Cassell+Ridge+%28WEB%29+%282BED%29+%285+of+21%29.jpg',
    title: '2-Bedroom Bathroom',
    description: 'Modern bathroom with updated fixtures and finishes',
    category: 'interior'
  },
  // Amenities Images
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190880107-IJENPHZ75P46QJJJEXPA/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%281+of+25%29.jpg',
    title: 'Swimming Pool',
    description: 'Sparkling outdoor swimming pool for residents to enjoy',
    category: 'amenity',
    featured: true
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190881620-PN4CEEKAT8Z5UKAKG9N7/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%282+of+25%29.jpg',
    title: 'Pool Area Seating',
    description: 'Comfortable poolside seating and relaxation area',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190888310-1V14STO7K1GZ544391L8/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%283+of+25%29.jpg',
    title: 'Playground Area',
    description: 'Safe and fun playground area for children',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190890102-IKBV5WCBMDC02ZQBN7VK/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%284+of+25%29.jpg',
    title: 'Community Courtyard',
    description: 'Beautiful landscaped courtyard area for residents',
    category: 'amenity'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190896846-H7WWXNWUX709RB8N4LL6/Cassell+Ridge+%28WEB%29+%28AMENITIES%29+%285+of+25%29.jpg',
    title: 'Dog Park',
    description: 'Dedicated dog park area for pet owners',
    category: 'amenity'
  },
  // 3-Bedroom Images
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190651436-0RUOHBJ9FNDCVASCIG6P/Cassell+Ridge+%28WEB%29+%283BED%29+%2820+of+25%29.jpg',
    title: '3-Bedroom Living Space',
    description: 'Spacious 3-bedroom apartment living area with modern design',
    category: 'interior'
  },
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190655858-ONGKX1SOQSOAZ3189KHT/Cassell+Ridge+%28WEB%29+%283BED%29+%2821+of+25%29.jpg',
    title: '3-Bedroom Kitchen',
    description: 'Large kitchen perfect for families in 3-bedroom layout',
    category: 'interior'
  },
  // Building Exterior
  {
    url: 'https://images.squarespace-cdn.com/content/v1/686e877b2b9f7c04f24a71fa/1753190864812-Z6EU4URNJKAOV9XFR8M0/Cassell+Ridge+%28WEB%29+%28AERIAL%29+%2821+of+22%29.jpg',
    title: 'Building Exterior',
    description: 'Modern apartment building exterior with attractive landscaping',
    category: 'exterior'
  }
];

async function downloadImage(imageData, index) {
  const filename = `cassell-${String(index + 1).padStart(2, '0')}.jpg`;
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
  console.log('Starting download of Cassell Ridge gallery images...\n');
  
  const downloadedImages = [];
  
  for (let i = 0; i < galleryImages.length; i++) {
    try {
      const result = await downloadImage(galleryImages[i], i);
      downloadedImages.push(result);
    } catch (error) {
      console.error(`✗ Failed to download image ${i + 1}:`, error.message);
    }
  }
  
  console.log(`\n✓ Downloaded ${downloadedImages.length} images successfully!`);
  
  // Generate SQL statements to update database
  console.log('\n--- SQL UPDATE STATEMENTS ---\n');
  
  downloadedImages.forEach((img, index) => {
    const sqlStatement = `INSERT INTO gallery_images (title, description, image_url, category, featured, sort_order) VALUES ('${img.title.replace(/'/g, "''")}', '${img.description.replace(/'/g, "''")}', '${img.filepath}', '${img.category}', ${img.featured || false}, ${index + 6});`;
    console.log(sqlStatement);
  });
  
  return downloadedImages;
}

// Run if called directly
if (require.main === module) {
  downloadAllImages().catch(console.error);
}

module.exports = { downloadAllImages };