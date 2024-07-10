import { execSync } from "child_process"
import path from "path"

const outDir: string = path.resolve(__dirname, "../icons/web")
const srcDir: string = path.resolve(__dirname, "../assets/icons")

execSync(`cross-env svgr --typescript --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" })
