const TS = require("rollup-plugin-typescript2");

module.exports = {
  input: ["src/index.ts", "src/utils/index.ts"],
  output: {
    dir: "lib",
    format: "esm",
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [TS()],
  external: ["react"],
};
