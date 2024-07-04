const { execSync } = require("child_process")
const path = require("path")

const outDir: string = path.resolve(__dirname, "../icons/web")
const srcDir: string = path.resolve(__dirname, "../assets/icons")

execSync(`cross-env svgr --typescript --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })
