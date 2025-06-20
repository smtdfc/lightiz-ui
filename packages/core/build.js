const fs = require('fs');
const path = require('path');
const sass = require('sass');

const inputDir = path.resolve(__dirname, './src/styles');
const outputDir = path.resolve(__dirname, './dist/styles');

// Đảm bảo thư mục tồn tại
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Đệ quy duyệt tất cả file .css
function walkAndProcess(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      walkAndProcess(fullPath);
    } else if (fullPath.endsWith('.css')) {
      const relPath = path.relative(inputDir, fullPath);
      const outPath = path.join(outputDir, relPath);
      ensureDir(path.dirname(outPath));
      
      try {
        const result = sass.compile(fullPath, {
          style: 'compressed',
          syntax: 'css' 
        });
        
        fs.writeFileSync(outPath, result.css);
        console.log(`✅ Compressed: ${relPath}`);
      } catch (err) {
        console.error(`❌ Error processing ${relPath}:`, err.message);
      }
    }
  }
}

// Gọi hàm
walkAndProcess(inputDir);