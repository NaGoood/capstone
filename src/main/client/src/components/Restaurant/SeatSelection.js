import React, {useEffect, useRef, useState} from 'react';
import { useLoader, useThree, useFrame  } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { Box } from '@react-three/drei';

function SeatSelection({reservNumber, tableCheck, onSelectionInfo, onSelectionInfo2}) {

    //변수

    const groupRef = useRef();

    const gltf = useLoader(GLTFLoader, "/modelLocation/GLTF.gltf");

    const scene = gltf.scene;

    // multi_person useState
    //region
    const [multi_person_1, setMulti_person_1] = useState({
        seat_1: [0, 0, 0],
        seat_2: [0, 0, 0],
        seat_3: [0, 0, 0],
        seat_4: [0, 0, 0],
        seat_5: [0, 0, 0],
        seat_6: [0, 0, 0],
        seat_7: [0, 0, 0],
    });

    const [multi_person_2, setMulti_person_2] = useState({
        seat_1: [0, 0, 0],
        seat_2: [0, 0, 0],
        seat_3: [0, 0, 0],
        seat_4: [0, 0, 0],
        seat_5: [0, 0, 0]
    });

    const [multi_person_3, setMulti_person_3] = useState({
        seat_1: [0, 0, 0],
        seat_2: [0, 0, 0],
        seat_3: [0, 0, 0]
    });

    const [multi_person_1_color, setMulti_person_1_color] = useState({
        seat_1: "#fffafa",
        seat_2: "#fffafa",
        seat_3: "#fffafa",
        seat_4: "#fffafa",
        seat_5: "#fffafa",
        seat_6: "#fffafa",
        seat_7: "#fffafa",
    });

    const [multi_person_2_color, setMulti_person_2_color] = useState({
        seat_1: "#fffafa",
        seat_2: "#fffafa",
        seat_3: "#fffafa",
        seat_4: "#fffafa",
        seat_5: "#fffafa",
    });

    const [multi_person_3_color, setMulti_person_3_color] = useState({
        seat_1: "#fffafa",
        seat_2: "#fffafa",
        seat_3: "#fffafa",
    });
    //endregion

    // 마우스 객체 위
    //region
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

    //endregion

    // 마우스 벗어남
    //region
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

    //endregion

    //인원수 체크
    //region

    useEffect(() => {
        if(reservNumber === 0){
            setMulti_person_1((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0],
                seat_6: [0, 0, 0],
                seat_7: [0, 0, 0],
            }));
            setMulti_person_2((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0]
            }));
            setMulti_person_3((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0]
            }));
        }
        else if (reservNumber === 1 || reservNumber === 2 || reservNumber === 3 || reservNumber === 4) {
            setMulti_person_1((prevState) => ({
                ...prevState,
                seat_1: [2, 2, 2],
                seat_2: [2, 2, 2],
                seat_3: [2, 2, 2],
                seat_4: [2, 2, 2],
                seat_5: [2, 2, 2],
                seat_6: [2, 2, 2],
                seat_7: [2, 2, 2],
            }));
            setMulti_person_2((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0]
            }));
            setMulti_person_3((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0]
            }));

            tableCheck.map((element)=>{
                if(element.tableType === 1){
                    if(element.tableNumber === 1){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_1: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 2){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_2: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 3){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_3: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 4){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_4: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 5){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_5: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 6){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_6: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 7){
                        if(element.tableValue === false){
                            setMulti_person_1((prevState) => {
                                return {
                                    ...prevState,
                                    seat_7: [0, 0, 0]
                                };});}}
                }
            })

        }else if(reservNumber === 5 || reservNumber === 6 ){
            setMulti_person_1((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0],
                seat_6: [0, 0, 0],
                seat_7: [0, 0, 0],
            }));
            setMulti_person_2((prevState) => ({
                ...prevState,
                seat_1: [2, 2, 2],
                seat_2: [2, 2, 2],
                seat_3: [2, 2, 2],
                seat_4: [2, 2, 2],
                seat_5: [2, 2, 2]
            }));
            setMulti_person_3((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0]
            }));
            tableCheck.map((element)=>{
            if(element.tableType === 2){
                if(element.tableNumber === 1){
                    if(element.tableValue === false){
                        setMulti_person_2((prevState) => {
                            return {
                                ...prevState,
                                seat_1: [0, 0, 0]
                            };});}}
                if(element.tableNumber === 2){
                    if(element.tableValue === false){
                        setMulti_person_2((prevState) => {
                            return {
                                ...prevState,
                                seat_2: [0, 0, 0]
                            };});}}
                if(element.tableNumber === 3){
                    if(element.tableValue === false){
                        setMulti_person_2((prevState) => {
                            return {
                                ...prevState,
                                seat_3: [0, 0, 0]
                            };});}}
                if(element.tableNumber === 4){
                    if(element.tableValue === false){
                        setMulti_person_2((prevState) => {
                            return {
                                ...prevState,
                                seat_4: [0, 0, 0]
                            };});}}
                if(element.tableNumber === 5){
                    if(element.tableValue === false){
                        setMulti_person_2((prevState) => {
                            return {
                                ...prevState,
                                seat_5: [0, 0, 0]
                            };});}}
            }})
        }else if(reservNumber === 7 || reservNumber === 8 ){
            setMulti_person_1((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0],
                seat_6: [0, 0, 0],
                seat_7: [0, 0, 0],
            }));
            setMulti_person_2((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0]
            }));
            setMulti_person_3((prevState) => ({
                ...prevState,
                seat_1: [2, 2, 2],
                seat_2: [2, 2, 2],
                seat_3: [2, 2, 2]
            }));
            tableCheck.map((element)=>{
                if(element.tableType === 3){
                    if(element.tableNumber === 1){
                        if(element.tableValue === false){
                            setMulti_person_3((prevState) => {
                                return {
                                    ...prevState,
                                    seat_1: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 2){
                        if(element.tableValue === false){
                            setMulti_person_3((prevState) => {
                                return {
                                    ...prevState,
                                    seat_2: [0, 0, 0]
                                };});}}
                    if(element.tableNumber === 3){
                        if(element.tableValue === false){
                            setMulti_person_3((prevState) => {
                                return {
                                    ...prevState,
                                    seat_3: [0, 0, 0]
                                };});}}
                }
            })
        }else{
            setMulti_person_1((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0],
                seat_6: [0, 0, 0],
                seat_7: [0, 0, 0],
            }));
            setMulti_person_2((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0],
                seat_4: [0, 0, 0],
                seat_5: [0, 0, 0]
            }));
            setMulti_person_3((prevState) => ({
                ...prevState,
                seat_1: [0, 0, 0],
                seat_2: [0, 0, 0],
                seat_3: [0, 0, 0]
            }));
        }
    }, [reservNumber]);

    //endregion

    //클릭 이벤트
    //region
    const handleClick = ( people, seatNumber, key) => {
        onSelectionInfo(seatNumber);
        onSelectionInfo2(people);
        setMulti_person_1_color((prevState) => {
            return {
                ...prevState,
                seat_1: "#fffafa",
                seat_2: "#fffafa",
                seat_3: "#fffafa",
                seat_4: "#fffafa",
                seat_5: "#fffafa",
                seat_6: "#fffafa",
                seat_7: "#fffafa",
            };
        });
        setMulti_person_2_color((prevState) => {
            return {
                ...prevState,
                seat_1: "#fffafa",
                seat_2: "#fffafa",
                seat_3: "#fffafa",
                seat_4: "#fffafa",
                seat_5: "#fffafa"
            };
        });
        setMulti_person_3_color((prevState) => {
            return {
                ...prevState,
                seat_1: "#fffafa",
                seat_2: "#fffafa",
                seat_3: "#fffafa"
            };
        });
        if(people == 1){
            setMulti_person_1_color((prevState) => {
                return {
                    ...prevState,
                    [key]: "#CD1F48"
                };
            });
        }else if(people == 2){
            setMulti_person_2_color((prevState) => {
                return {
                    ...prevState,
                    [key]: "#CD1F48"
                };
            });
        }else{
            setMulti_person_3_color((prevState) => {
                return {
                    ...prevState,
                    [key]: "#CD1F48"
                };
            });
        }
        // 각 좌석에 대한 추가 동작 수행
    };
    //endregion

    // multi_person box
    //region
    const multi_person_1_Box = () =>{
        return(
            <group ref={groupRef} >
                <Box material-color={multi_person_1_color.seat_1} args={multi_person_1.seat_1} position={[-3 , 0 , -6]} onClick={() => handleClick(1,1, 'seat_1')} onPointerOver={() => mouseOver(1,'seat_1')} onPointerOut={() => mouseDown(1,'seat_1')}/>
                <Box material-color={multi_person_1_color.seat_2} args={multi_person_1.seat_2} position={[-3 , 0 , -3]} onClick={() => handleClick(1,2, 'seat_2')} onPointerOver={() => mouseOver(1,'seat_2')} onPointerOut={() => mouseDown(1,'seat_2')}/>
                <Box material-color={multi_person_1_color.seat_3} args={multi_person_1.seat_3} position={[-3 , 0 , 0]} onClick={() => handleClick(1,3, 'seat_3')} onPointerOver={() => mouseOver(1,'seat_3')} onPointerOut={() => mouseDown(1,'seat_3')}/>
                <Box material-color={multi_person_1_color.seat_4} args={multi_person_1.seat_4} position={[-3 , 0 , 3]} onClick={() => handleClick(1,4, 'seat_4')} onPointerOver={() => mouseOver(1,'seat_4')} onPointerOut={() => mouseDown(1,'seat_4')}/>
                <Box material-color={multi_person_1_color.seat_5} args={multi_person_1.seat_5} position={[0 , 0 , -3]} onClick={() => handleClick(1,5, 'seat_5')} onPointerOver={() => mouseOver(1,'seat_5')} onPointerOut={() => mouseDown(1,'seat_5')}/>
                <Box material-color={multi_person_1_color.seat_6} args={multi_person_1.seat_6} position={[0 , 0 , 0]} onClick={() => handleClick(1,6, 'seat_6')} onPointerOver={() => mouseOver(1,'seat_6')} onPointerOut={() => mouseDown(1,'seat_6')}/>
                <Box material-color={multi_person_1_color.seat_7} args={multi_person_1.seat_7} position={[0 , 0 , 3]} onClick={() => handleClick(1,7, 'seat_7')} onPointerOver={() => mouseOver(1,'seat_7')} onPointerOut={() => mouseDown(1,'seat_7')}/>
            </group>
        )
    }

    const multi_person_2_Box = () =>{
        return(
            <group ref={groupRef} >
                <Box material-color={multi_person_2_color.seat_1} args={multi_person_2.seat_1} position={[-7.6 , 0 , -7]} onClick={() => handleClick(2,1, 'seat_1')} onPointerOver={() => mouseOver(2,'seat_1')} onPointerOut={() => mouseDown(2,'seat_1')}/>
                <Box material-color={multi_person_2_color.seat_2} args={multi_person_2.seat_2} position={[-7.6 , 0 , -4.5]} onClick={() => handleClick(2,2, 'seat_2')} onPointerOver={() => mouseOver(2,'seat_2')} onPointerOut={() => mouseDown(2,'seat_2')}/>
                <Box material-color={multi_person_2_color.seat_3} args={multi_person_2.seat_3} position={[3.2 , 0 , -3]} onClick={() => handleClick(2,3, 'seat_3')} onPointerOver={() => mouseOver(2,'seat_3')} onPointerOut={() => mouseDown(2,'seat_3')}/>
                <Box material-color={multi_person_2_color.seat_4} args={multi_person_2.seat_4} position={[3.2 , 0 , 0]} onClick={() => handleClick(2,4, 'seat_4')} onPointerOver={() => mouseOver(2,'seat_4')} onPointerOut={() => mouseDown(2,'seat_4')}/>
                <Box material-color={multi_person_2_color.seat_5} args={multi_person_2.seat_5} position={[3.2 , 0 , 3]} onClick={() => handleClick(2,5, 'seat_5')} onPointerOver={() => mouseOver(2,'seat_5')} onPointerOut={() => mouseDown(2,'seat_5')}/>
            </group>
        )
    }

    const multi_person_3_Box = () =>{
        return(
            <group ref={groupRef} >
                <Box material-color={multi_person_3_color.seat_1} args={multi_person_3.seat_1} position={[-7.6 , 0 , -1.5]} onClick={() => handleClick(3,1, 'seat_1')} onPointerOver={() => mouseOver(3,'seat_1')} onPointerOut={() => mouseDown(3,'seat_1')}/>
                <Box material-color={multi_person_3_color.seat_2} args={multi_person_3.seat_2} position={[-7.6 , 0 , 1]} onClick={() => handleClick(3,2, 'seat_2')} onPointerOver={() => mouseOver(3,'seat_2')} onPointerOut={() => mouseDown(3,'seat_2')}/>
                <Box material-color={multi_person_3_color.seat_3} args={multi_person_3.seat_3} position={[-7.6 , 0 , 3.5]} onClick={() => handleClick(3,3, 'seat_3')} onPointerOver={() => mouseOver(3,'seat_3')} onPointerOut={() => mouseDown(3,'seat_3')}/>
            </group>
        )
    }
    //endregion

    return (
        <group ref={groupRef} >
            <primitive object={scene} position={[-10, 0, 5]} />
            {multi_person_1_Box()}
            {multi_person_2_Box()}
            {multi_person_3_Box()}
        </group>
    );
}

export default SeatSelection;
