import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { AnimationAction, AnimationMixer, SkinnedMesh } from 'three'

type jsonkeymap = { [key: string]: boolean }
const useKeyboard = () => {
    const keyMap = useRef<jsonkeymap>({})
  
    useEffect(() => {
      const onDocumentKey = (e: KeyboardEvent) => {
        keyMap.current[e.code] = e.type === 'keydown'
      }
      document.addEventListener('keydown', onDocumentKey)
      document.addEventListener('keyup', onDocumentKey)
      return () => {
        document.removeEventListener('keydown', onDocumentKey)
        document.removeEventListener('keyup', onDocumentKey)
      }
    })
  
    return keyMap.current
}
  
type jsoactions = { [key: string]: AnimationAction }
const Eve = () => {
    const ref = useRef<THREE.Group>(null!)
    const { nodes, materials } = useGLTF('./assets/eve.glb')
    const idleAnimation   = useGLTF('./assets/eve@idle.glb').animations
    const walkAnimation   = useGLTF('./assets/eve@walking.glb').animations
    const runningAnimation= useGLTF('./assets/eve@running.glb').animations
    const jumpAnimation   = useGLTF('./assets/eve@jump.glb').animations
    const poseAnimation   = useGLTF('./assets/eve@pose.glb').animations
    const actions = useRef<jsoactions>({})
    const mixer:AnimationMixer = useMemo<AnimationMixer>(() => new AnimationMixer(null!), [])
    const keyboard = useKeyboard()
    const [actionName, setActionName] = useState<string>(null!)
    const [wait, setWait] = useState<boolean>(false)
    let actionAssigned = false
  
    useEffect(() => {
        actions.current['idle']   = mixer.clipAction(idleAnimation   [0], ref.current)
        actions.current['walk']   = mixer.clipAction(walkAnimation   [0], ref.current)
        actions.current['running']= mixer.clipAction(runningAnimation[0], ref.current)
        actions.current['jump']   = mixer.clipAction(jumpAnimation   [0], ref.current)
        actions.current['pose']   = mixer.clipAction(poseAnimation   [0], ref.current)
    
        actions.current['idle'].play()
        setActionName('idle')
      }, [])

      useEffect(() => {
        const act: AnimationAction = actions.current[actionName]
        act?.reset().fadeIn(0.1).play()
        return () => {
          act?.fadeOut(0.1)
        }
      }, [actionName])
    
      useFrame((_, delta) => {
        if (!wait) {
          actionAssigned = false
    
          if (keyboard['KeyW'] && keyboard['ShiftLeft']) {
            setActionName('running')
            actionAssigned = true
          }
          else if (keyboard['KeyW']) {
            setActionName('walk')
            actionAssigned = true
          }
          
          if (keyboard['Space']) {
            setActionName('jump')
            actionAssigned = true
            setWait(true) // wait for jump to finish
            setTimeout(() => setWait(false), 1000)
          }
          
          if (keyboard['KeyQ']) {
            setActionName('pose')
            actionAssigned = true
          }
    
          !actionAssigned && setActionName('idle')
        }
    
        mixer.update(delta)
      })

      return (
        <group ref={ref} dispose={null}>
          <group name="Scene">
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh castShadow name="Mesh" frustumCulled={false}
                           geometry={(nodes.Mesh as SkinnedMesh).geometry}
                           material={materials.SpacePirate_M} skeleton={(nodes.Mesh as SkinnedMesh).skeleton} />
            </group>
          </group>
        </group>
      )
}
export default Eve;