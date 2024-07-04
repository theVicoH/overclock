import { execSync } from "child_process";
import path from "path";

const outDir: string = path.resolve(__dirname, "../src/icons/mobile");
const srcDir: string = path.resolve(__dirname, "../src/assets/icons");

execSync(`cross-env svgr --typescript --native --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" });
