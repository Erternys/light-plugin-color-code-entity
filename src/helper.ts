import { Objects } from "light-engine"

export function debugCenter(
  context: CanvasRenderingContext2D,
  entity: Objects.Entity
) {
  const body = entity.getBodyBox()
  const x = entity.x + entity.scene.camera.x
  const y = entity.y + entity.scene.camera.y

  context.beginPath()
  context.fillStyle = "#f00"
  context.arc(x, y, 2, 0, Math.PI * 2)
  context.fill()
  context.closePath()
  context.translate(
    (entity.width * entity.getScale().x) / -2,
    (entity.height * entity.getScale().y) / -2
  )
  context.translate(
    (entity.width / 2) * -entity.getOrigin().x * entity.getScale().x,
    (entity.height / 2) * -entity.getOrigin().y * entity.getScale().y
  )
  context.strokeStyle = "green"
  context.strokeRect(
    x + body.getX(),
    y + body.getY(),
    body.getWidth(),
    body.getHeight()
  )
  context.setTransform(1, 0, 0, 1, 0, 0)
}
export function isChromium() {
  return navigator.vendor === "Google Inc."
}
export function isDefined(v: any) {
  return v !== undefined && v !== null
}
