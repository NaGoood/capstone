import React, { useRef, useState } from 'react';
import { useLoader, useThree, useFrame  } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function Model(props) {
    const groupRef = useRef();

    const gltf = useLoader(GLTFLoader, "/models/Store.gltf");

    const handleClick = () => {
        console.log("clicked");
    };

    return (
        <group ref={groupRef} >
            <primitive object={gltf.scene} position={[-10, 0, 5]} />
        </group>
    );
}

export default Model;
