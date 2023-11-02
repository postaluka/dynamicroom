import * as THREE from 'three'
import Loaders from '../../Resources/Loaders'


export default class Sofa
{
    constructor(world)
    {
        this.loaders = new Loaders()
        this.world = world

        this.instance = new THREE.Group()
        this.world.add(this.instance)

        this.loaders.gltf.load(
            '../../../3Dmodels/sofa_01.gltf',
            (gltf) =>
            {
                const children = [...gltf.scene.children]
                for (const child of children)
                {
                    this.instance.add(child)
                }

            })

    }

}