const fs = require('fs');
const { rollup } = require('rollup');
const svelte = require('rollup-plugin-svelte');
const resolve = require('@rollup/plugin-node-resolve');

const emptyFile = 'tmp/App.svelte';
// Ensure we have an empty file at root in functions execution
fs.writeFileSync(emptyFile, '');

module.exports = async function bundler(content, { autorun = false }) {

  console.log('readdir .');
  fs.readdirSync('.').forEach((file) => {
    console.log(file);
  });
  console.log('readdir tmp');
  fs.readdirSync('tmp').forEach((file) => {
    console.log(file);
  });
  console.log('process.cwd()');
  console.log(process.cwd());

  const bundle = await rollup({
    input: emptyFile,
    plugins: [
      {
        name: 'Dynamic file loader',
        load(id) {
          if (id.includes(emptyFile)) {
            return content;
          }
          return null;
        },
      },
      svelte({ emitCss: false }),
      resolve({ browser: true }),
    ],
  });

  // Omitting name is on purpose to avoid names conflict
  const { output } = await bundle.generate({ name: void 0, format: 'iife' });
  const { code } = output[0];

  if (autorun) {
    return `(() => { const App = ${code}; new App({ target: document.body }); })()`;
  }
  return code;
};
