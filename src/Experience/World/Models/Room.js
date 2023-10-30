import * as THREE from "three"
import CANNON from "cannon"
import utils from 'canvas-sketch-util'

import PARAMS from "../../Utils/PARAMS"

import Experience from "../../Experience"
import Materials from "../../Resources/Materials"




export default class Room 
{
    constructor()
    {
        // Time
        this.clock = new THREE.Clock()
        this.oldElapsedTime = 0

        this.experience = new Experience()
        this.materials = new Materials()

        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)

        this.instance = new THREE.Group()

        this.status = 1

        // Set models
        this.setWalls()
        this.setFloor()
        this.setBall()

        // Set physic
        this.setPhysicBall()
        this.setPhysicFloor()
        this.setPhysicWalls()

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

    setPhysicBall()
    {
        this.ballShape = new CANNON.Sphere(PARAMS.sphere.radius)
        this.ballBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(-3, PARAMS.sphere.radius + 2),
            shape: this.ballShape
        })
        this.world.addBody(this.ballBody)
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

    setPhysicWalls()
    {
        this.leftWallShape = new CANNON.Plane()
        this.leftWallBody = new CANNON.Body({
            mass: 0,
            shape: this.leftWallShape,
            position: new CANNON.Vec3(- PARAMS.room.width / 2, PARAMS.room.height / 2, 0)
        })
        this.rightWallShape = new CANNON.Plane()
        this.rightWallBody = new CANNON.Body({
            mass: 0,
            shape: this.rightWallShape,
            position: new CANNON.Vec3(PARAMS.room.width / 2, PARAMS.room.height / 2, 0)
        })
        this.backWallShape = new CANNON.Plane()
        this.backWallBody = new CANNON.Body({
            mass: 0,
            shape: this.backWallShape,
            position: new CANNON.Vec3(0, PARAMS.room.height / 2, - PARAMS.room.depth / 2)
        })

        this.world.addBody(this.leftWallBody)
        this.world.addBody(this.rightWallBody)
        this.world.addBody(this.backWallBody)

        this.leftWallBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(0, 1, 0),
            Math.PI * 0.5
        )

        this.rightWallBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(0, 1, 0),
            - Math.PI * 0.5
        )
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

    setPhysicFloor()
    {
        this.floorShape = new CANNON.Plane()
        this.floorBody = new CANNON.Body({
            mass: 0,
            shape: this.floorShape,
        })
        this.world.addBody(this.floorBody)

        this.floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI * 0.5
        )
    }

    changeWidth(value)
    {
        const widthUpdate = utils.math.mapRange(value, 0, 10, 0, 10)

        // this.leftWall.position.x = - PARAMS.room.width / 2
        // this.rightWall.position.x = PARAMS.room.width / 2

        this.backWall.geometry = new THREE.PlaneGeometry(widthUpdate, PARAMS.room.height, 1, 1)

        this.floor.geometry = new THREE.PlaneGeometry(widthUpdate, PARAMS.floor.sideY, 1, 1)

        this.leftWallBody.position.x = - PARAMS.room.width / 2
        this.leftWall.position.copy(this.leftWallBody.position)
        this.rightWallBody.position.x = PARAMS.room.width / 2
        this.rightWall.position.copy(this.rightWallBody.position)

    }

    update()
    {
        const elaspesTime = this.clock.getElapsedTime()
        const deltaTime = elaspesTime - this.oldElapsedTime
        this.oldElapsedTime = elaspesTime

        // Update physics
        this.world.step(1 / 60, deltaTime, 3)


        // console.log(this.ballBody.position);
        this.ball.position.copy(this.ballBody.position)
        this.ball.quaternion.copy(this.ballBody.quaternion)



    }


    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            const folderRoom = this.debug.ui.addFolder('Room')
            folderRoom.add(PARAMS.room, 'width', PARAMS.sphere.radius * 2, 10, 0.01).name('width').onChange((value) =>
            {
                this.changeWidth(value)

            })
            folderRoom.add(PARAMS.floor, 'rotateY', -Math.PI / 2, Math.PI / 2, 0.01).name('floor rotation').onChange((value) =>
            {
                // this.floorBody.quaternion.setFromAxisAngle(
                //     new CANNON.Vec3(1, 0, 0),
                //     value
                // )
                // this.floorBody.quaternion.setFromAxisAngle(
                //     new CANNON.Vec3(1, 1, 0),
                //     Math.PI / 2
                // )
                // this.floorBody.quaternion.setFromAxisAngle(
                //     new CANNON.Vec3(-1, 0, 0),
                //     value
                // )
                this.floor.rotation.y = value
                this.floorBody.quaternion.copy(this.floor.quaternion)
            })
        }
    }
}
