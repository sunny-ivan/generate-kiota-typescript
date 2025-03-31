#!/usr/bin/env node
const fs = require("fs");
const prefix = "@microsoft/kiota-";

// Read package.json
const pkg = JSON.parse(fs.readFileSync("./package.json"));

// Check for packages with the specified prefix
["dependencies", "devDependencies", "peerDependencies"].forEach((section) => {
  if (!pkg[section]) return;

  Object.keys(pkg[section]).forEach((packageName) => {
    if (packageName.startsWith(prefix)) {
      console.log(`Removing ${packageName}`);
      delete pkg[section][packageName];
    }
  });

  // Remove section if empty
  if (Object.keys(pkg[section]).length === 0) {
    delete pkg[section];
  }
});

// Write updated package.json
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log(`Removed ${prefix} packages from package.json`);
