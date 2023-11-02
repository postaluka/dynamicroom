import * as THREE from 'three'
import CannonDebugger from 'cannon-es-debugger'

import Experience from "../Experience.js";

import Lights from './Lights/Lights.js';

import Room from './Room/Room.js';
import Physics from './Physics/Physics.js';

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        this.lights = new Lights()

        this.room = new Room()
        this.physics = new Physics()


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