import * as THREE from 'three'

import Experience from "../Experience.js";

import Lights from './Lights/Lights.js';

import Cube from './Room/Cube.js';
import Room from './Room/Room.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.lights = new Lights()

        this.cube = new Cube()
        this.room = new Room()


        // Add lights
        this.scene.add(
            this.lights.directional,
            // this.lights.directionalHelper,
            // this.lights.directionalCameraHelper,
        )

        // Add models
        this.scene.add(
            // this.cube.instance,
            this.room.instance,
        )


    }

    update()
    {
        this.room.update()

    }
}