import { describe, it, expect, vi } from "vitest";
import path from "path";
import { execSync } from "child_process";

vi.mock("child_process", () => ({
  execSync: vi.fn()
}));

const outDir: string = path.resolve(__dirname, "../../icons/web");
const srcDir: string = path.resolve(__dirname, "../../assets/icons");

const runScript = () => {
  execSync(`cross-env svgr --typescript --out-dir ${outDir} ${srcDir}`, { stdio: "inherit" });
};

describe("runScript", () => {
  it("should execute the correct command", () => {
    runScript();

    expect(execSync).toHaveBeenCalledWith(
      `cross-env svgr --typescript --out-dir ${outDir} ${srcDir}`,
      { stdio: "inherit" }
    );
  });

  it("should resolve correct paths", () => {
    expect(outDir).toBe(path.resolve(__dirname, "../../icons/web"));
    expect(srcDir).toBe(path.resolve(__dirname, "../../assets/icons"));
  });
});
