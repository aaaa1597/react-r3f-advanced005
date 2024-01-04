import React, { Suspense} from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber'
import { Stats, OrbitControls, Environment } from '@react-three/drei'
import Eve from './Eve'

const Loader = () => {
  return <div className="loader"></div>
}

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div style={{ width: "100vw", height: "75vh" }}>
          <Canvas camera={{ position: [0, 1, 2] }}>
            <spotLight position={[2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 50} />
            <spotLight position={[-2.5, 5, 5]} angle={Math.PI / 3} penumbra={0.5} castShadow shadow-mapSize-height={2048} shadow-mapSize-width={2048} intensity={Math.PI * 50} />
            <Environment preset="forest" background />
            <Eve />
            <OrbitControls />
            <axesHelper args={[5]} />
            <gridHelper />
            <Stats />
          </Canvas>
        </div>
      </Suspense>
      <div id="instructions">
        <kbd>W</kbd> to walk<br />
        <kbd>W</kbd> & <kbd>⇧ Shift</kbd> to run.<br />
        <kbd>Space</kbd> to jump<br />
        <kbd>Q</kbd> to fancy pose<br /><br />
          Model from{" "}
          <a href="https://www.mixamo.com" target="_blank" rel="nofollow noreferrer">
            Mixamo
          </a>
      </div>
    </>
  );
}

export default App;
