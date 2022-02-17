const fs = require('fs');

function replaceContentsSync(file, replacement) {
  const contents = fs.readFileSync(replacement);
  fs.writeFileSync(file, contents);
}

replaceContentsSync('json-server/api.json', 'json-server/test.json');
