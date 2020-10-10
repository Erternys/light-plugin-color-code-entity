# color-code-entity-light-plugin

<<<<<<< HEAD
warning: this plugin if use in a browser is useable only server

`@light-plugin/color-code-entity` adds 2 new entities ColorCodeImageEntity and ColorCodeSpriteEntity which itself adds new methods.
=======
`color-code-entity-light-plugin` adds 2 new entities ColorCodeImageEntity and ColorCodeSpriteEntity which itself adds new methods.
>>>>>>> 3b49a76a54b5e67165435b564894f36c49f1f2f1

```ts
keepAlpha(value: boolean): this
setAlpha(value: number): this
getAlpha(): number
changeColor(
    from: [red, green, blue],
    to: [red, green, blue]
): this
removeColor(from: [red, green, blue]): this
```

Example:

```js
class Entity extends ColorCodeImageEntity {
  init() {
    this.changeColor([253, 49, 80], [253, 49, 170])
  }
}
```

before:
![before](https://cdn.discordapp.com/attachments/520619420310175746/740643241535471696/image0.png)
after:
![after](https://cdn.discordapp.com/attachments/520619420310175746/740643245553483937/image1.png)
