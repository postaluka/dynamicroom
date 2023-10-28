import * as THREE from "three"
import utils from 'canvas-sketch-util'

import PARAMS from "../../Utils/PARAMS"

import Experience from "../../Experience"
import Materials from "../../Resources/Materials"




export default class Room 
{
    constructor()
    {

        this.experience = new Experience()
        this.materials = new Materials()

        // Parameters
        this.widthWall = 10
        this.heightWall = 10


        this.instance = new THREE.Group()

        let status = 1

        for (let i = 0; i < 3; i++)
        {
            const wall = new THREE.Mesh(
                new THREE.PlaneGeometry(this.widthWall, this.heightWall, 1, 1),
                this.materials.basic
            )

            this.instance.add(wall)

            if (i % 2 === 0)
            {
                wall.position.x = PARAMS.room.width / 2 * status
                status *= -1

                wall.rotation.y = Math.PI / 2
                wall.position.y = this.heightWall / 2
            }
            if (i % 2 !== 0)
            {
                wall.position.z = - PARAMS.room.depth / 2
                wall.position.y = this.heightWall / 2
            }

        }



        this.debug()



    }

    changeWidth(value)
    {
        let status = 1
        for (let i = 0; i < 3; i++)
        {
            const wall = this.instance.children[i]

            if (i % 2 === 0)
            {
                wall.position.x = PARAMS.room.width / 2 * status
                status *= -1

                wall.rotation.y = Math.PI / 2
                wall.position.y = this.heightWall / 2
            }
            if (i % 2 !== 0)
            {
                const widthUpdate = utils.math.mapRange(value, 0, 10, 0, 10)
                wall.geometry = new THREE.PlaneGeometry(widthUpdate, this.heightWall, 1, 1)

            }

        }

    }


    debug()
    {

        // Debug
        this.debug = this.experience.debug
        if (this.debug.active)
        {
            const folderRoom = this.debug.ui.addFolder('Room')
            folderRoom.add(PARAMS.room, 'width', 4, 10, 0.01).name('width').onChange((value) =>
            {
                this.changeWidth(value)
            })
        }
    }
}
