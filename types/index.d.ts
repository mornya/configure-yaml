/*
 * index.d.ts
 *
 * This definition file will type to "src/*.ts" and sub-modules.
 * All "*.d.ts" files in that directory will not be distributed when you run "npm publish"!
 */

declare namespace NodeJS {
  interface Process {
    env: Record<string, string>;
  }
}

// Sample declaration for test
declare global {
  interface Window {
    doctype: string;
  }
}
