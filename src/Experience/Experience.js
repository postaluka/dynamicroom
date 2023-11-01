import * as THREE from 'three'

import Debug from './Global/Debug.js';

import Sizes from "./Setup/Sizes.js";
import Time from "./Setup/Time.js";
import Camera from './Setup/Camera.js';
import Renderer from './Setup/Renderer.js';
import World from './World/World.js';

import Textures from './Resources/Texture.js';

let instance = null

export default class Experience
{
    constructor(canvas)
    {

        // Singleton
        if (instance)
        {
            return instance
        }
        instance = this

        this.canvas = canvas

        this.debug = new Debug()

        this.textures = new Textures()

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()

        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.axesHelper = new THREE.AxesHelper(5)
        this.scene.add(this.axesHelper)

        this.setEnvMap()

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.time.on('tick', () =>
        {
            this.update()
        })


    }

    setEnvMap()
    {
        this.scene.background = this.textures.environmentMap
        this.scene.environment = this.textures.environmentMap
        this.scene.backgroundBlurriness = 0.12
        this.scene.backgroundIntensity = 1.5
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        // this.cube.resize()
    }

    update()
    {
        this.camera.update()
        this.renderer.update()
        this.world.update()
    }
}




