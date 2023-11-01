import * as THREE from 'three'
import CANNON from "cannon";
import PARAMS from "../../Global/PARAMS";

export default class PhysicsPrimitives
{
    constructor(world)
    {
        this.setPhysicBall(world)
        this.setPhysicCube(world)
    }

    setPhysicBall(world)
    {
        this.ballSphere = new CANNON.Sphere(PARAMS.sphere.radius)
        this.ballBody = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(-3, PARAMS.sphere.radius + 2),
            shape: this.ballSphere
        })
        world.addBody(this.ballBody)
    }

    setPhysicCube(world)
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
        world.addBody(this.cubeBody)


    }
}