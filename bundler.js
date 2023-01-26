const os = require('os');
const fs = require('fs-extra');
const path = require('path');

const { rollup } = require('rollup');
const svelte = require('rollup-plugin-svelte');
const resolve = require('@rollup/plugin-node-resolve');

const tmpdir = os.tmpdir();
const emptyFile = path.join(tmpdir, 'App.svelte');
const modulesDir = path.join(tmpdir, './node_modules');
// Ensure we have an empty file at root in functions execution
fs.writeFileSync(emptyFile, '');
fs.rmSync(modulesDir, { force: true, recursive: true });
fs.copySync('./node_modules', modulesDir);

module.exports = async function bundler(content, { autorun = false }) {
  const bundle = await rollup({
    input: emptyFile,
    resolveId(source, importer) {
      console.log(source, importer);
      return null;
    },
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
