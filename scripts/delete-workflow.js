
const fs = require('fs');
const filePath = 'c:\\Users\\User\\Documents\\Coralfill\\Marketing\\stitch_coralfill_website_launch.md (3)\\stitch_coralfill_website_launch.md\\reefmaker-app\\.github\\workflows\\vercel-check.yml';
if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log('Deleted ' + filePath);
} else {
    console.log('File not found: ' + filePath);
}
