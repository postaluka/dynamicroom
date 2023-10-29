import * as THREE from 'three'

import Experience from "../Experience";

import Lights from './Lights';

import Cube from './Models/Cube';
import Spheres from './Models/Spheres';
import Room from './Models/Room';
import Floor from './Models/Floor';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.lights = new Lights()

        this.cube = new Cube()
        this.spheres = new Spheres()
        this.room = new Room()
        this.floor = new Floor()

        // Add lights
        this.scene.add(
            this.lights.directional,
            // this.lights.directionalHelper,
            // this.lights.directionalCameraHelper,
        )

        // Add models
        this.scene.add(
            // this.cube.instance,
            this.spheres.instance,
            this.room.instance,
            this.floor.instance,
        )


    }

    update()
    {
        this.spheres.update()
    }
}