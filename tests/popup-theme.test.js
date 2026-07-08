const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const popupHtml = fs.readFileSync(path.join(root, 'popup.html'), 'utf8');
const popupJs = fs.readFileSync(path.join(root, 'popup.js'), 'utf8');

test('popup uses the Prompter neutral theme tokens', () => {
  assert.match(popupHtml, /--bg:\s*#e8e8e8/);
  assert.match(popupHtml, /--primary:\s*#1a1a1a/);
  assert.match(popupHtml, /--control-bg:\s*#f1f1f3/);
  assert.match(popupHtml, /--control-hover:\s*#e8e8e8/);
});

test('mode, export, and import controls use the Prompter control classes', () => {
  assert.match(popupHtml, /\.mode-button\s*\{[\s\S]*background-color:\s*var\(--primary\)/);
  assert.match(popupHtml, /\.export-button[\s\S]*background-color:\s*var\(--control-bg\)/);
  assert.match(popupHtml, /\.import-button[\s\S]*background-color:\s*var\(--control-bg\)/);
});

test('popup source no longer uses the old blue primary button palette', () => {
  const source = `${popupHtml}\n${popupJs}`;
  assert.doesNotMatch(source, /#4285f4/i);
  assert.doesNotMatch(source, /#3b78e7/i);
  assert.doesNotMatch(source, /#1890ff|#e8f0fe|#1a73e8|#f44336/i);
});

test('delete controls use the Prompter danger button styling', () => {
  assert.match(popupHtml, /\.button\.danger\s*\{/);
  assert.equal((popupJs.match(/deleteButton\.className = 'button danger'/g) || []).length, 2);
});
