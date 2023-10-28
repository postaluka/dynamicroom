import * as THREE from 'three'

import Textures from './Texture'

export default class Materials
{
    constructor()
    {
        this.textures = new Textures()

        this.basic = new THREE.MeshStandardMaterial({
            metalness: 0.45,
            roughness: 0.65,
            side: THREE.DoubleSide,
        })

        this.bricks = new THREE.MeshStandardMaterial({
            map: this.textures.bricksColor,
            metalness: 0.6,
            roughnessMap: this.textures.bricksRoughness,
            displacementMap: this.textures.bricksDisplacement,
            displacementScale: 0,
            side: THREE.DoubleSide,
            // aoMap: this.textures.bricksAmbientOcclusion,
            // aoMapIntensity: 1
        })
        this.bricks.normalMap = this.textures.bricksNormalGL
        this.bricks.normalScale.set(0.7, 0.7)

    }
}