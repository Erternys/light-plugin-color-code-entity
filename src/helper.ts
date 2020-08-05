export function debugCenter(context: any, x: number, y: number) {
  context.beginPath()
  context.fillStyle = "#f00"
  context.arc(x, y, 3, 0, Math.PI * 2)
  context.fill()
}
export function isChromium() {
  return navigator.vendor === "Google Inc."
}
export function isDefined(v: any) {
  return v !== undefined && v !== null
}
