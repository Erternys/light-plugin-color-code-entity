import { terser } from "rollup-plugin-terser"
import config from "./rollup.dev.config"
import { builder } from "./helper"

export default [config, {
  input: config.input,
  output: [
    builder("umd", "color-code.min.js"),
    builder("esm", "color-code.esm.min.js"),
    builder("cjs", "color-code.cjs.min.js"),
    builder("iife", "color-code.iife.min.js"),
  ],
  plugins: [
    ...config.plugins,
    terser(),
  ],
}]
