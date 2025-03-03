#!/usr/bin/env ts-node

import * as fs from "fs";
import * as readline from "readline";
import { spawnSync } from "child_process";
import * as path from "path";

// Helper function for asking user input
const askQuestion = (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// Function to execute shell commands in a cross-platform way
const runCommand = (command: string, args: string[]) => {
  spawnSync(command, args, { stdio: "inherit", shell: true });
};

// Main setup function
const setupProject = async () => {
  console.log("\n🚀 Setting up your Vite project...\n");

  // Ask for project name
  const projectName = (await askQuestion("Enter your project name: ")).trim();
  const useTailwind = (await askQuestion("Do you want to install TailwindCSS? (y/n): ")).toLowerCase() === "y";

  // Modify package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    packageJson.name = projectName.toLowerCase().replace(/\s+/g, "-");
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log("\n📄 Updated package.json with project name.");
  } else {
    console.warn("\n⚠️ package.json not found. Skipping update.");
  }

  // Install dependencies
  console.log("\n📦 Installing dependencies...");
  runCommand("npm", ["install"]);

  // Optional: Install TailwindCSS
  if (useTailwind) {
    console.log("\n🎨 Installing TailwindCSS...");
    runCommand("npm", ["install", "-D", "tailwindcss", "postcss", "autoprefixer"]);
    runCommand("npx", ["tailwindcss", "init", "--postcss"]);
  }

  console.log("\n✅ Setup complete! Run your project with:");
  console.log(`\n   cd ${projectName} && npm run dev\n`);
};

// Execute setup
setupProject();
