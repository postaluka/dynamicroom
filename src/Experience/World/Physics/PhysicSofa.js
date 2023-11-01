import * as THREE from 'three'
import CANNON from "cannon";
import PARAMS from "../../Global/PARAMS";


export default class PhysicSofa
{
    constructor()
    {

        // this.setPhysicSofa()
    }


    setPhysicSofa()
    {
        // all c4d parameters : 100

        this.shapeBottom = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0.00047, 0.1914, 0),
            shape: new CANNON.Box(
                new CANNON.Vec3(2.02 * 0.5, 0.14 * 0.5, 0.94 * 0.5)
            )
        })

        this.shapeTop = new CANNON.Body({
            mass: 1,
            position: new CANNON.Vec3(0.000477, 0.5, 0.4),
            shape: new CANNON.Box(
                new CANNON.Vec3(2.06 * 0.5, 0.76 * 0.5, 0.178 * 0.5)
            )
        })



    }
}