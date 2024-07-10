import clearDirectory from "./clearDirectory"
import path from "path"

const iconsDir = path.join(__dirname, "../icons")
clearDirectory(iconsDir)
