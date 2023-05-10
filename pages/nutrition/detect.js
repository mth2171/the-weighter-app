import "@tensorflow/tfjs-backend-cpu";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageBackground, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Camera } from "expo-camera";
import * as tf from "@tensorflow/tfjs";
import * as ImagePicker from "expo-image-picker";
import { SvgUri, Svg, Rect } from "react-native-svg";
import { fetch, decodeJpeg, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import { manipulateAsync } from "expo-image-manipulator";

const WINDOW_WIDTH = Dimensions.get("window").width;
const WINDOW_HEIGHT = WINDOW_WIDTH / (9 / 16);

const NutritionDetect = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [model, setModel] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [openModal, setOpenModal] = useState(false);
  const [resultUri, setResultUri] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const cameraRef = useRef(null);
  const imageRef = useRef(null);
  const detailRef = useRef(null);

  useEffect(() => {
    loadModel();
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await tf.ready();
    })();
  }, []);

  const loadModel = async () => {
    const model = await tf.loadLayersModel("../../assets/food_model_2/model.json");
    setModel(model);
  };

  const selectPicture = async () => {
    const options = { mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.5, base64: true, aspect: [1, 1] };
    const data = await ImagePicker.launchImageLibraryAsync(options);
    if (data.uri) {
      setImageUri(data.uri);
      Image.getSize(data.uri, (width, height) => {
        setImageSize({ width, height });
      });
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
      setPredictions(null);
      setResultUri([]);
    }
  };

  const detectImage = async () => {
    const imgData = await fetch(imageUri, {}, { isBinary: true });
    const rawImageData = new Uint8Array(await imgData.arrayBuffer());
    const imageTensor = decodeJpeg(rawImageData);

    const model = await cocoSsd.load({ base: "lite_mobilenet_v2" });
    const prediction = await model.detect(imageTensor, 20, 0.05);
    setPredictions(prediction.filter((value) => value.class === "bowl"));
  };

  const switchCameraType = () => {
    setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
  };

  const drawSvg = () => {
    if (predictions != null && predictions.length > 0) {
      const rects = predictions.map((value) => {
        if (imageSize.width > imageSize.height) {
          const x = (value.bbox[0] * WINDOW_WIDTH) / imageSize.width;
          const y = (value.bbox[1] * WINDOW_WIDTH) / imageSize.width + (500 - (imageSize.height * WINDOW_WIDTH) / imageSize.width) / 2;
          const width = (value.bbox[2] * WINDOW_WIDTH) / imageSize.width;
          const height = (value.bbox[3] * WINDOW_WIDTH) / imageSize.width;
          return <Rect key={Math.random()} x={x} y={y} width={width} height={height} stroke="red" strokeWidth="2" />;
        } else {
          const x = (value.bbox[0] * WINDOW_HEIGHT) / imageSize.height;
          const y = (value.bbox[1] * WINDOW_HEIGHT) / imageSize.height;
          const width = (value.bbox[2] * WINDOW_HEIGHT) / imageSize.height;
          const height = (value.bbox[3] * WINDOW_HEIGHT) / imageSize.height;
          return <Rect key={Math.random()} x={x} y={y} width={width} height={height} stroke="red" strokeWidth="2" />;
        }
      });
      return <Svg className="absolute w-full h-full">{rects}</Svg>;
    } else {
      return <View></View>;
    }
  };

  const cropImages = async () => {
    if (predictions != null && predictions.length > 0) {
      await Promise.all(
        predictions.map((value) => {
          const x = value.bbox[0];
          const y = value.bbox[1];
          const width = value.bbox[2];
          const height = value.bbox[3];
          const result = manipulateAsync(imageUri, [{ crop: { originX: x, originY: y, width, height } }]);
          return result;
        })
      ).then((value) => {
        setResultUri(value);
      });
    }
  };

  const detailImages = () => {
    if (resultUri != null && resultUri.length > 0) {
      const images = resultUri.map((value, index) => {
        return (
          <TouchableOpacity key={index} onPress={() => onClickDetailImage(value.uri)}>
            <Image source={{ uri: value.uri }} className="flex w-20 h-20 mx-1" />
          </TouchableOpacity>
        );
      });
      return (
        <ScrollView className="flex w-full flex-row" horizontal={true}>
          {images}
        </ScrollView>
      );
    } else {
      return <View></View>;
    }
  };

  const uriToImage = (uri) => {
    return <Image source={{ uri }} />;
  };

  const onClickDetailImage = async (uri) => {
    const imageData = await fetch(uri, {}, { isBinary: true });
    const rawImageData = new Uint8Array(await imageData.arrayBuffer());
    const imageTensor = decodeJpeg(rawImageData);
    // const tensor = tf.browser.fromPixels(detailRef.current);
    // const nomalizedTensor = tensor.div(255).expandDims(0);
    // const resizedTensor = nomalizedTensor.resizeBilinear([604, 456]);
    const predictions = model.predict(imageTensor);
    console.log(predictions);
  };

  useEffect(() => {
    if (predictions) {
      cropImages();
    }
  }, [predictions]);

  return (
    <View className="flex-1">
      {imageUri ? (
        <View className="flex-1 bg-transparent flex-col">
          <View className="flex w-full h-2/3 justify-center items-center">
            <ImageBackground ref={imageRef} source={{ uri: imageUri }} resizeMode="contain" className="flex w-full h-full justify-center items-center">
              {drawSvg()}
            </ImageBackground>
          </View>
          <View className="flex w-full h-1/3 items-start mt-5 justify-between flex-row">
            <TouchableOpacity className="flex w-20 h-10 bg-red-800 rounded-full ml-10 items-center justify-center" onPress={resetPicture}>
              <Text className="text-xl text-white">초기화</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex w-20 h-10 bg-blue-800 rounded-full items-center justify-center" onPress={detectImage}>
              <Text className="text-xl text-white">분석</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex w-32 h-10 bg-green-800 rounded-full mr-10 items-center justify-center" onPress={() => setOpenModal(!openModal)}>
              <Text className="text-xl text-white">상세정보 확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-1 bg-transparent flex-col">
          <Camera type={cameraType} ref={cameraRef} className="flex w-full h-2/3 aspect-square"></Camera>
          <View className="flex h-1/3 justify-between items-start mt-5 flex-row">
            <TouchableOpacity className="flex ml-5" onPress={selectPicture}>
              <SvgUri uri="https://www.svgrepo.com/show/447655/gallery.svg" width={50} height={50} color="#06CFCB" />
            </TouchableOpacity>
            <TouchableOpacity className="flex" onPress={takePicture}>
              <SvgUri uri="https://www.svgrepo.com/show/447791/shutter.svg" width={50} height={50} color="#06CFCB" />
            </TouchableOpacity>
            <TouchableOpacity className="flex mr-5" onPress={switchCameraType}>
              <SvgUri uri="https://www.svgrepo.com/show/447761/return.svg" width={50} height={50} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={openModal} onRequestClose={() => setOpenModal(!openModal)}>
        <View className="flex-1 justify-center items-center">
          <View className="flex w-4/5 h-2/3 bg-white rounded-xl p-10 items-center shadow-shadow">
            <View className="flex w-full h-[15%] justify-center items-center">
              <Text className="text-3xl">상세정보 확인</Text>
            </View>
            {detailImages()}
            <View className="flex w-full h-[15%] justify-center items-center flex-row">
              <TouchableOpacity
                className="flex bg-red-500 rounded-2xl mr-5"
                onPress={() => setResultUri(resultUri.filter((value) => value.uri !== selectedImage))}
              >
                <Text className="text-white text-xl p-3">삭제</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex bg-black rounded-2xl" onPress={() => setOpenModal(!openModal)}>
                <Text className="text-white text-xl p-3">닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NutritionDetect;
