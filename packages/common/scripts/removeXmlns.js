const fs = require("fs")
const path = require("path")

const directory = path.join(__dirname, "../src/icons/mobile")

fs.readdir(directory, (err, files) => {
  if (err) {
    console.error(`Unable to read directory: ${err}`)
    return
  }

  files.forEach((file) => {
    const filePath = path.join(directory, file)

    if (path.extname(file) === ".tsx") {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          console.error(`Unable to read file ${file}: ${err}`)
          return
        }

        const updatedData = data.replace(/\s*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/, "")

        fs.writeFile(filePath, updatedData, "utf8", (err) => {
          if (err) {
            console.error(`Unable to write file ${file}: ${err}`)
          } else {
            console.log(`Updated file: ${file}`)
          }
        })
      })
    }
  })
})
