import { bundleResourceIO, cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as posenet from "@tensorflow-models/posenet";
import { Dimensions, Platform, View, Text } from "react-native";
import { Circle, Line, Path, Svg } from "react-native-svg";
import { BinaryFile } from "react-native-binary-file";

const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = (Platform.OS = "android");
const IS_IOS = (Platform.OS = "ios");

const CAM_PREVIEW_WIDTH = Dimensions.get("window").width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const MIN_KEYPOINT_SCORE = 0.5;

const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HHEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const AUTO_RENDER = false;

const LOAD_MODEL_FROM_BUNDLE = false;

export default function Pose() {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState();
  const [poses, setPoses] = useState();
  const [fps, setFps] = useState(0);
  const [orientation, setOrientation] = useState();
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);

  const cameraRef = useRef(null);
  const rafId = useRef(null);

  useEffect(() => {
    async function prepare() {
      rafId.current = null;

      // Set initial orientation.
      const curOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(curOrientation);

      // Listens to orientation change.
      ScreenOrientation.addOrientationChangeListener((event) => {
        setOrientation(event.orientationInfo.orientation);
      });

      // Camera permission.
      await Camera.requestCameraPermissionsAsync();

      // Wait for tfjs to initialize the backend.
      await tf.ready();

      // Load movenet model.
      // https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
      const movenetModelConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
        enableSmoothing: true,
      };
      if (LOAD_MODEL_FROM_BUNDLE) {
        const modelJson = require("./offline_model/model.json");
        const modelWeights1 = BinaryFile.open("./offline_model/group1-shard1of2.bin");
        const modelWeights2 = BinaryFile.open("./offline_model/group1-shard2of2.bin");
        movenetModelConfig.modelUrl = bundleResourceIO(modelJson, [modelWeights1, modelWeights2]);
      }
      const model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, movenetModelConfig);
      setModel(model);

      // Ready!
      setTfReady(true);
    }
    console.log(Platform.OS);

    prepare();
  }, []);

  useEffect(() => {
    return () => {
      if (rafId.current != null && rafId.current !== 0) {
        cancelAnimationFrame(rafId.current);
        rafId.current = 0;
      }
    };
  }, []);

  const handleCameraStream = async (images, updatePreview, gl) => {
    const loop = async () => {
      // Get the tensor and run pose detection.
      const imageTensor = images.next().value;

      const startTs = Date.now();
      const poses = await model.estimatePoses(imageTensor, undefined, Date.now());
      const latency = Date.now() - startTs;
      setFps(Math.floor(1000 / latency));
      setPoses(poses);
      tf.dispose([imageTensor]);

      if (rafId.current === 0) {
        return;
      }

      // Render camera preview manually when autorender=false.
      if (!AUTO_RENDER) {
        updatePreview();
        gl.endFrameEXP();
      }

      rafId.current = requestAnimationFrame(loop);
    };

    loop();
  };

  const renderPose = () => {
    // 각 관절마다 점 찍어주기
    if (poses != null && poses.length > 0) {
      const points = poses[0].keypoints;
      const keypoints = points
        .filter((k) => (k.score ?? 0) > MIN_KEYPOINT_SCORE)
        .map((k) => {
          const filpX = IS_ANDROID || cameraType === Camera.Constants.Type.back;
          const x = k.x;
          const y = k.y + 15;
          const cx = (x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
          const cy = (y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH);
          return <Circle key={`skeletonkep_${k.name}`} cx={cx} cy={cy} r="4" strokeWidth="2" fill="#000000" stroke="white" />;
        });

      return (
        <Svg className="absolute w-full h-full z-30">
          {keypoints}
          {getPathData(points)}
        </Svg>
      );
    } else {
      return <View></View>;
    }
  };

  const getPathData = (points) => {
    const adPoint = posenet.getAdjacentKeyPoints(points, 0.5);
    if (adPoint.length === 0) {
      return "";
    }

    const path = adPoint.map((value) => {
      const x1 = (value[0].x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
      const x2 = (value[1].x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
      const y1 = (value[0].y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH) + 30;
      const y2 = (value[1].y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH) + 30;
      return <Line x1={x1} x2={x2} y1={y1} y2={y2} stroke="white" />;
    });

    return path;
  };

  const renderFps = () => {
    // 프레임 화면에 표시
    return (
      <View className="absolute top-12 left-2.5 w-20 items-center bg-white opacity-70 rounded-sm p-2 z-20">
        <Text>FPS : {fps}</Text>
      </View>
    );
  };

  const renderCameraTypeSwitcher = () => {
    // 카메라 전환 버튼 화면에 표시
    return (
      <View className="absolute top-12 right-2.5 w-[180px] items-center bg-white opacity-70 rounded-sm p-2 z-20" onTouchEnd={handleSwitchCameraType}>
        <Text>Switch to {cameraType === Camera.Constants.Type.front ? "back" : "front"} camera</Text>
      </View>
    );
  };

  const handleSwitchCameraType = () => {
    // 카메라 전환 버튼 클릭 시 실행되는 함수
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };

  const isPortrait = () => {
    return orientation === ScreenOrientation.Orientation.PORTRAIT_UP || orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;
  };

  const getOutputTensorWidth = () => {
    return isPortrait() || IS_ANDROID ? OUTPUT_TENSOR_WIDTH : OUTPUT_TENSOR_HHEIGHT;
  };

  const getOutputTensorHeight = () => {
    return isPortrait() || IS_ANDROID ? OUTPUT_TENSOR_HHEIGHT : OUTPUT_TENSOR_WIDTH;
  };

  const getTextureRotationAngleInDegrees = () => {
    // 휴대폰 방향에 따른 각도 조정
    if (IS_ANDROID) {
      return 0;
    }
    switch (orientation) {
      case ScreenOrientation.Orientation.PORTRAIT_DOWN:
        return 180;
      case ScreenOrientation.Orientation.LANDSCAPE_LEFT:
        return cameraType === Camera.Constants.Type.front ? 270 : 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return cameraType === Camera.Constants.Type.front ? 90 : 270;
      default:
        return 0;
    }
  };

  if (!tfReady) {
    return (
      <View className="absolute w-full h-full items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  } else {
    const width = isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT;
    const height = isPortrait() ? CAM_PREVIEW_HEIGHT : CAM_PREVIEW_WIDTH;
    const margin = Dimensions.get("window").height / 2 - CAM_PREVIEW_HEIGHT / 2;
    return (
      <View className="absolute w-full h-full">
        <TensorCamera
          ref={cameraRef}
          className="absolute w-full h-full z-30"
          autorender={AUTO_RENDER}
          type={cameraType}
          cameraTextureWidth={getOutputTensorWidth()}
          cameraTextureHeight={getOutputTensorHeight()}
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees()}
          onReady={handleCameraStream}
        />
        {renderPose()}
        {renderFps()}
        {renderCameraTypeSwitcher()}
      </View>
    );
  }
}
