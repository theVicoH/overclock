import { execSync } from "child_process";
import path from "path";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import fs from "fs";

const outDir: string = path.resolve(__dirname, "../../icons/mobile");
const srcDir: string = path.resolve(__dirname, "../../assets/icons");

vi.mock("child_process", () => ({
  execSync: vi.fn(() => {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outDir, "icon1.tsx"), "");
    fs.writeFileSync(path.join(outDir, "icon2.tsx"), "");
  })
}));

vi.mock("fs", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("fs");
  return {
    ...actual,
    mkdirSync: vi.fn(actual.mkdirSync),
    rmSync: vi.fn(actual.rmSync),
    readdirSync: vi.fn(actual.readdirSync),
    existsSync: vi.fn(actual.existsSync)
  };
});

describe("generateIconsMobile script", () => {
  beforeAll(() => {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });

  it("should generate icons for mobile", async () => {
    // Dynamically import the script without .ts extension
    await import("../../scripts/generateIconsMobile");

    expect(execSync).toHaveBeenCalledWith(
      `cross-env svgr --typescript --native --out-dir ${outDir} ${srcDir}`,
      { stdio: "inherit" }
    );

    const files = fs.readdirSync(outDir);
    expect(files.length).toBeGreaterThan(0);

    files.forEach(file => {
      expect(file).toMatch(/\.tsx?$/);
    });
  });

  afterAll(() => {
    if (fs.existsSync(outDir)) {
      fs.rmSync(outDir, { recursive: true, force: true });
    }
  });
});
