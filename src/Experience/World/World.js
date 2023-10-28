import * as THREE from 'three'

import Experience from "../Experience";

import Lights from './Lights';

import Cube from './Models/Cube';
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
            this.room.instance,
            this.floor.instance,
        )


    }
}