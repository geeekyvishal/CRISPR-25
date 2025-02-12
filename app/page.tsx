'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export default function Home() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5, // strength
      0.4, // radius
      0.85 // threshold
    )
    composer.addPass(bloomPass)

    const dnaGroup = new THREE.Group()

    const createNode = (x: number, y: number, z: number, color: number) => {
      const geometry = new THREE.SphereGeometry(0.4, 32, 32)
      const material = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.3,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.position.set(x, y, z)
      return sphere
    }

    const createConnection = (start: THREE.Vector3, end: THREE.Vector3, color: number) => {
      const direction = end.clone().sub(start)
      const length = direction.length()
      
      const geometry = new THREE.CylinderGeometry(0.05, 0.05, length, 12)
      const material = new THREE.MeshPhysicalMaterial({
        color,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: color,
        emissiveIntensity: 0.3,
      })
      
      const cylinder = new THREE.Mesh(geometry, material)
      cylinder.position.copy(start)
      cylinder.position.lerp(end, 0.5)
      cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
      
      return cylinder
    }

    const tealColor = 0x2F9B8F
    const grayColor = 0x444444

    const height = 25
    const segments = 12
    const radius = 4
    const twist = Math.PI * 2 

    for (let i = 0; i < segments; i++) {
      const t = i / (segments - 1)
      const y = (i - segments / 2) * (height / segments)
      const angle = t * twist
      
      const x1 = Math.cos(angle) * radius
      const z1 = Math.sin(angle) * radius
      const x2 = Math.cos(angle + Math.PI) * radius
      const z2 = Math.sin(angle + Math.PI) * radius
      
      const node1 = createNode(x1, y, z1, i % 2 === 0 ? tealColor : grayColor)
      const node2 = createNode(x2, y, z2, i % 2 === 0 ? grayColor : tealColor)
      dnaGroup.add(node1, node2)
      
      if (i < segments - 1) {
        const nextT = (i + 1) / (segments - 1)
        const nextAngle = nextT * twist
        const nextY = ((i + 1) - segments / 2) * (height / segments)
        
        const nextX1 = Math.cos(nextAngle) * radius
        const nextZ1 = Math.sin(nextAngle) * radius
        const nextX2 = Math.cos(nextAngle + Math.PI) * radius
        const nextZ2 = Math.sin(nextAngle + Math.PI) * radius
        
        const conn1 = createConnection(
          new THREE.Vector3(x1, y, z1),
          new THREE.Vector3(nextX1, nextY, nextZ1),
          i % 2 === 0 ? tealColor : grayColor
        )
        const conn2 = createConnection(
          new THREE.Vector3(x2, y, z2),
          new THREE.Vector3(nextX2, nextY, nextZ2),
          i % 2 === 0 ? grayColor : tealColor
        )
        dnaGroup.add(conn1, conn2)
      }
    }

    scene.add(dnaGroup)

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const createSpotlight = (color: number, position: THREE.Vector3) => {
      const light = new THREE.SpotLight(color, 2)
      light.position.copy(position)
      light.angle = Math.PI / 4
      light.penumbra = 0.3
      light.decay = 2
      light.distance = 100
      light.castShadow = true
      return light
    }

    const spotLight1 = createSpotlight(tealColor, new THREE.Vector3(20, 20, 20))
    const spotLight2 = createSpotlight(grayColor, new THREE.Vector3(-20, -20, -20))
    scene.add(spotLight1, spotLight2)

    camera.position.z = 30

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.autoRotate = true
    controls.autoRotateSpeed = 1

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      
      dnaGroup.position.y = Math.sin(Date.now() * 0.001) * 0.5
      
      composer.render()
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mountRef.current?.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900">
      <div ref={mountRef} className="absolute inset-0 z-0" />
      <div className="z-10 text-center p-6 backdrop-blur-lg bg-black/30 rounded-xl border border-[#2F9B8F]/20 tech-border">
        <h1 className="text-6xl font-bold mb-4 text-[#2F9B8F] animate-pulse glitch" data-text="CRISPR">CRISPR</h1>
        <h2 className="text-2xl mb-4 text-gray-300">Central Research Initiative for Student Public Relations</h2>
        <p className="text-xl mb-8 text-gray-400">Technical Club of IIITN</p>
        <div className="flex gap-4 justify-center">
          <a 
            href="/about" 
            className="bg-[#2F9B8F] text-white px-6 py-3 rounded-lg text-lg font-semibold 
                     hover:bg-[#333333] transition-all duration-300 
                     hover:scale-105 transform shadow-lg
                     hover:shadow-[#2F9B8F]/50 relative overflow-hidden
                     after:content-[''] after:absolute after:h-full after:w-full 
                     after:top-0 after:left-0 after:bg-gradient-to-r 
                     after:from-transparent after:via-white/20 after:to-transparent
                     after:-translate-x-full hover:after:translate-x-full
                     after:transition-transform after:duration-500
                     scanner"
          >
            Know More
          </a>
          <a 
            href="/timeline" 
            className="border-2 border-[#2F9B8F] text-[#2F9B8F] px-6 py-3 rounded-lg text-lg font-semibold 
                     hover:bg-[#2F9B8F] hover:text-white transition-all duration-300 
                     hover:scale-105 transform shadow-lg
                     hover:shadow-[#2F9B8F]/50
                     scanner"
          >
            Time Line
          </a>
        </div>
      </div>
    </main>
  )
}

