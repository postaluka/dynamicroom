import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import PARAMS from "../../Global/PARAMS";


export default class PhysicSofa
{
    constructor()
    {

        this.setPhysicSofa()
    }


    setPhysicSofa()
    {
        // all c4d parameters : 100

        this.shapeBottom = new CANNON.Box(
            new CANNON.Vec3(2.02 * 0.5, 0.14 * 0.5, 0.94 * 0.5)
        )
        this.shapeBottom.position = new CANNON.Vec3(0.00047, 0.1914, 0)

        this.shapeTop = new CANNON.Box(
            new CANNON.Vec3(2.06 * 0.5, 0.76 * 0.5, 0.178 * 0.5)
        )
        this.shapeTop.position = new CANNON.Vec3(0.000477, 0.5, -0.4)

        this.sofaBody = new CANNON.Body({
            mass: 1
        })
        this.sofaBody.addShape(this.shapeBottom)
        this.sofaBody.addShape(this.shapeTop)

    }
}