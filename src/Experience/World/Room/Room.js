import * as THREE from "three"
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { SUBTRACTION, INTERSECTION, ADDITION, Brush, Evaluator } from 'three-bvh-csg';

import utils from 'canvas-sketch-util'

import PARAMS from "../../Global/PARAMS"
import Experience from "../../Experience"

import Walls from "./Walls";
import Primitives from "./Primitives";

import Physics from "../Physics/Physics"

import Sofa from './Sofa'

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

        // Room group
        this.instance = new THREE.Group()

        this.physics = new Physics(this.instance)

        // Set primitives
        this.primitives = new Primitives(this.instance)

        // Set room
        this.walls = new Walls(this.instance)

        // Set models
        this.sofa = new Sofa(this.instance)

        // Set debug
        this.debug()

    }


    changeWidth(value)
    {
        const widthUpdate = utils.math.mapRange(value, 0, 10, 0, 10)
        this.walls.positionWindowX = utils.math.mapRange(value, 0, 10, -0.1, 2.2)
        this.walls.widthWindowGeometry = utils.math.mapRange(value, 0, 10, 0.5, 1.5)
        const bgPositionZ = utils.math.mapRange(value, 0, 10, -88, - PARAMS.room.depth - 26)
        const bgPositionY = utils.math.mapRange(value, 0, 10, 5, 7.5)

        this.walls.backWall.geometry = new THREE.BoxGeometry(PARAMS.room.width, PARAMS.room.height, 0.25)
        this.walls.backWall.geometry.translate(0, PARAMS.room.height / 2, - PARAMS.room.depth / 2)
        this.walls.setWindows()
        this.walls.subtact(this.instance)

        this.walls.floor.geometry = new THREE.PlaneGeometry(widthUpdate, PARAMS.floor.sideY, 1, 1)

        this.physics.physicsWalls.leftWallBody.position.x = - PARAMS.room.width / 2
        this.walls.leftWall.position.copy(this.physics.physicsWalls.leftWallBody.position)
        this.physics.physicsWalls.rightWallBody.position.x = PARAMS.room.width / 2
        this.walls.rightWall.position.copy(this.physics.physicsWalls.rightWallBody.position)

        this.walls.bgPlane.position.z = bgPositionZ
        this.walls.bgPlane.position.y = bgPositionY

    }

    update()
    {

        this.physics.update()

        this.primitives.ball.position.copy(this.physics.physicsPrimitives.ballBody.position)
        this.primitives.ball.quaternion.copy(this.physics.physicsPrimitives.ballBody.quaternion)

        this.primitives.cubes.position.copy(this.physics.physicsPrimitives.cubeBody.position)
        this.primitives.cubes.quaternion.copy(this.physics.physicsPrimitives.cubeBody.quaternion)

        this.sofa.instance.position.copy(this.physics.physicSofa.sofaBody.position)
        this.sofa.instance.quaternion.copy(this.physics.physicSofa.sofaBody.quaternion)

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

                this.walls.floor.rotation.y = value
                this.physics.physicsWalls.floorBody.quaternion.copy(this.walls.floor.quaternion)
            })
        }
    }

}








