const fs = require('fs');
const path = require('path');

console.log('Running pre-install patches...');

// Function to patch ajv-keywords
function patchAjvKeywords() {
  const ajvPaths = [
    'node_modules/ajv-keywords/dist/index.js',
    'node_modules/fork-ts-checker-webpack-plugin/node_modules/ajv-keywords/dist/index.js',
    'node_modules/schema-utils/node_modules/ajv-keywords/dist/index.js'
  ];

  ajvPaths.forEach(ajvPath => {
    const fullPath = path.join(process.cwd(), ajvPath);
    if (fs.existsSync(fullPath)) {
      try {
        let content = fs.readFileSync(fullPath, 'utf8');
        
        // Replace the problematic line
        if (content.includes('throw new Error("Unknown keyword " + name)')) {
          content = content.replace(
            'throw new Error("Unknown keyword " + name)',
            'if (["formatMinimum", "formatMaximum", "formatExclusiveMinimum", "formatExclusiveMaximum"].includes(name)) return function() {}; throw new Error("Unknown keyword " + name)'
          );
          
          fs.writeFileSync(fullPath, content);
          console.log(`Patched ${ajvPath}`);
        }
      } catch (error) {
        console.log(`Could not patch ${ajvPath}:`, error.message);
      }
    }
  });
}

// Function to create dummy ajv-keywords if needed
function createDummyAjvKeywords() {
  const dummyContent = `
module.exports = function(ajv, keywords) {
  // Dummy implementation to bypass errors
  return ajv;
};
module.exports.get = function(name) {
  // Return dummy function for any keyword
  return function() {};
};
`;

  const ajvKeywordsPath = path.join(process.cwd(), 'node_modules/ajv-keywords/index.js');
  if (!fs.existsSync(path.dirname(ajvKeywordsPath))) {
    fs.mkdirSync(path.dirname(ajvKeywordsPath), { recursive: true });
  }
  fs.writeFileSync(ajvKeywordsPath, dummyContent);
  console.log('Created dummy ajv-keywords module');
}

// Run patches
try {
  patchAjvKeywords();
} catch (error) {
  console.log('Patch error:', error.message);
  createDummyAjvKeywords();
}

console.log('Pre-install patches completed');