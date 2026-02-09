import * as THREE from 'three'
import Experience from  '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.scene.background = new THREE.Color( '#171717')

        // Debug
        this.debugObject = {}
        this.debugObject.sceneColor = '#171717'
        this.debugObject.sunlightColor = '#ffffff'
        this.debugFolder = this.debug.gui.addFolder('environment')

        this.setSunLight()
        this.setDebug()
    }

    setSunLight()
    {
        this.sunLight = new THREE.AmbientLight('#ffffff', 5)
        this.scene.add(this.sunLight)
    }

    setDebug()
    {
        // Sunlight intensity

        this.debugFolder
        .add(this.sunLight, 'intensity')
        .name('sunLightIntensity')
        .min(0)
        .max(10)
        .step(0.001)
        .name('Sunlight Intensity')

        // Sunlight Color

        this.debugFolder
        .addColor(this.debugObject, 'sunlightColor')
        .onChange(() =>
        {
            this.sunLight.color.set(this.debugObject.sunlightColor)
        })
        .name('Sunlight Color')

        // Scene Color

        this.debugFolder
        .addColor(this.debugObject, 'sceneColor')
        .onChange(() =>
        {
            this.scene.background.set(this.debugObject.sceneColor)
        })
        .name('Scene Color')
    }
}