import resolve from "rollup-plugin-node-resolve"
import builtins from "rollup-plugin-node-builtins"
import commonjs from "rollup-plugin-commonjs"
import typescript from "rollup-plugin-typescript"
import { builder } from "./helper"

export default {
	input: "src/app.ts",
	output: [
		builder("umd", "color-code.js"),
		builder("esm", "color-code.esm.js"),
		builder("cjs", "color-code.cjs.js"),
		builder("iife", "color-code.iife.js")
	],
	plugins: [
		resolve({preferBuiltins: false}),
		builtins(),
		typescript(),
		commonjs({extensions: [".ts", ".js"]})
	]
}
