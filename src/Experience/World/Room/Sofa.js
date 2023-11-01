import * as THREE from 'three'
import Loaders from '../../Resources/Loaders'


export default class Sofa
{
    constructor(world)
    {
        this.loaders = new Loaders()
        this.world = world

        this.loaders.gltf.load(
            '../../../3Dmodels/sofa_01.gltf',
            (gltf) =>
            {
                const children = [...gltf.scene.children]
                console.log(children);
                for (const child of children)
                {
                    this.world.add(child)
                }

            })

    }

}