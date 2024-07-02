const fs = require("fs")
const path = require("path")

const directoryPath = path.join(__dirname, "src")

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function (file) {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      if (!file.startsWith("__tests__") && file !== "icons") {
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

  const directories = new Set(files.map((file) => path.dirname(file)))

  directories.forEach((dir) => {
    if (dir.includes("icons") || dir === directoryPath || dir.includes("assets")) return

    const outputPath = path.join(dir, "index.ts")
    const filesInDir = files.filter((file) => path.dirname(file) === dir && file.endsWith(".ts") && file !== outputPath)

    if (filesInDir.length > 0) {
      const exports =
        filesInDir
          .map((file) => {
            const relativePath = path.relative(dir, file).replace(/\\/g, "/").replace(".ts", "")
            return `export * from "./${relativePath}";`
          })
          .join("\n") + "\n"

      fs.writeFileSync(outputPath, exports, "utf-8")
    }
  })
}

generateImport()
