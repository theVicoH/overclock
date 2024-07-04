const { execSync } = require("child_process")
const path = require("path")

const outDir = path.resolve(__dirname, "../src/icons/mobile")
const srcDir = path.resolve(__dirname, "../src/assets/icons")

execSync(`cross-env svgr --typescript --native --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })
