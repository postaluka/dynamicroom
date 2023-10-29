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
        this.setPhysicSphere()

        console.log(this.world);
    }

    setPhysicsWorld()
    {
        this.world.gravity.set(0, -9.82, 0)
    }

    setPhysicSphere()
    {
        this.sphereShape = new CANNON.Sphere(PARAMS.sphere.radius)
        this.sphereBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0, PARAMS.sphere.radius + 2),
            shape: this.sphereShape
        })
        this.world.addBody(this.sphereBody)
    }

    update(geometry, rigidBody)
    {
        const elaspesTime = this.clock.getElapsedTime()
        const deltaTime = elaspesTime - this.oldElapsedTime
        this.oldElapsedTime = elaspesTime

        // Update physics
        this.world.step(1 / 60, deltaTime, 3)


        geometry.position.copy(rigidBody.position)




        // console.log(deltaTime);

    }


}