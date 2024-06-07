/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, 'src')
const outputPath = path.join(directoryPath, 'index.ts')

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith('__tests__')) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
      }
    } else {
      arrayOfFiles.push(fullPath)
    }
  })

  return arrayOfFiles
}

function generateImport() {
  const files = getAllFiles(directoryPath)
  const exports = files
    .filter((file) => file.endsWith('.ts') && file !== outputPath)
    .map((file) => {
      const relativePath = path
        .relative(directoryPath, file)
        .replace(/\\/g, '/')
        .replace('.ts', '')
      return `export * from './${relativePath}'`
    })
    .join('\n')

  fs.writeFileSync(outputPath, exports, 'utf-8')
}

generateImport()
