#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const traceFile = path.join(__dirname, '../.next/trace');

function fixTraceFile() {
  if (!fs.existsSync(traceFile)) {
    console.log('No trace file found, skipping fix');
    return;
  }

  try {
    const content = fs.readFileSync(traceFile, 'utf8');
    
    // Try to parse as-is first
    try {
      JSON.parse(content);
      console.log('✅ Trace file is already valid JSON');
      return;
    } catch (e) {
      // File needs fixing
    }

    // Split by lines and merge arrays
    const lines = content.trim().split('\n').filter(line => line.trim());
    const mergedArray = [];

    for (const line of lines) {
      try {
        const array = JSON.parse(line);
        if (Array.isArray(array)) {
          mergedArray.push(...array);
        }
      } catch (e) {
        console.log(`Skipping invalid line: ${line.substring(0, 50)}...`);
      }
    }

    // Write back the fixed JSON
    fs.writeFileSync(traceFile, JSON.stringify(mergedArray, null, 0));
    console.log(`✅ Fixed trace file with ${mergedArray.length} events`);

  } catch (error) {
    console.error('❌ Error fixing trace file:', error.message);
  }
}

if (require.main === module) {
  fixTraceFile();
}

module.exports = fixTraceFile;