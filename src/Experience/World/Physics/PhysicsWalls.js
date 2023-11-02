import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import PARAMS from "../../Global/PARAMS";

export default class PhysicsWalls
{
    constructor(world)
    {

        this.setPhysicWalls(world)
        this.setPhysicFloor(world)
        this.setPhysicCeiling(world)
    }

    setPhysicWalls(world)
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
            position: new CANNON.Vec3(0, PARAMS.room.height / 2, -PARAMS.room.depth / 2)
        })
        this.frontWallShape = new CANNON.Plane()
        this.frontWallBody = new CANNON.Body({
            mass: 0,
            shape: this.frontWallShape,
            position: new CANNON.Vec3(0, PARAMS.room.height / 2, PARAMS.room.depth / 2)
        })

        world.addBody(this.leftWallBody)
        world.addBody(this.rightWallBody)
        world.addBody(this.backWallBody)
        world.addBody(this.frontWallBody)

        this.leftWallBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(0, 1, 0),
            Math.PI * 0.5
        )

        this.rightWallBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(0, 1, 0),
            - Math.PI * 0.5
        )

        this.frontWallBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(0, 1, 0),
            - Math.PI
        )

    }


    setPhysicFloor(world)
    {
        this.floorShape = new CANNON.Plane()
        this.floorBody = new CANNON.Body({
            mass: 0,
            shape: this.floorShape,
        })
        world.addBody(this.floorBody)

        this.floorBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(-1, 0, 0),
            Math.PI * 0.5
        )
    }

    setPhysicCeiling(world)
    {
        this.ceilingShape = new CANNON.Plane()
        this.ceilingBody = new CANNON.Body({
            mass: 0,
            shape: this.ceilingShape,
            position: new CANNON.Vec3(0, 4, -2)
        })
        world.addBody(this.ceilingBody)

        this.ceilingBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(1, 0, 0),
            Math.PI * 0.5
        )
    }
}