#!/usr/bin/env node
const fs = require("fs");
const process = require("process");
const pkgConfig = "./package.json";
const prefix = "@microsoft/kiota-";

if (!fs.existsSync(pkgConfig)) {
  console.log("No package.json file will be affected");
  process.exit(0);
}

// Read package.json
const pkg = JSON.parse(fs.readFileSync(pkgConfig));

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
fs.writeFileSync(pkgConfig, JSON.stringify(pkg, null, 2) + "\n");
console.log(`Removed ${prefix} packages from package.json`);
