import { describe, it, expect, vi, afterEach } from "vitest"
import fs from "fs"
import path from "path"
import mock from "mock-fs"

import "../../scripts/removeXmlns"

const directory = path.join(__dirname, "../../icons/mobile")

describe("removeXmlns script", () => {
  afterEach(() => {
    mock.restore()
  })

  it("should update .tsx files by removing the xmlns attribute", async () => {
    mock({
      [directory]: {
        // prettier-ignore
        "icon1.tsx": "<svg xmlns=\"http://www.w3.org/2000/svg\"></svg>",
        // prettier-ignore
        "icon2.tsx": "<svg xmlns=\"http://www.w3.org/2000/svg\"></svg>",
        "icon3.txt": "Just a text file",
      },
    })

    // Run the script
    await new Promise((resolve) => {
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

        resolve(null)
      })
    })

    // Verify the changes
    const updatedIcon1 = fs.readFileSync(path.join(directory, "icon1.tsx"), "utf8")
    const updatedIcon2 = fs.readFileSync(path.join(directory, "icon2.tsx"), "utf8")
    const nonUpdatedFile = fs.readFileSync(path.join(directory, "icon3.txt"), "utf8")

    expect(updatedIcon1).toBe("<svg></svg>")
    expect(updatedIcon2).toBe("<svg></svg>")
    expect(nonUpdatedFile).toBe("Just a text file")
  })
})
