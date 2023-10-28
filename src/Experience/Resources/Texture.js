import * as THREE from 'three'

import Loaders from '../Utils/Loaders'

export default class Textures
{
    constructor()
    {
        this.loader = new Loaders()

        this.environmentMap = this.loader.cube.load([
            '../../envMap/01/px.png',
            '../../envMap/01/nx.png',
            '../../envMap/01/py.png',
            '../../envMap/01/ny.png',
            '../../envMap/01/pz.png',
            '../../envMap/01/nz.png',
        ])

        // Bricks
        const bricks_x = 0.7
        const bricks_y = 0.7
        this.bricksColor = this.loader.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_Color.jpg')
        this.bricksColor.repeat.x = bricks_x
        this.bricksColor.repeat.y = bricks_y
        this.bricksColor.wrapS = THREE.RepeatWrapping
        this.bricksColor.wrapT = THREE.RepeatWrapping
        this.bricksDisplacement = this.loader.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_Displacement.jpg')
        this.bricksDisplacement.repeat.x = bricks_x
        this.bricksDisplacement.repeat.y = bricks_y
        this.bricksDisplacement.wrapS = THREE.RepeatWrapping
        this.bricksDisplacement.wrapT = THREE.RepeatWrapping
        this.bricksNormalGL = this.loader.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_NormalGL.jpg')
        this.bricksNormalGL.repeat.x = bricks_x
        this.bricksNormalGL.repeat.y = bricks_y
        this.bricksNormalGL.wrapS = THREE.RepeatWrapping
        this.bricksNormalGL.wrapT = THREE.RepeatWrapping
        // this.bricksAmbientOcclusion = this.loader.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_AmbientOcclusion.jpg')
        // this.bricksAmbientOcclusion.repeat.x = bricks_x
        // this.bricksAmbientOcclusion.repeat.y = bricks_y
        // this.bricksAmbientOcclusion.wrapS = THREE.RepeatWrapping
        // this.bricksAmbientOcclusion.wrapT = THREE.RepeatWrapping
        this.bricksRoughness = this.loader.textures.load('../../textures/Bricks061_1K-JPG/Bricks061_1K-JPG_Roughness.jpg')
        this.bricksRoughness.repeat.x = bricks_x
        this.bricksRoughness.repeat.y = bricks_y
        this.bricksRoughness.wrapS = THREE.RepeatWrapping
        this.bricksRoughness.wrapT = THREE.RepeatWrapping

    }
}