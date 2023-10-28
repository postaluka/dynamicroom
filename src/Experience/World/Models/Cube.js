import * as THREE from "three"

import Sizes from "../../Utils/Sizes"

import EventEmitter from "../../Utils/EventEmitter"
import Experience from "../../Experience"
import Materials from "../../Resources/Materials"

import gsap from 'gsap'


export default class Cube extends EventEmitter
{
    constructor()
    {
        super()

        console.log(gsap);

        this.experience = new Experience()
        this.sizes = new Sizes()
        this.materials = new Materials()

        // Parameters
        this.sideX = 15
        this.sideY = 5
        this.sideZ = 4.8

        // Set cube
        this.instance = new THREE.Mesh(
            new THREE.BoxGeometry(this.sideX, this.sideY, this.sideZ),
            this.materials.basic
        )
        this.instance.receiveShadow = true
        this.instance.castShadow = true

        // Coordinates
        this.instance.position.y = this.sideY / 2

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // this.debug()



    }

    resize()
    {
        const maxWindowSize = window.screen.width
        const currentWindowSize = window.innerWidth
        const maxCubeSize = this.sideX
        const minCubeSize = 0
        console.log(maxWindowSize, currentWindowSize);
        // this.instance.geometry = new THREE.BoxGeometry(changeSizeX, this.sideY, this.sideZ)
    }

    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            this.debug.ui.add(this.instance.position, 'x', -10, 10, 0.01).name('position.x')
        }
    }
}
