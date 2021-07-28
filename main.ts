namespace SpriteKind {
    export const FinishedPlayer = SpriteKind.create()
}

scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    checkWall(sprite, location)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    switchToAnotherPlayer()
})
let currentPlayer: Sprite = null
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    jump(currentPlayer)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`Blue door`, function (sprite, location) {
    tryUsingKey(sprite, location)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`Green door`, function (sprite, location) {
    tryUsingKey(sprite, location)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`Red door`, function (sprite, location) {
    tryUsingKey(sprite, location)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`Key`, function (sprite, location) {
    getKey(sprite, location)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`Ladder`, function (sprite, location) {
if (currentPlayer == sprite){
    climbLadder(sprite)
}
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`Flag`, function (sprite, location) {
  reachedFlag(sprite)
})

tiles.setTilemap(tilemap`level1`)
spawnFriends()
