import * as THREE from 'three'

import Experience from "../Experience";

import Lights from './Lights';

import Cube from './Models/Cube';

import Room from './Models/Room';

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

    }
}