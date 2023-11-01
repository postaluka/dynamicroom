import * as THREE from "three"

import PARAMS from "../../Global/PARAMS"
import Materials from "../../Resources/Materials"

export default class Primitives
{
    constructor(room)
    {
        this.materials = new Materials()
        this.setBall(room)
        this.setCube(room)
    }

    setBall(room)
    {
        this.ball = new THREE.Mesh(
            new THREE.SphereGeometry(PARAMS.sphere.radius, 16, 16),
            this.materials.basic
        )
        room.add(this.ball)

        this.ball.position.y = 3

    }

    setCube(room)
    {
        this.cubes = new THREE.Group()
        room.add(this.cubes)
        this.cubes.position.set(3, 0.5, 0)

        // this.cubes.rotation.y = - Math.PI / 4

        this.cube01 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            this.materials.basic
        )
        this.cube02 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            this.materials.basic
        )
        this.cube03 = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            this.materials.basic
        )

        this.cube01.position.set(0, 0, 0)
        this.cube02.position.set(0, 1, 0)
        this.cube03.position.set(1, 0, 0)

        this.cubes.add(this.cube01, this.cube02, this.cube03)

    }
}