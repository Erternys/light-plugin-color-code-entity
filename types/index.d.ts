import { Objects } from "light-engine"

export class ColorCodeImageEntity extends Objects.ObjectEntities.Image {
  keepAlpha(value: boolean): this
  setAlpha(value: number): this
  getAlpha(): number
  changeColor(
    from: [number, number, number],
    to: [number, number, number]
  ): this
  removeColor(from: [number, number, number]): this
}
export class ColorCodeSpriteEntity extends Objects.ObjectEntities.Sprite {
  keepAlpha(value: boolean): this
  setAlpha(value: number): this
  getAlpha(): number
  changeColor(
    from: [number, number, number],
    to: [number, number, number]
  ): this
  removeColor(from: [number, number, number]): this
}
