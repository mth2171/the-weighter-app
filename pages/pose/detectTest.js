import React, { useRef } from "react";
import { View } from "react-native";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";

const TensorCamera = cameraWithTensors(Camera);

const DetectTest = () => {
  const cameraRef = useRef(null);
  return <View className="flex w-full h-full">
    <TensorCamera ref={cameraRef} className="absolute w-full h-full z-30" autorender={false} type={Camera.Constants.Type.front} cameraTextureWidth={180} cameraTextureHeight={180 / 9 / 16} resizeWidth={180} resizeHeight={180 / 9 / 16} resizeDepth={3} rotation={0}/>
  </View>;
};

export default DetectTest;
