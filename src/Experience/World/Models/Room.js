import * as THREE from "three"
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import CANNON from "cannon"
import utils from 'canvas-sketch-util'

import PARAMS from "../../Utils/PARAMS"

import Experience from "../../Experience"
import Materials from "../../Resources/Materials"

import Physics from "../Physics"
import { SUBTRACTION, INTERSECTION, ADDITION, Brush, Evaluator } from 'three-bvh-csg';

export default class Room 
{
    constructor()
    {
        // Time
        this.clock = new THREE.Clock()
        this.oldElapsedTime = 0

        this.experience = new Experience()
        this.materials = new Materials()

        this.physics = new Physics()

        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)

        this.instance = new THREE.Group()

        this.status = 1

        this.positionWindowX = 2.2
        this.widthWindowGeometry = 1.5

        // Set models
        this.setWalls()
        this.setBackWall()

        this.setFloor()
        this.setBall()
        this.setCube()
        this.setCeiling()

        this.debug()

        this.cubesWireframe()
        this.wallsWireframe()


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

    setCube()
    {
        this.cubes = new THREE.Group()
        this.instance.add(this.cubes)
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

        this.cubes.add(this.cube01, this.cube02, this.cube03,)






        // console.log(this.physics.cubeShape.halfExtents.x);
        // console.log(this.physics.cubeBody.shapes[0].halfExtents.x);

    }

    cubesWireframe()
    {
        this.cubeShape01 = new THREE.Mesh(
            new THREE.BoxGeometry(
                this.physics.cubeShape.halfExtents.x * 2,
                this.physics.cubeShape.halfExtents.y * 2,
                this.physics.cubeShape.halfExtents.z * 2
            ),
            this.materials.wireframe
        )
        this.cubeShape01.geometry.translate(0, 0, 0)
        this.cubeShape01.position.copy(this.physics.cubeBody.position)
        this.instance.add(this.cubeShape01)

        this.cubeShape02 = new THREE.Mesh(
            new THREE.BoxGeometry(
                this.physics.cubeShape.halfExtents.x * 2,
                this.physics.cubeShape.halfExtents.y * 2,
                this.physics.cubeShape.halfExtents.z * 2
            ),
            this.materials.wireframe
        )
        this.cubeShape02.geometry.translate(0, 1, 0)
        this.cubeShape02.position.copy(this.physics.cubeBody.position)
        this.instance.add(this.cubeShape02)

        this.cubeShape03 = new THREE.Mesh(
            new THREE.BoxGeometry(
                this.physics.cubeShape.halfExtents.x * 2,
                this.physics.cubeShape.halfExtents.y * 2,
                this.physics.cubeShape.halfExtents.z * 2
            ),
            this.materials.wireframe
        )
        this.cubeShape03.geometry.translate(1, 0, 0)
        this.cubeShape03.position.copy(this.physics.cubeBody.position)
        this.instance.add(this.cubeShape03)
    }

    wallsWireframe()
    {
        this.ceilingShape = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 5, 5),
            this.materials.wireframe
        )

        // this.ceilingShape.position.y = 2
        this.ceilingShape.position.copy(this.physics.ceilingBody.position)
        this.ceilingShape.quaternion.copy(this.physics.ceilingBody.quaternion)
        // this.instance.add(this.ceilingShape)

        this.frontWallShape = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10, 15, 15),
            this.materials.wireframe
        )

        // this.ceilingShape.position.y = 2
        this.frontWallShape.position.copy(this.physics.frontWallBody.position)
        this.frontWallShape.quaternion.copy(this.physics.frontWallBody.quaternion)
        this.instance.add(this.frontWallShape)
    }

    updateWireframe()
    {
        this.cubeShape01.position.copy(this.physics.cubeBody.position)
        this.cubeShape02.position.copy(this.physics.cubeBody.position)
        this.cubeShape03.position.copy(this.physics.cubeBody.position)

        this.cubeShape01.quaternion.copy(this.physics.cubeBody.quaternion)
        this.cubeShape02.quaternion.copy(this.physics.cubeBody.quaternion)
        this.cubeShape03.quaternion.copy(this.physics.cubeBody.quaternion)
    }

    setWalls()
    {
        this.leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )

        this.rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )

        this.instance.add(
            this.leftWall,
            this.rightWall,
        )

        this.leftWall.position.x = - PARAMS.room.width / 2
        this.rightWall.position.x = PARAMS.room.width / 2

        this.leftWall.position.y = PARAMS.room.height / 2
        this.rightWall.position.y = PARAMS.room.height / 2

        this.leftWall.rotation.y = Math.PI / 2
        this.rightWall.rotation.y = Math.PI / 2

    }

    setBackWall()
    {

        this.backWall = new Brush(
            new THREE.BoxGeometry(PARAMS.room.width, PARAMS.room.height, 0.25),
            this.materials.basic
        )
        this.backWall.geometry.translate(0, PARAMS.room.height / 2, - PARAMS.room.depth / 2)

        this.setWindows()
        this.subtact()

    }

    setWindows()
    {
        this.windowLeftGeometry = new THREE.BoxGeometry(this.widthWindowGeometry, 2, 0.5)
        this.windowRightGeometry = new THREE.BoxGeometry(this.widthWindowGeometry, 2, 0.5)

        this.windowLeftGeometry.translate(-this.positionWindowX, 3, - PARAMS.room.depth / 2)
        this.windowRightGeometry.translate(this.positionWindowX, 3, - PARAMS.room.depth / 2)

        this.windowsGroupGeometry = BufferGeometryUtils.mergeGeometries([
            this.windowLeftGeometry, this.windowRightGeometry
        ])

        this.windowsGroup = new Brush(
            this.windowsGroupGeometry,
            this.materials.basic
        )
    }

    subtact()
    {

        this.evaluator = new Evaluator()
        this.evaluator.useGroups = true;
        this.resultLeft = this.evaluator.evaluate(this.backWall, this.windowsGroup, SUBTRACTION, this.resultLeft);

        this.resultLeft.castShadow = true;
        this.resultLeft.receiveShadow = true;
        this.instance.add(this.resultLeft);
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

    setCeiling()
    {
        this.ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.floor.sideX, PARAMS.floor.sideY, 1, 1),
            this.materials.basic
        )
        this.instance.add(this.ceiling)

        this.ceiling.receiveShadow = true
        // this.instance.castShadow = true

        // Coordinates
        this.ceiling.rotation.x = - Math.PI / 2
        this.ceiling.position.y = PARAMS.room.height

    }

    changeWidth(value)
    {
        const widthUpdate = utils.math.mapRange(value, 0, 10, 0, 10)
        this.positionWindowX = utils.math.mapRange(value, 0, 10, -0.1, 2.2)
        this.widthWindowGeometry = utils.math.mapRange(value, 0, 10, 0.5, 1.5)

        this.backWall.geometry = new THREE.BoxGeometry(PARAMS.room.width, PARAMS.room.height, 0.25)
        this.backWall.geometry.translate(0, PARAMS.room.height / 2, - PARAMS.room.depth / 2)
        this.setWindows()
        this.subtact()

        this.floor.geometry = new THREE.PlaneGeometry(widthUpdate, PARAMS.floor.sideY, 1, 1)

        this.physics.leftWallBody.position.x = - PARAMS.room.width / 2
        this.leftWall.position.copy(this.physics.leftWallBody.position)
        this.physics.rightWallBody.position.x = PARAMS.room.width / 2
        this.rightWall.position.copy(this.physics.rightWallBody.position)

    }

    update()
    {
        const elaspesTime = this.clock.getElapsedTime()
        const deltaTime = elaspesTime - this.oldElapsedTime
        this.oldElapsedTime = elaspesTime

        // Update physics
        // this.world.step(1 / 60, deltaTime, 3)
        this.physics.world.step(1 / 60, deltaTime, 3)

        this.ball.position.copy(this.physics.ballBody.position)
        this.ball.quaternion.copy(this.physics.ballBody.quaternion)

        this.cubes.position.copy(this.physics.cubeBody.position)
        this.cubes.quaternion.copy(this.physics.cubeBody.quaternion)

        this.updateWireframe()


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

                this.floor.rotation.y = value
                this.physics.floorBody.quaternion.copy(this.floor.quaternion)
            })
        }
    }
}








