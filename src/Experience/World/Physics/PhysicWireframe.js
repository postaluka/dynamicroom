import * as THREE from 'three'

// import PhysicSofa from './PhysicSofa'
import Materials from '../../Resources/Materials'
import PARAMS from '../../Global/PARAMS'

export default class PhysicsWireframe
{
    constructor()
    {

        this.materials = new Materials()
        // this.physicSofa = new PhysicSofa

        // this.shapeBottom()


    }


    shapeBottom()
    {
        this.shapeBottom = new THREE.Mesh(
            new THREE.BoxGeometry(2.02, 0.14, 0.94),
            this.materials.wireframe
        )
        this.shapeBottom.geometry.translate(0.00047, 0.1914, 0)
        this.shapeBottom.position.copy(this.physicSofa.shapeBottom.position)
    }
}