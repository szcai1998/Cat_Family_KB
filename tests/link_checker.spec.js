const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");

// Helper to recursively get all markdown files in a directory
function getMarkdownFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".git") {
        getMarkdownFiles(filePath, filesList);
      }
    } else if (file.endsWith(".md")) {
      filesList.push(filePath);
    }
  }
  return filesList;
}

test("validate all relative markdown links in the KB", async () => {
  const rootDir = path.resolve(__dirname, "..");
  const mdFiles = getMarkdownFiles(rootDir);
  const brokenLinks = [];

  for (const mdFile of mdFiles) {
    const fileContent = fs.readFileSync(mdFile, "utf-8");
    const fileDir = path.dirname(mdFile);

    // 1. Match standard markdown links: [text](path)
    const standardLinkRegex = /\[[^\]]*\]\(([^)]+)\)/g;
    let match;
    while ((match = standardLinkRegex.exec(fileContent)) !== null) {
      const originalPath = match[1].trim();
      validateLink(originalPath, mdFile, fileDir, rootDir, brokenLinks);
    }

    // 2. Match wiki-style relative links: [[path|text]] or [[path]]
    const wikiLinkRegex = /\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    let wikiMatch;
    while ((wikiMatch = wikiLinkRegex.exec(fileContent)) !== null) {
      const originalPath = wikiMatch[1].trim();
      validateLink(originalPath, mdFile, fileDir, rootDir, brokenLinks);
    }
  }

  // Print all broken links nicely if any are found
  if (brokenLinks.length > 0) {
    console.error("\n❌ Broken Relative Links Found:");
    brokenLinks.forEach(({ sourceFile, linkPath, resolvedPath }) => {
      const relativeSource = path.relative(rootDir, sourceFile);
      console.error(
        `- In file: ${relativeSource}\n  Broken Link: "${linkPath}"\n  Tried Resolving to: ${resolvedPath}\n`,
      );
    });
  }

  expect(
    brokenLinks.length,
    `Expected 0 broken links, but found ${brokenLinks.length}`,
  ).toBe(0);
});

function validateLink(linkPath, sourceFile, fileDir, rootDir, brokenLinks) {
  // Ignore web links, anchor fragments within the same page, or mailto
  if (
    linkPath.startsWith("http://") ||
    linkPath.startsWith("https://") ||
    linkPath.startsWith("mailto:") ||
    linkPath.startsWith("#")
  ) {
    return;
  }

  // Strip any anchor fragment (e.g. "../file.md#heading" -> "../file.md")
  const pathWithoutAnchor = linkPath.split("#")[0];
  if (!pathWithoutAnchor) {
    return; // Anchors to the same page are ignored for file-level checking
  }

  // Resolve the path relative to the directory of the source markdown file
  let resolvedPath = path.resolve(fileDir, pathWithoutAnchor);

  // If the path uses Obsidian absolute-style (starting with root-level directories), fall back to root resolution
  if (!fs.existsSync(resolvedPath)) {
    const rootRelativePath = path.resolve(rootDir, pathWithoutAnchor);
    if (fs.existsSync(rootRelativePath)) {
      resolvedPath = rootRelativePath;
    }
  }

  // Check if the resolved path actually exists
  if (!fs.existsSync(resolvedPath)) {
    brokenLinks.push({
      sourceFile,
      linkPath,
      resolvedPath,
    });
  }
}
