import * as THREE from "three"
import utils from 'canvas-sketch-util'

import PARAMS from "../../Utils/PARAMS"

import Experience from "../../Experience"
import Materials from "../../Resources/Materials"

import Physics from "../Physics"


export default class Room 
{
    constructor()
    {

        this.experience = new Experience()
        this.materials = new Materials()

        this.physics = new Physics()

        this.instance = new THREE.Group()

        this.status = 1

        this.setWalls()
        this.setFloor()
        this.setBall()

        this.debug()

    }

    setBall()
    {
        this.ball = new THREE.Mesh(
            new THREE.SphereGeometry(PARAMS.sphere.radius, 16, 16),
            this.materials.basic
        )
        this.instance.add(this.ball)

        this.ball.position.y = 3

    }

    setWalls()
    {
        this.leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )
        this.backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )
        this.rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )

        this.instance.add(
            this.leftWall,
            this.backWall,
            this.rightWall,
        )

        this.leftWall.position.x = - PARAMS.room.width / 2
        this.rightWall.position.x = PARAMS.room.width / 2

        this.leftWall.position.y = PARAMS.room.height / 2
        this.rightWall.position.y = PARAMS.room.height / 2

        this.leftWall.rotation.y = Math.PI / 2
        this.rightWall.rotation.y = Math.PI / 2

        this.backWall.position.z = - PARAMS.room.depth / 2
        this.backWall.position.y = PARAMS.room.height / 2


    }

    setFloor()
    {
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.floor.sideX, PARAMS.floor.sideY, 1, 1),
            this.materials.basic
        )
        this.instance.add(this.floor)

        this.floor.receiveShadow = true
        // this.instance.castShadow = true

        // Coordinates
        this.floor.rotation.x = - Math.PI / 2
    }

    changeWidth(value)
    {
        const widthUpdate = utils.math.mapRange(value, 0, 10, 0, 10)

        this.leftWall.position.x = - PARAMS.room.width / 2
        this.rightWall.position.x = PARAMS.room.width / 2

        this.backWall.geometry = new THREE.PlaneGeometry(widthUpdate, PARAMS.room.height, 1, 1)

        this.floor.geometry = new THREE.PlaneGeometry(widthUpdate, PARAMS.floor.sideY, 1, 1)


    }


    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            const folderRoom = this.debug.ui.addFolder('Room')
            folderRoom.add(PARAMS.room, 'width', 4, 10, 0.01).name('width').onChange((value) =>
            {
                this.changeWidth(value)

            })
        }
    }
}
