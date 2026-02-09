import * as THREE from 'three'
import Experience from '../Experience.js'

// Shaders
import cubeVertexShader from '/src/shaders/cube/vertex.glsl'
import cubeFragmentShader from '/src/shaders/cube/fragment.glsl'

export default class Cube 
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.debug = this.experience.debug

        // Debug
        this.debugObject = {}
        this.debugObject.cubeColor = '#7700ff'
        this.debugFolder = this.debug.gui.addFolder('cube')

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setGeometry()
    {
        this.cubeGeometry = new THREE.BoxGeometry(2, 2, 2)
    }

    setMaterial()
    {
        this.cubeMaterial = new THREE.ShaderMaterial({
            vertexShader: cubeVertexShader,
            fragmentShader: cubeFragmentShader,
            uniforms: {
                uColor: { value: new THREE.Color('#7700ff')}
            }
        })
    }

    setMesh()
    {
        this.cubeMesh = new THREE.Mesh(this.cubeGeometry, this.cubeMaterial)
        this.scene.add(this.cubeMesh)
    }

    setDebug()
    {
        // Cube Color

        this.debugFolder
        .addColor(this.debugObject, 'cubeColor')
        .onChange(() =>
        {
            this.cubeMaterial.uniforms.uColor.value.set(this.debugObject.cubeColor)
        })
        .name('Cube Color')
    }
}