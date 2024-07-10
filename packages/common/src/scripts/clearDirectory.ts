import fs from "fs"
import path from "path"

export default function clearDirectory(directoryPath: string): void {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file)
      if (fs.lstatSync(currentPath).isDirectory()) {
        clearDirectory(currentPath)
        fs.rmdirSync(currentPath)
      } else {
        fs.unlinkSync(currentPath)
      }
    })
  }
}
