import * as THREE from 'three'
import CANNON from "cannon";
import PARAMS from "../../Global/PARAMS";

import PhysicsWalls from './PhysicsWalls';
import PhysicsPrimitives from './PhysicsPrimitives';
// import PhysicSofa from './PhysicSofa';

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
        this.world.gravity.set(0, -9.82, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)

        this.physicsWalls = new PhysicsWalls(this.world)
        this.physicsPrimitives = new PhysicsPrimitives(this.world)
        // this.physicSofa = new PhysicSofa()

        // this.setPhysicSofa()

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

    setPhysicCube()
    {
        this.cubeShape = new CANNON.Box(
            new CANNON.Vec3(0.5, 0.5, 0.5)
        )
        this.cubeBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(3, 0.5, 0)
        })
        this.cubeBody.addShape(this.cubeShape, new CANNON.Vec3(0, 0, 0))
        this.cubeBody.addShape(this.cubeShape, new CANNON.Vec3(0, 1, 0))
        this.cubeBody.addShape(this.cubeShape, new CANNON.Vec3(1, 0, 0))
        this.world.addBody(this.cubeBody)


    }

    setPhysicSofa()
    {
        this.world.addBody(this.physicSofa.ballBody)
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