import * as THREE from 'three'

import PARAMS from '../../Utils/PARAMS'

import Physics from '../Physics'
import Materials from '../../Resources/Materials'

export default class Spheres
{
    constructor()
    {
        this.physics = new Physics()
        this.materials = new Materials()

        this.instance = new THREE.Mesh(
            new THREE.SphereGeometry(PARAMS.sphere.radius, 16, 16),
            this.materials.basic
        )

        // this.instance.position.y = PARAMS.sphere.radius + 2

    }

    update()
    {
        this.physics.update(this.instance, this.physics.sphereBody)
    }
}