// Custom webpack loader to wrap HTML/PHTML files as template functions
// This is needed for pdfeditor which expects: require('./template.html')()

module.exports = function(source) {
  // FIRST: Replace EJS-style template variables with actual values
  let processedSource = source
    .replace(/<%=\s*ASSETS_URL\s*%>/g, '/assets/');

  // THEN: Escape backticks and backslashes for JavaScript template literal
  // Note: We do NOT escape ${} because we need ${LANG_MESSAGES.xxx} to work at runtime
  const escapedSource = processedSource
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`');

  // Return as a function that returns the HTML string with template literal
  return `module.exports = function() { return \`${escapedSource}\`; };`;
};
