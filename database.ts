// This file stores all information needed for the game

interface Friend {
    name: string
    img: Image
    jumpHeight: number
    keyCount: number
    openDoorImg: Image
    breakBrickImg: Image
}

let frdDatabase : Friend[] = [
    {
        name: 'Red',
        img: assets.image`Red`,
        jumpHeight: 200,
        keyCount: 0,
        openDoorImg: assets.tile`Red door`,
        breakBrickImg: null
    } as Friend,
    {
        name: 'Blue',
        img: assets.image`Blue`,
        jumpHeight: 180,
        keyCount: 0,
        openDoorImg: assets.tile`Blue door`,
        breakBrickImg: assets.tile`Blue brick`,
    },
    {
        name: 'Green',
        img: assets.image`Green`,
        jumpHeight: 400,
        keyCount: 0,
        openDoorImg: assets.tile`Green door`,
        breakBrickImg: null,
    },
]

let coloredTiles : Image[] = [
    assets.tile`Red door`,      // Index = 0
    assets.tile`Blue door`,     // Index = 1   
    assets.tile`Green door`,    // Index = 2
    assets.tile`Blue brick`,    // Index = 3
]