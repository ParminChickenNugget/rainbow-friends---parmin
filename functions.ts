// Add functions here to keep things organized
function spawnFriends(){
    for(let frd of frdDatabase){
        let frdSprite = sprites.create(frd.img, SpriteKind.Player)
        tiles.placeOnTile(frdSprite, tiles.getTileLocation(1, 15))
        // add gravity
        frdSprite.ay = 350
        // save data to sprite
        sprites.setDataString(frdSprite, "name", frd.name)
    }
    // Switch camera to first friend
    let frdSprites = sprites.allOfKind(SpriteKind.Player)
    switchToPlayer(frdSprites.get(0))
}

function switchToPlayer(activePlayer: Sprite){
    scene.cameraFollowSprite(activePlayer)
    controller.moveSprite(activePlayer, 100, 0)
    // add hop to player
    activePlayer.vy = -50
    currentPlayer = activePlayer

    // load friends
    let frd = loadFriend(activePlayer)
    unWallTiles(frd.openDoorImg)
}

function switchToAnotherPlayer(){
    let frdSprites = sprites.allOfKind(SpriteKind.Player)
    let frdIndex = frdSprites.indexOf(currentPlayer)
    // reset all players controls
    for (let frd of frdSprites){
        controller.moveSprite(frd, 0, 0)
    }
    // Check if frdIndex is 2
    if(frdIndex == frdSprites.length - 1){
        // Switch to the first player
        switchToPlayer(frdSprites.get(0))
    }
    else {
        // switch to the next player in the array
        switchToPlayer(frdSprites[frdIndex + 1])
    }

}

function jump (activePlayer: Sprite) {
    // Check if the activePlayer is currently on the ground
    if (!activePlayer.isHittingTile(CollisionDirection.Bottom)){
        return
    }
    let frd = loadFriend(activePlayer)
    activePlayer.vy = -1 * frd.jumpHeight
}

function loadFriend(sprite: Sprite) : Friend {
    // Read the name from the sprite
    let name = sprites.readDataString(sprite, "name")

    // Loop our database 
    for (let frd of frdDatabase){
        // If the name of our frd matches the name inside of our sprites
        // Return the frd
        if (name == frd.name){
            return frd
        }
    }
    return null
}

function checkWall(activePlayer: Sprite, location: tiles.Location){
    // Get the tile's image
    let tileImg = tiles.getTileImage(location)
    // Get the index of colorTiles from database
    let colouredTileIndex = coloredTiles.indexOf(tileImg)
    // if the wall is not a coloured tile, do nothing
    if (colouredTileIndex < 0 ){
        // do nothing
        return
    }
    // load the friend who is touching the wall
    let frd = loadFriend(activePlayer)
    // check frd's breakbrick image -- is it equal to the tile img?
    if (frd.breakBrickImg == tileImg){
        // we can break this brick
        brickBreakSpecialEffects(location)
        getRidOfStupidWall(location)
    }

    if(colouredTileIndex < 3){
        tryUsingKey(activePlayer, location)
    }
}

function getRidOfStupidWall(location: tiles.Location){
        tiles.setTileAt(location, assets.tile`Empty`)
        tiles.setWallAt(location, false)
}

function brickBreakSpecialEffects(location: tiles.Location){
    let tileImg = tiles.getTileImage(location)
    let tempSprite = sprites.create(tileImg, SpriteKind.Projectile)
    tiles.placeOnTile(tempSprite, location)
    tempSprite.destroy(effects.disintegrate, 500)
}

function unWallTiles(tileImg: Image){
    // reset all colored tiles to walls first 
    for (let coloredTile of coloredTiles){
        let locations = tiles.getTilesByType(coloredTile)
        for (let location of locations){
            tiles.setWallAt(location, true)
        }
    }

    let locations = tiles.getTilesByType(tileImg)

    for (let location of locations){
        tiles.setWallAt(location, false)
    }
}

function getKey(activePlayer: Sprite, location: tiles.Location){
    let frd = loadFriend(activePlayer)
    frd.keyCount += 1
    // Remove key
    getRidOfStupidWall(location)
}

function tryUsingKey(activePlayer: Sprite, location: tiles.Location){
    let frd = loadFriend(activePlayer)
    // only unlock door if we have a key currently
    if(frd.keyCount > 0){
        frd.keyCount -= 1
        getRidOfStupidWall(location)
    }
}

function climbLadder(activePlayer: Sprite){
    if(controller.up.isPressed()){
        activePlayer.vy = -50
    }
    if(controller.down.isPressed()){
     activePlayer.vy = 50
    }
    else{
        activePlayer.vy = 0
    }
}

function reachedFlag(activePlayer: Sprite){
    activePlayer.setKind(SpriteKind.FinishedPlayer)
    activePlayer.say("I made it")
    if (sprites.allOfKind(SpriteKind.Player). length == 0){
        game.over(true)
    }
    controller.moveSprite(activePlayer, 0,0)
    switchToAnotherPlayer()

}