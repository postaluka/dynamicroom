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

        // Sofa body
        this.shapeBottom = new CANNON.Box(
            new CANNON.Vec3(2.02 * 0.5, 0.14 * 0.5, 0.94 * 0.5)
        )
        this.shapeTop = new CANNON.Box(
            new CANNON.Vec3(2.06 * 0.5, 0.76 * 0.5, 0.178 * 0.5)
        )
        // Sofa legs
        this.legLeft01Shape = new CANNON.Box(
            new CANNON.Vec3(0.12 * 0.5, 0.144 * 0.5, 0.114 * 0.5)
        )
        this.legLeft02Shape = new CANNON.Box(
            new CANNON.Vec3(0.12 * 0.5, 0.144 * 0.5, 0.114 * 0.5)
        )
        this.legRight01Shape = new CANNON.Box(
            new CANNON.Vec3(0.12 * 0.5, 0.144 * 0.5, 0.114 * 0.5)
        )
        this.legRight02Shape = new CANNON.Box(
            new CANNON.Vec3(0.12 * 0.5, 0.144 * 0.5, 0.114 * 0.5)
        )


        this.sofaBody = new CANNON.Body({
            mass: 1
        })
        // Sofa body
        this.sofaBody.addShape(this.shapeBottom, new CANNON.Vec3(0.00047, 0.1914, 0))
        this.sofaBody.addShape(this.shapeTop, new CANNON.Vec3(0.000477, 0.5, -0.4))
        // Sofa legs
        this.sofaBody.addShape(this.legLeft01Shape, new CANNON.Vec3(-0.94, 0.07, -0.39))
        this.sofaBody.addShape(this.legLeft02Shape, new CANNON.Vec3(-0.94, 0.07, 0.39))
        this.sofaBody.addShape(this.legRight01Shape, new CANNON.Vec3(0.94, 0.07, -0.39))
        this.sofaBody.addShape(this.legRight02Shape, new CANNON.Vec3(0.94, 0.07, 0.39))

    }
}