// Azure App Service entry point for Ares projects
const path = require('path');
const fs = require('fs');

console.log('Starting Ares project backend...');
console.log('Current directory:', __dirname);

// Change to backend directory
const backendPath = path.join(__dirname, 'backend');
if (!fs.existsSync(backendPath)) {
    console.error('ERROR: Backend folder not found!');
    console.log('Available folders:', fs.readdirSync(__dirname));
    process.exit(1);
}

process.chdir(backendPath);
console.log('Changed to backend directory');

// Check if node_modules exists, if not, install dependencies
if (!fs.existsSync('node_modules')) {
    console.log('Installing backend dependencies...');
    require('child_process').execSync('npm install --production', { stdio: 'inherit' });
}

// Start the server
const serverPath = path.join(backendPath, 'dist', 'server.js');
if (fs.existsSync(serverPath)) {
    console.log('Starting from dist/server.js');
    require(serverPath);
} else {
    console.error('ERROR: dist/server.js not found!');
    console.log('Available files:', fs.readdirSync(backendPath));
    process.exit(1);
}
