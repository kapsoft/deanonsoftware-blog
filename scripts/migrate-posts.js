const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Get source directory from command line or use default
const sourceDir = process.argv[2];
const targetDir = './posts';

if (!sourceDir) {
  console.error('Please provide the source directory path');
  console.error('Usage: npm run migrate /path/to/laravel/posts');
  process.exit(1);
}

if (!fs.existsSync(sourceDir)) {
  console.error(`Source directory ${sourceDir} does not exist`);
  process.exit(1);
}

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created target directory: ${targetDir}`);
}

// Get all markdown files
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));
console.log(`Found ${files.length} markdown files to migrate\n`);

let successCount = 0;
let errorCount = 0;

files.forEach(file => {
  try {
    const sourcePath = path.join(sourceDir, file);
    const content = fs.readFileSync(sourcePath, 'utf8');
    const { data, content: postContent } = matter(content);
    
    // Remove Laravel-specific fields
    delete data.extends;
    delete data._posts; // Remove any other Laravel-specific fields
    
    // Flatten dsq_thread_id if it's an array
    if (Array.isArray(data.dsq_thread_id)) {
      data.dsq_thread_id = data.dsq_thread_id[0];
    }
    
    // Ensure date is in ISO format
    if (data.date) {
      const date = new Date(data.date);
      if (!isNaN(date.getTime())) {
        data.date = date.toISOString();
      }
    }
    
    // Generate filename from date and title
    let newFilename;
    
    // Check if file already has date format
    const dateMatch = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.md$/);
    if (dateMatch) {
      // File already has correct format
      newFilename = file;
    } else if (data.date && data.title) {
      // Generate filename from frontmatter
      const date = new Date(data.date);
      const dateStr = date.toISOString().split('T')[0];
      const titleSlug = data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      newFilename = `${dateStr}-${titleSlug}.md`;
    } else {
      // Fallback to original filename
      newFilename = file;
    }
    
    // Create new content with cleaned frontmatter
    const newContent = matter.stringify(postContent.trim(), data);
    
    // Write to target directory
    const targetPath = path.join(targetDir, newFilename);
    fs.writeFileSync(targetPath, newContent);
    
    console.log(`✓ Migrated: ${file} → ${newFilename}`);
    successCount++;
    
    // Show first few fields of frontmatter for verification
    const previewData = Object.keys(data).slice(0, 3).reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
    console.log(`  Frontmatter preview:`, JSON.stringify(previewData, null, 2).split('\n').join('\n  '));
    console.log('');
    
  } catch (error) {
    console.error(`✗ Error migrating ${file}:`, error.message);
    errorCount++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`Migration complete!`);
console.log(`Success: ${successCount} files`);
console.log(`Errors: ${errorCount} files`);
console.log('='.repeat(50));

if (successCount > 0) {
  console.log('\nNext steps:');
  console.log('1. Run "npm run dev" to start the development server');
  console.log('2. Visit http://localhost:3000 to see your blog');
  console.log('3. Check individual posts for proper formatting');
}