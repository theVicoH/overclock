const { execSync } = require("child_process")
const path = require("path")

const outDir = path.resolve(__dirname, "../src/icons/web")
const srcDir = path.resolve(__dirname, "../src/assets/icons")

execSync(`cross-env svgr --typescript --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })
