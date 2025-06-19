#!/bin/bash

# Fix ajv-keywords compatibility issue
echo "Patching ajv-keywords compatibility issue..."

# Create a patch for ajv-keywords
cat > ajv-patch.js << 'EOF'
const fs = require('fs');
const path = require('path');

// Find ajv-keywords in node_modules
const ajvKeywordsPath = path.join(__dirname, 'node_modules/ajv-keywords/dist/index.js');

if (fs.existsSync(ajvKeywordsPath)) {
  let content = fs.readFileSync(ajvKeywordsPath, 'utf8');
  
  // Patch the formatMinimum/formatMaximum keywords
  content = content.replace(
    'throw new Error("Unknown keyword " + name)',
    'if (name === "formatMinimum" || name === "formatMaximum") return function() {}; throw new Error("Unknown keyword " + name)'
  );
  
  fs.writeFileSync(ajvKeywordsPath, content);
  console.log('Successfully patched ajv-keywords');
}

// Also patch fork-ts-checker-webpack-plugin's schema-utils if it exists
const schemaUtilsPath = path.join(__dirname, 'node_modules/fork-ts-checker-webpack-plugin/node_modules/schema-utils/dist/validate.js');

if (fs.existsSync(schemaUtilsPath)) {
  let content = fs.readFileSync(schemaUtilsPath, 'utf8');
  
  // Wrap the ajvKeywords call in a try-catch
  content = content.replace(
    'ajvKeywords(ajv, ["instanceof", "formatMinimum", "formatMaximum", "patternRequired"]);',
    'try { ajvKeywords(ajv, ["instanceof", "patternRequired"]); } catch(e) { console.warn("ajv-keywords warning:", e.message); }'
  );
  
  fs.writeFileSync(schemaUtilsPath, content);
  console.log('Successfully patched schema-utils');
}
EOF

node ajv-patch.js

# Now run the actual build
npm run build