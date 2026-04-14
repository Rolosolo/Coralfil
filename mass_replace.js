const fs = require('fs');
const path = require('path');

function processFile(filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let originalContent = fs.readFileSync(filePath, 'utf8');
        let content = originalContent;
        content = content.replace(/PROBIOTIC/g, 'PREBIOTIC');
        content = content.replace(/Probiotic/g, 'Prebiotic');
        content = content.replace(/probiotic/g, 'prebiotic');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log("Updated: " + filePath);
        }
    }
}

function processDirectory(directoryPath) {
    let items = fs.readdirSync(directoryPath);
    for (let item of items) {
        let fullPath = path.join(directoryPath, item);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else {
            processFile(fullPath);
        }
    }
}

processDirectory(path.join(process.cwd(), 'src'));
console.log("Done");
