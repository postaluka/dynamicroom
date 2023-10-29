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
        this.setPhysicFloor()
        this.setPhysicWalls()

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
            position: new CANNON.Vec3(-3, PARAMS.sphere.radius + 2),
            shape: this.sphereShape
        })
        this.world.addBody(this.sphereBody)
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
        this.world.addBody(this.leftWallBody)

        this.leftWallBody.quaternion.setFromAxisAngle(
            new CANNON.Vec3(0, 1, 0),
            Math.PI * 0.5
        )

        // for (let i = 0; i < 3; i++)
        // {
        //     const wallShape = new CANNON.Plane()
        //     const wallBody = new CANNON.Body({
        //         mass: 0,
        //         shape: wallShape
        //     })
        //     this.world.addBody(this.floorBody)

        //     if (i % 2 === 0)
        //     {
        //         wallBody.position.x = PARAMS.room.width / 2 * this.status
        //         this.status *= -1

        //         wallBody.position.y = PARAMS.room.height / 2
        //         wallBody.quaternion.setFromAxisAngle(
        //             new CANNON.Vec3(-1, 0, 0),
        //             Math.PI * 0.5
        //         )
        //     }
        //     if (i % 2 !== 0)
        //     {
        //         wallBody.position.z = - PARAMS.room.depth / 2
        //         wallBody.position.y = PARAMS.room.height / 2
        //     }
        // }

    }

    changePosition(geometry, rigidBody)
    {
        rigidBody.position.x = - PARAMS.room.width / 2
        geometry.position.copy(rigidBody.position)

        console.log(rigidBody.position);

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