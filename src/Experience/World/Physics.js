import * as THREE from 'three'
import CANNON from "cannon";
import PARAMS from "../Utils/PARAMS";

// import Spheres from "./Models/Spheres";

export default class Physics
{
    constructor()
    {
        // Time
        this.clock = new THREE.Clock()
        this.oldElapsedTime = 0

        // this.spheres = new Spheres()

        this.world = new CANNON.World()

        this.setPhysicsWorld()
        this.setPhysicBall()
        this.setPhysicFloor()
        this.setPhysicWalls()

    }

    setPhysicsWorld()
    {
        this.world.gravity.set(0, -9.82, 0)
    }

    setPhysicBall()
    {
        this.ballSphere = new CANNON.Sphere(PARAMS.sphere.radius)
        this.ballBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(-3, PARAMS.sphere.radius + 2),
            shape: this.ballSphere
        })
        this.world.addBody(this.ballBody)
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

    changePosition(geometry, rigidBody)
    {
        rigidBody.position.x = - PARAMS.room.width / 2
        geometry.position.copy(rigidBody.position)

        console.log(rigidBody.position);

    }

    update()
    {
        const elaspesTime = this.clock.getElapsedTime()
        const deltaTime = elaspesTime - this.oldElapsedTime
        this.oldElapsedTime = elaspesTime

        // Update physics
        this.world.step(1 / 60, deltaTime, 3)

        // console.log(deltaTime);
    }


}