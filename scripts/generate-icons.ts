import fs from 'fs';
import path from 'path';
import Icon from '../src/app/icon';

function generateIcons() {
  const publicDir = path.join(process.cwd(), 'public');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const icons = Icon();

  // Write light icon
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), icons.light);

  // Write dark icon
  fs.writeFileSync(path.join(publicDir, 'dark-icon.svg'), icons.dark);
}

generateIcons();
