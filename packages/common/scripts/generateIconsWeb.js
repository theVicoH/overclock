const { execSync } = require("child_process")
const path = require("path")

const svgrConfigPath = path.resolve(__dirname, ".svgrrc.web.js")
const srcDir = path.resolve(__dirname, "../src/assets/icons")
const outDir = path.resolve(__dirname, "../src/icons/web")

execSync(`cross-env SVGR_CONFIG_FILE=${svgrConfigPath} svgr --typescript --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })
