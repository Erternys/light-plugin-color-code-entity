import { Objects } from "light-engine"
import { isChromium, isDefined, debugCenter } from "./helper"

export class ColorCodeImageEntity extends Objects.ObjectEntities.Image {
  private _keepAlpha = true
  private _update = true
  private _imageAlpha = 1
  private _changeColorMap = new Map<
    [number, number, number],
    [number, number, number]
  >()
  private _prevUse = ""
  private _prevImage: HTMLCanvasElement

  keepAlpha(value: boolean) {
    this._keepAlpha = value
    return this
  }
  setAlpha(value: number) {
    this._imageAlpha = value
    return this
  }
  getAlpha() {
    return this._imageAlpha
  }
  changeColor(from: [number, number, number], to: [number, number, number]) {
    this._changeColorMap.set(from, to)
    this._update = true
    return this
  }
  removeColor(from: [number, number, number]) {
    this._changeColorMap = new Map(
      Array.from(this._changeColorMap.entries()).filter(
        (v) => v[0][0] !== from[0] && v[0][1] !== from[1] && v[0][2] !== from[2]
      )
    )
    this._update = true
    return this
  }
  draw(context: CanvasRenderingContext2D) {
    const image = this.manager.medias.images.get(this.use)
    context.globalAlpha =
      this.alpha * (this.scene.isPlayed === "opacity" ? this.scene.alpha : 1)
    if (!this.fixed) context.translate(this.scene.camera.x, this.scene.camera.y)
    context.translate(
      (this.width * this.getScale().x) / -2,
      (this.height * this.getScale().y) / -2
    )
    context.translate(
      (this.width / 2) * -this.originX * this.getScale().x,
      (this.height / 2) * -this.originY * this.getScale().y
    )
    if (isDefined(image)) {
      if (!isDefined(this.width) && !isDefined(this.height)) {
        this.width = image.width
        this.height = image.height
      }
      if (this._prevUse !== this.use || this._update) {
        this.getImageData(image).then((image) => {
          this._prevImage = image
        })
        this._prevUse = this.use
        this._update = false
      }
      context.drawImage(
        this._prevImage || image,
        0,
        0,
        this.width * this.getCrop().w,
        this.height * this.getCrop().h,
        this.x - this.scene.camera.x,
        this.y - this.scene.camera.y,
        this.width * this.getScale().x,
        this.height * this.getScale().y
      )
    }
    context.setTransform(1, 0, 0, 1, 0, 0)
    if (this.scene.game.debug) debugCenter(context, this)
  }
  private getImageData(image: HTMLImageElement): Promise<HTMLCanvasElement> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      canvas.width = this.width
      canvas.height = this.height
      canvas.style.imageRendering = isChromium() ? "pixelated" : "crisp-edges"
      const context = canvas.getContext("2d")
      context.drawImage(image, 0, 0, this.width, this.height)
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      const changeColor = Array.from(this._changeColorMap.keys())
      for (let i = 0; i < imageData.data.length; i += 4) {
        const toColor = this._changeColorMap.get(
          changeColor.find(
            (rgb) =>
              rgb[0] === imageData.data[i] &&
              rgb[1] === imageData.data[i + 1] &&
              rgb[2] === imageData.data[i + 2]
          )
        )
        if (toColor) {
          imageData.data[i] = toColor[0]
          imageData.data[i + 1] = toColor[1]
          imageData.data[i + 2] = toColor[2]
          if (!this._keepAlpha) imageData.data[i + 3] = this._imageAlpha
        }
      }

      context.putImageData(imageData, 0, 0)
      resolve(canvas)
    })
  }
}
