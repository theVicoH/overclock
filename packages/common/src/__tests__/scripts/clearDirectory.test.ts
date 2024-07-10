import { describe, it, expect, beforeEach, afterEach } from "vitest"
import fs from "fs"
import path from "path"
import mock from "mock-fs"
import clearDirectory from "../../scripts/clearDirectory"

const iconsDir = path.join(__dirname, "../icons")

describe("clearDirectory", () => {
  beforeEach(() => {
    mock({
      [iconsDir]: {
        "file1.txt": "file1 content",
        "file2.txt": "file2 content",
        "subdir": {
          "file3.txt": "file3 content",
        },
      },
    })
  })

  afterEach(() => {
    mock.restore()
  })

  it("should clear all files and subdirectories inside the specified directory", () => {
    clearDirectory(iconsDir)

    const filesAfterClear = fs.readdirSync(iconsDir)
    expect(filesAfterClear.length).toBe(0)
  })

  it("should not throw an error if the directory does not exist", () => {
    const nonExistentDir = path.join(__dirname, "../nonExistentDir")
    expect(() => clearDirectory(nonExistentDir)).not.toThrow()
  })

  it("should clear an already empty directory without errors", () => {
    const emptyDir = path.join(__dirname, "../emptyDir")
    mock({
      [emptyDir]: {},
    })

    expect(() => clearDirectory(emptyDir)).not.toThrow()

    const filesAfterClear = fs.readdirSync(emptyDir)
    expect(filesAfterClear.length).toBe(0)
  })
})
