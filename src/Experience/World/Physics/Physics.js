import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'

import PARAMS from "../../Global/PARAMS";

import Experience from '../../Experience';

import PhysicsWalls from './PhysicsWalls';
import PhysicsPrimitives from './PhysicsPrimitives';
import PhysicSofa from './PhysicSofa';

// import Spheres from "./Models/Spheres";

console.log(CannonDebugger);

export default class Physics
{
    constructor(scene)
    {
        this.experience = new Experience()

        // Time
        this.clock = new THREE.Clock()
        this.oldElapsedTime = 0

        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.82, 0)
        this.world.broadphase = new CANNON.SAPBroadphase(this.world)

        this.cannonDebugger = new CannonDebugger(
            this.experience.scene,
            this.world
        )

        this.physicsWalls = new PhysicsWalls(this.world)
        this.physicsPrimitives = new PhysicsPrimitives(this.world)
        this.physicSofa = new PhysicSofa()

        this.setPhysicSofa()

    }


    setPhysicSofa()
    {
        this.world.addBody(this.physicSofa.sofaBody)
    }

    changePosition(geometry, rigidBody)
    {
        rigidBody.position.x = - PARAMS.room.width / 2
        geometry.position.copy(rigidBody.position)

    }

    update()
    {
        const elaspesTime = this.clock.getElapsedTime()
        const deltaTime = elaspesTime - this.oldElapsedTime
        this.oldElapsedTime = elaspesTime

        // Update physics
        this.world.step(1 / 60, deltaTime, 3)
        this.cannonDebugger.update()


        // console.log(deltaTime);
    }


}