import React, { useRef, useState } from 'react';
import { useLoader, useThree, useFrame  } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Box } from '@react-three/drei';

function Model(props) {

    const [multi_person_1, setMulti_person_1] = useState({
        seat_1: [2, 2, 2],
        seat_2: [2, 2, 2],
        seat_3: [2, 2, 2],
        seat_4: [2, 2, 2],
        seat_5: [2, 2, 2],
        seat_6: [2, 2, 2],
        seat_7: [2, 2, 2],
    });

    const [multi_person_2, setMulti_person_2] = useState({
        seat_1: [2, 2, 2],
        seat_2: [2, 2, 2],
        seat_3: [2, 2, 2],
        seat_4: [2, 2, 2],
        seat_5: [2, 2, 2]
    });

    const [multi_person_3, setMulti_person_3] = useState({
        seat_1: [2, 2, 2],
        seat_2: [2, 2, 2],
        seat_3: [2, 2, 2]
    });

    const mouseOver = (num, key) => {
        // 해당 키에 대한 상태 변경 함수 실행
        if(num == 1){
            setMulti_person_1((prevState) => {
                return {
                    ...prevState,
                    [key]: [2.5, 2.5, 2.5],
                };
            });
        }else if(num == 2){
            setMulti_person_2((prevState) => {
                return {
                    ...prevState,
                    [key]: [2.5, 2.5, 2.5],
                };
            });
        }else{
            setMulti_person_3((prevState) => {
                return {
                    ...prevState,
                    [key]: [2.5, 2.5, 2.5],
                };
            });
        }
    };

    const mouseDown = (num, key) => {
        // 해당 키에 대한 상태 변경 함수 실행
        if(num == 1){
            setMulti_person_1((prevState) => {
                return {
                    ...prevState,
                    [key]: [2, 2, 2],
                };
            });
        }else if(num == 2){
            setMulti_person_2((prevState) => {
                return {
                    ...prevState,
                    [key]: [2, 2, 2],
                };
            });
        }else{
            setMulti_person_3((prevState) => {
                return {
                    ...prevState,
                    [key]: [2, 2, 2],
                };
            });
        }
    };

    const groupRef = useRef();

    const gltf = useLoader(GLTFLoader, "/modelLocation/GLTF.gltf");

    const scene = gltf.scene;

    const handleClick = (seatNumber) => {
        console.log(`Clicked seat ${seatNumber}`);
        // 각 좌석에 대한 추가 동작 수행
    };


    const multi_person_1_Box = () =>{
        return(
            <group ref={groupRef} >
                <Box args={multi_person_1.seat_1} position={[-3 , 0 , -6]} onClick={() => handleClick(1)} onPointerOver={() => mouseOver(1,'seat_1')} onPointerOut={() => mouseDown(1,'seat_1')}/>
                <Box args={multi_person_1.seat_2} position={[-3 , 0 , -3]} onClick={() => handleClick(2)} onPointerOver={() => mouseOver(1,'seat_2')} onPointerOut={() => mouseDown(1,'seat_2')}/>
                <Box args={multi_person_1.seat_3} position={[-3 , 0 , 0]} onClick={() => handleClick(3)} onPointerOver={() => mouseOver(1,'seat_3')} onPointerOut={() => mouseDown(1,'seat_3')}/>
                <Box args={multi_person_1.seat_4} position={[-3 , 0 , 3]} onClick={() => handleClick(4)} onPointerOver={() => mouseOver(1,'seat_4')} onPointerOut={() => mouseDown(1,'seat_4')}/>
                <Box args={multi_person_1.seat_5} position={[0 , 0 , -3]} onClick={() => handleClick(5)} onPointerOver={() => mouseOver(1,'seat_5')} onPointerOut={() => mouseDown(1,'seat_5')}/>
                <Box args={multi_person_1.seat_6} position={[0 , 0 , 0]} onClick={() => handleClick(6)} onPointerOver={() => mouseOver(1,'seat_6')} onPointerOut={() => mouseDown(1,'seat_6')}/>
                <Box args={multi_person_1.seat_7} position={[0 , 0 , 3]} onClick={() => handleClick(7)} onPointerOver={() => mouseOver(1,'seat_7')} onPointerOut={() => mouseDown(1,'seat_7')}/>
            </group>
        )
    }

    const multi_person_2_Box = () =>{
        return(
            <group ref={groupRef} >
                <Box args={multi_person_2.seat_1} position={[-7.6 , 0 , -7]} onClick={() => handleClick(1)} onPointerOver={() => mouseOver(2,'seat_1')} onPointerOut={() => mouseDown(2,'seat_1')}/>
                <Box args={multi_person_2.seat_2} position={[-7.6 , 0 , -4.5]} onClick={() => handleClick(2)} onPointerOver={() => mouseOver(2,'seat_2')} onPointerOut={() => mouseDown(2,'seat_2')}/>
                <Box args={multi_person_2.seat_3} position={[3.2 , 0 , -3]} onClick={() => handleClick(3)} onPointerOver={() => mouseOver(2,'seat_3')} onPointerOut={() => mouseDown(2,'seat_3')}/>
                <Box args={multi_person_2.seat_4} position={[3.2 , 0 , 0]} onClick={() => handleClick(4)} onPointerOver={() => mouseOver(2,'seat_4')} onPointerOut={() => mouseDown(2,'seat_4')}/>
                <Box args={multi_person_2.seat_5} position={[3.2 , 0 , 3]} onClick={() => handleClick(5)} onPointerOver={() => mouseOver(2,'seat_5')} onPointerOut={() => mouseDown(2,'seat_5')}/>
            </group>
        )
    }

    const multi_person_3_Box = () =>{
        return(
            <group ref={groupRef} >
                <Box args={multi_person_3.seat_1} position={[-7.6 , 0 , -1.5]} onClick={() => handleClick(1)} onPointerOver={() => mouseOver(3,'seat_1')} onPointerOut={() => mouseDown(3,'seat_1')}/>
                <Box args={multi_person_3.seat_2} position={[-7.6 , 0 , 1]} onClick={() => handleClick(2)} onPointerOver={() => mouseOver(3,'seat_2')} onPointerOut={() => mouseDown(3,'seat_2')}/>
                <Box args={multi_person_3.seat_3} position={[-7.6 , 0 , 3.5]} onClick={() => handleClick(3)} onPointerOver={() => mouseOver(3,'seat_3')} onPointerOut={() => mouseDown(3,'seat_3')}/>
            </group>
        )
    }

    return (
        <group ref={groupRef} >
            <primitive object={scene} position={[-10, 0, 5]} />
            {multi_person_1_Box()}
            {multi_person_2_Box()}
            {multi_person_3_Box()}
        </group>
    );
}

export default Model;
