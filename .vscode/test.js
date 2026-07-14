#!/usr/bin/env node

process.stderr.write("Hello from test.js\n");

// Keep process alive
setInterval(() => {}, 1000);