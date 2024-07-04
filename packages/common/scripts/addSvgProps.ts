import fs from "fs"
import path from "path"

const baseDir = path.join(__dirname, "../src/icons")

function addSvgProps(dir: string) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err)
      return
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file)
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error reading file ${filePath}:`, err)
          return
        }

        if (stats.isDirectory()) {
          addSvgProps(filePath)
        } else if (path.extname(file) === ".tsx") {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) {
              console.error(`Error reading file ${filePath}:`, err)
              return
            }

            const widthMatch = data.match(/width={(\d+)}/)
            const heightMatch = data.match(/height={(\d+)}/)
            const fillMatch = data.match(/fill="([^"]*)"/)
            const strokeMatch = data.match(/stroke="([^"]*)"/)
            const strokeWidthMatch = data.match(/strokeWidth={(\d+\.?\d*)}/)

            const widthDefault = widthMatch ? widthMatch[1] : 16
            const heightDefault = heightMatch ? heightMatch[1] : 16
            const fillDefault = fillMatch ? fillMatch[1] : "none"
            const strokeDefault = strokeMatch ? strokeMatch[1] : "#100F0F"
            const strokeWidthDefault = strokeWidthMatch ? strokeWidthMatch[1] : 1.6

            let updatedData = data
              .replace(/width={\d+}/g, "width={width}")
              .replace(/height={\d+}/g, "height={height}")
              .replace(/fill="[^"]*"/g, "fill={fill}")
              .replace(/stroke="[^"]*"/g, "stroke={stroke}")
              .replace(/strokeWidth={\d+\.?\d*}/g, "strokeWidth={strokeWidth}")

            const componentNameMatch1 = updatedData.match(/const (Svg\w+) = \(props: SvgProps\) => \(/)
            const componentNameMatch2 = updatedData.match(/const (Svg\w+) = \(props: SVGProps<SVGSVGElement>\) => \(/)

            if (componentNameMatch1) {
              const componentName = componentNameMatch1[1]
              const functionDeclaration = `const ${componentName} = ({ width = ${widthDefault}, height = ${heightDefault}, fill = "${fillDefault}", stroke = "${strokeDefault}", strokeWidth = ${strokeWidthDefault}, ...props }: SvgProps) => (`

              updatedData = updatedData.replace(/const Svg\w+ = \(props: SvgProps\) => \(/, functionDeclaration)
            } else if (componentNameMatch2) {
              const componentName = componentNameMatch2[1]
              const functionDeclaration = `const ${componentName} = ({ width = ${widthDefault}, height = ${heightDefault}, fill = "${fillDefault}", stroke = "${strokeDefault}", strokeWidth = ${strokeWidthDefault}, ...props }: SVGProps<SVGSVGElement>) => (`

              updatedData = updatedData.replace(/const Svg\w+ = \(props: SVGProps<SVGSVGElement>\) => \(/, functionDeclaration)
            } else {
              console.warn(`No component declaration found in file ${filePath}`)
              return
            }

            fs.writeFile(filePath, updatedData, "utf8", (err) => {
              if (err) {
                console.error(`Error writing file ${filePath}:`, err)
                return
              }
              console.log(`File ${filePath} updated successfully!`)
            })
          })
        }
      })
    })
  })
}

addSvgProps(path.join(baseDir, "mobile"))
addSvgProps(path.join(baseDir, "web"))
