const { execSync } = require("child_process")
const path = require("path")

const svgrConfigPath = path.resolve(__dirname, ".svgrrc.mobile.js")
const srcDir = path.resolve(__dirname, "../src/assets/icons")
const outDir = path.resolve(__dirname, "../src/icons/mobile")

execSync(`SVGR_CONFIG_FILE=${svgrConfigPath} svgr --typescript --native --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })
