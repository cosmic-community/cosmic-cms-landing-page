const fs = require('fs');
const path = require('path');

const buildDir = path.join(process.cwd(), '.next', 'server', 'app');
const scriptPath = path.join(process.cwd(), 'public', 'dashboard-console-capture.js');

function injectScript(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const scriptContent = fs.readFileSync(scriptPath, 'utf8');
  
  const scriptTag = `<script>${scriptContent}</script>`;
  
  if (!content.includes('dashboard-console-capture') && !content.includes(scriptContent)) {
    const modifiedContent = content.replace(
      '</head>',
      `${scriptTag}</head>`
    );
    fs.writeFileSync(filePath, modifiedContent);
    console.log(`✓ Injected console capture into ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

if (fs.existsSync(buildDir)) {
  console.log('Injecting console capture script into build files...');
  walkDir(buildDir);
  console.log('✓ Console capture injection complete');
} else {
  console.log('Build directory not found, skipping injection');
}