import * as THREE from "three"
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { SUBTRACTION, INTERSECTION, ADDITION, Brush, Evaluator } from 'three-bvh-csg';

import CANNON from "cannon"
import utils from 'canvas-sketch-util'

import PARAMS from "../../Global/PARAMS"
import Experience from "../../Experience"
import Materials from "../../Resources/Materials"

import Primitives from "./Primitives";

import Physics from "../Physics/Physics"

import Sofa from './Sofa'

export default class Walls
{
    constructor(room)
    {
        this.materials = new Materials()

        this.positionWindowX = 2.2
        this.widthWindowGeometry = 1.5

        this.setWalls(room)
        this.setBg(room)
    }

    setWalls(room)
    {
        this.setSides(room)
        this.setBackWall(room)
        this.setFloor(room)
        this.setCeiling(room)

        this.setSidesCubes()

    }

    setSides(room)
    {
        this.leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )

        this.rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.room.width, PARAMS.room.height, 1, 1),
            this.materials.basic
        )

        room.add(
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

    setBackWall(room)
    {

        this.backWall = new Brush(
            new THREE.BoxGeometry(PARAMS.room.width, PARAMS.room.height, 0.25),
            this.materials.basic
        )
        this.backWall.geometry.translate(0, PARAMS.room.height / 2, - PARAMS.room.depth / 2)

        this.setWindows()
        this.subtact(room)

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

    subtact(room)
    {

        this.evaluator = new Evaluator()
        this.evaluator.useGroups = true;
        this.resultLeft = this.evaluator.evaluate(this.backWall, this.windowsGroup, SUBTRACTION, this.resultLeft);

        this.resultLeft.castShadow = true;
        this.resultLeft.receiveShadow = true;
        room.add(this.resultLeft);
    }

    setFloor(room)
    {
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.floor.sideX, PARAMS.floor.sideY, 1, 1),
            this.materials.basic
        )
        room.add(this.floor)

        this.floor.receiveShadow = true
        // room.castShadow = true

        // Coordinates
        this.floor.rotation.x = - Math.PI / 2
    }

    setCeiling(room)
    {
        this.ceiling = new THREE.Mesh(
            new THREE.PlaneGeometry(PARAMS.floor.sideX, PARAMS.floor.sideY, 1, 1),
            this.materials.basic
        )
        room.add(this.ceiling)

        this.ceiling.receiveShadow = true
        // room.castShadow = true

        // Coordinates
        this.ceiling.rotation.x = - Math.PI / 2
        this.ceiling.position.y = PARAMS.room.height

    }

    setBg(room)
    {
        this.bgPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 15, 1, 1),
            this.materials.bg
        )
        this.bgPlane.position.set(0, 7.5, - PARAMS.room.depth - 26)
        room.add(this.bgPlane)
    }

    setSidesCubes()
    {
        this.leftCube = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.room.width, PARAMS.room.height, PARAMS.room.depth),
            this.materials.basic
        )
        this.leftCube.position.z = - PARAMS.room.width / 2
        this.leftWall.add(this.leftCube)

        this.rightCube = new THREE.Mesh(
            new THREE.BoxGeometry(PARAMS.room.width, PARAMS.room.height, PARAMS.room.depth),
            this.materials.basic
        )
        this.rightCube.position.z = PARAMS.room.width / 2
        this.rightWall.add(this.rightCube)


    }
}