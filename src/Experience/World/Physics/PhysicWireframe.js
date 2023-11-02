import * as THREE from 'three'


import PhysicSofa from './PhysicSofa'
import Materials from '../../Resources/Materials'
import PARAMS from '../../Global/PARAMS'

export default class PhysicsWireframe
{
    constructor()
    {

        this.materials = new Materials()
        this.physicSofa = new PhysicSofa()

        this.shapeBottom, this.shapeTop
        this.sofaWireframe()


    }


    sofaWireframe()
    {
        this.shapeBottom()
        this.shapeTop()

        this.sofaMesh()

    }

    sofaMesh()
    {
        this.sofaMesh = new THREE.Group()
        this.sofaMesh.add(
            this.shapeBottom,
            this.shapeTop
        )

    }

    shapeBottom()
    {
        this.shapeBottomGeometrySize = new THREE.Vector3()
        this.shapeBottomGeometrySize.copy(this.physicSofa.sofaBody.shapes[0].halfExtents).multiplyScalar(2)

        this.shapeBottomGeometry = new THREE.BoxGeometry(
            this.shapeBottomGeometrySize.x,
            this.shapeBottomGeometrySize.y,
            this.shapeBottomGeometrySize.z
        )

        this.shapeBottomGeometry.translate(
            this.physicSofa.sofaBody.shapes[0].position.x,
            this.physicSofa.sofaBody.shapes[0].position.y,
            this.physicSofa.sofaBody.shapes[0].position.z
        )

        this.shapeBottom = new THREE.Mesh(
            this.shapeBottomGeometry,
            this.materials.wireframe
        )

    }

    shapeTop()
    {
        this.shapeTopGeometrySize = new THREE.Vector3()
        this.shapeTopGeometrySize.copy(this.physicSofa.sofaBody.shapes[1].halfExtents).multiplyScalar(2)

        this.shapeTopGeometry = new THREE.BoxGeometry(
            this.shapeTopGeometrySize.x,
            this.shapeTopGeometrySize.y,
            this.shapeTopGeometrySize.z
        )

        this.shapeTopGeometry.translate(
            this.physicSofa.sofaBody.shapes[1].position.x,
            this.physicSofa.sofaBody.shapes[1].position.y,
            this.physicSofa.sofaBody.shapes[1].position.z
        )

        this.shapeTop = new THREE.Mesh(
            this.shapeTopGeometry,
            this.materials.wireframe
        )
    }
}





/*

import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';

// ...

const postSide01 = new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height, PARAMS.postsSizes.depthSide)
const postSide02 = new THREE.BoxGeometry(PARAMS.postsSizes.widthSide, PARAMS.postsSizes.height, PARAMS.postsSizes.depthSide)
const postCenter = new THREE.BoxGeometry(PARAMS.postsSizes.widthCenter, PARAMS.postsSizes.height, PARAMS.postsSizes.depthCenter)
const postsMerge = BufferGeometryUtils.mergeBufferGeometries([
    postSide01, postSide02, postCenter
])
const postAseet = new THREE.Mesh(
    postsMerge,
    materialPosts
)

scene.add(postAseet)

*/