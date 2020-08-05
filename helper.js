export function builder(format, filename){
	return {
		exports: "named",
		name: "ColorCode",
		file: "lib/" + filename,
		format
	}
}