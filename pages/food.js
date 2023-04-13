import React, { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import * as ImagePicker from "expo-image-picker";
import { SvgUri } from "react-native-svg";
import { fetch, decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

const Food = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const imageRef = useRef(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await tf.ready();
    })();
  }, []);

  const selectPicture = async () => {
    const options = { mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5, base64: true, aspect: [1, 1] };
    const data = await ImagePicker.launchImageLibraryAsync(options);
    if (data.uri) {
      setImageUri(data.uri);
    }
  };

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setImageUri(data.uri);
    }
  };

  const resetPicture = async () => {
    if (imageUri) {
      setImageUri(null);
    }
  };

  const detectImage = async () => {
    const imgData = await fetch(imageUri, {}, { isBinary: true });
    const rawImageData = new Uint8Array(await imgData.arrayBuffer());
    const imageTensor = decodeJpeg(rawImageData);

    const model = await cocoSsd.load({ base: "lite_mobilenet_v2" });
    const prediction = model.detect(imageTensor, 20, 0.5);
    setPredictions(prediction);
  };

  const switchCameraType = () => {
    setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  const drawSvg = () => {};

  return (
    <View className="flex-1">
      {imageUri ? (
        <View className="flex-1 bg-transparent flex-col">
          <Image ref={imageRef} source={{ uri: imageUri }} className="flex w-full aspect-square" />
          <TouchableOpacity className="absolute self-start mt-5 top-2/3 ml-5 bg-red-800 p-3 rounded-full" onPress={resetPicture}>
            <Text className="text-xl text-white">초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity className="absolute self-center mt-5 top-2/3 bg-blue-800 p-3 rounded-full" onPress={detectImage}>
            <Text className="text-xl text-white">분석</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-1 bg-transparent flex-col">
          <Camera type={cameraType} ref={cameraRef} className="flex w-full aspect-square"></Camera>
          <TouchableOpacity className="absolute self-start mt-5 top-2/3 ml-5" onPress={selectPicture}>
            <SvgUri uri="https://www.svgrepo.com/show/447655/gallery.svg" width={50} height={50} color="#06CFCB" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute self-center mt-5 top-2/3" onPress={takePicture}>
            <SvgUri uri="https://www.svgrepo.com/show/447791/shutter.svg" width={50} height={50} color="#06CFCB" />
          </TouchableOpacity>
          <TouchableOpacity className="absolute self-end mt-5 top-2/3 pr-5" onPress={switchCameraType}>
            <SvgUri uri="https://www.svgrepo.com/show/447761/return.svg" width={50} height={50} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Food;
