namespace SpriteKind {
    export const Terrain = SpriteKind.create()
}
/**
 * MODE SYSTEM
 */
/**
 * --------------------
 */
/**
 * --------------------
 */
// --------------------
// SWITCH MATH MODE
// --------------------
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    mode += 1
    if (mode > 2) {
        mode = 0
    }
    if (mode == 0) {
        game.splash("Linear World")
    } else if (mode == 1) {
        game.splash("Quadratic World")
    } else {
        game.splash("Exponential World")
    }
})
// --------------------
// GENERATE TERRAIN FUNCTION
// --------------------
function generateTerrain (x: number) {
    // ground level row
    baseY = 10
    // LINEAR WORLD (flat bridge)
    // QUADRATIC WORLD (hill)
    // EXPONENTIAL WORLD (steep curve)
    if (mode == 0) {
        tiles.setTileAt(tiles.getTileLocation(x, baseY), assets.tile`transparency16`)
    } else if (mode == 1) {
        y = Math.round((x % 10 - 5) * (x % 10 - 5) / 6)
        tiles.setTileAt(tiles.getTileLocation(x, baseY - y), assets.tile`Graph Blocks`)
    } else {
        expX = x % 10
        y2 = Math.round(1.25 ** expX)
        tiles.setTileAt(tiles.getTileLocation(x, baseY - y2), assets.tile`Graph Blocks`)
    }
}
let worldX = 0
let playerTileX = 0
let y2 = 0
let expX = 0
let y = 0
let baseY = 0
let mode = 0
scene.setBackgroundImage(assets.image`Background`)
let Player_Girl = sprites.create(assets.image`Player`, SpriteKind.Player)
controller.moveSprite(Player_Girl, 100, 0)
scene.cameraFollowSprite(Player_Girl)
Player_Girl.ay = 300
tiles.setCurrentTilemap(tilemap`level`)
scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
// --------------------
// INFINITE GENERATION LOOP
// --------------------
game.onUpdate(function () {
    playerTileX = Player_Girl.x / 16
    // generate ahead of player
    for (let i = 0; i <= 9; i++) {
        generateTerrain(playerTileX + i)
    }
    worldX += 1
})
