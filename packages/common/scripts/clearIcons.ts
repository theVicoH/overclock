import fs from "fs";
import path from "path";

const iconsDir = path.join(__dirname, "../src/icons");

function clearDirectory(directoryPath: string): void {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        clearDirectory(currentPath);
      } else {
        fs.unlinkSync(currentPath);
      }
    });
  }
}

clearDirectory(iconsDir);
