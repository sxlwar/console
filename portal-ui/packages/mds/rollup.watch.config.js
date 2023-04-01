const { terser } = require("rollup-plugin-terser");
const { default: dts } = require("rollup-plugin-dts");
console.log(dts);
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const copy = require("rollup-plugin-copy");
const rollup = require("rollup");

const packageJson = require("./package.json");

const watchOptions = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      terser(),
      copy({
        targets: [{ src: "src/components/assets", dest: "dist" }],
      }),
    ],
    external: ["react", "react-dom", "styled-components"],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/mds.d.ts", format: "es" }],
    plugins: [dts()],
  },
];

const watcher = rollup.watch(watchOptions);

watcher.on("event", (event) => {
  switch (event.code) {
    case "START":
      console.info("Rebuilding...");
      break;
    case "BUNDLE_START":
      console.info("Bundling...");
      break;
    case "BUNDLE_END":
      console.info("Bundled!");
      break;
    case "END":
      console.info("Done!");
      break;
    case "ERROR":
      console.info("Rollup error", event);
      break;
  }
});

process.on("exit", () => watcher.close());
