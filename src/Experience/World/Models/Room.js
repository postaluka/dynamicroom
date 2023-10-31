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
            mass: 100,
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

        // this.ball.position.copy(this.ballBody.position)
        // this.ball.quaternion.copy(this.ballBody.quaternion)

        this.ball.position.copy(this.physics.ballBody.position)
        this.ball.quaternion.copy(this.physics.ballBody.quaternion)



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








// checkSubtract()
// {
//     this.params = {
//         operation: SUBTRACTION,
//         useGroups: true,
//         wireframe: false,
//     };
//     // create brushes
//     this.evaluator = new Evaluator();
//     this.baseBrush = new Brush(
//         new THREE.SphereGeometry(2, 16, 16),
//         new THREE.MeshStandardMaterial({
//             flatShading: false,

//             polygonOffset: true,
//             polygonOffsetUnits: 1,
//             polygonOffsetFactor: 1,
//         }),
//     );

//     this.brush = new Brush(
//         new THREE.BoxGeometry(1.5, 1.5, 1.5),
//         new THREE.MeshStandardMaterial({
//             color: 0x80cbc4,

//             polygonOffset: true,
//             polygonOffsetUnits: 1,
//             polygonOffsetFactor: 1,

//         }),
//     );

//     this.brush.geometry.translate(0, 2, 0)



//     this.evaluator.useGroups = this.params.useGroups;
//     this.result = this.evaluator.evaluate(this.baseBrush, this.brush, this.params.operation, this.result);

//     this.result.castShadow = true;
//     this.result.receiveShadow = true;
//     this.instance.add(this.result);

// }