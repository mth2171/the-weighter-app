import { cameraWithTensors, bundleResourceIO } from "@tensorflow/tfjs-react-native";
import { Camera } from "expo-camera";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as posenet from "@tensorflow-models/posenet";
import { Dimensions, Platform, View, Text, TouchableOpacity } from "react-native";
import { Circle, Line, Path, Svg } from "react-native-svg";
import EstimatePose from "../../utils/estimate-pose";

const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = (Platform.OS = "android");
const IS_IOS = (Platform.OS = "ios");

const CAM_PREVIEW_WIDTH = Dimensions.get("window").width;
const CAM_PREVIEW_HEIGHT = CAM_PREVIEW_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const MIN_KEYPOINT_SCORE = 0.3;

const OUTPUT_TENSOR_WIDTH = 180;
const OUTPUT_TENSOR_HHEIGHT = OUTPUT_TENSOR_WIDTH / (IS_IOS ? 9 / 16 : 3 / 4);

const AUTO_RENDER = false;

const TIME = 30;

const LOAD_MODEL_FROM_BUNDLE = false;

export default function Detect({ navigation, route }) {
  const [tfReady, setTfReady] = useState(false);
  const [model, setModel] = useState();
  const [keypoints, setKeypoints] = useState();
  const [orientation, setOrientation] = useState();
  const [isStarted, setIsStarted] = useState(false);
  const [nowTime, setNowTime] = useState(TIME);

  const cameraRef = useRef(null);
  const rafId = useRef(null);

  const [count, step, checkPoses] = EstimatePose(route.params.pose);

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

      const model = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, movenetModelConfig);
      setModel(model);

      // Ready!
      setTfReady(true);
    }
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

      const poses = await model.estimatePoses(imageTensor, undefined, Date.now());
      tf.dispose([imageTensor]);

      if (poses.length > 0) {
        setKeypoints(poses[0].keypoints);
        checkPoses(poses);
      }

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

  useEffect(() => {
    if (isStarted && nowTime !== 0) {
      const timer = setInterval(() => {
        setNowTime(nowTime - 1);
        clearInterval(timer);
      }, 1000);
    } else if (nowTime === 0) {
      cancelAnimationFrame(rafId.current);
      navigation.navigate("PoseResult", { count, TIME, type: route.params.pose });
      setNowTime(TIME);
      setIsStarted(false);
    }
    if (!isStarted) {
      setNowTime(TIME);
    }
  }, [isStarted, nowTime]);

  const renderPose = () => {
    // 각 관절마다 점 찍어주기
    if (keypoints != null && keypoints.length > 0) {
      const circles = keypoints
        .filter((keypoint) => (keypoint.score ?? 0) > MIN_KEYPOINT_SCORE)
        .map((keypoint) => {
          const x = keypoint.x;
          const y = keypoint.y;
          const cx = (x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT + 25);
          const cy = (y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT + 25 : CAM_PREVIEW_WIDTH);
          return <Circle key={`skeletonkp_${keypoint.name}`} cx={cx} cy={cy} r="4" strokeWidth="2" fill="#000000" stroke="white" />;
        });
      const pathes = posenet.getAdjacentKeyPoints(keypoints, 0.3).map((value) => {
        const x1 = (value[0].x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
        const x2 = (value[1].x / getOutputTensorWidth()) * (isPortrait() ? CAM_PREVIEW_WIDTH : CAM_PREVIEW_HEIGHT);
        const y1 = (value[0].y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT + 25 : CAM_PREVIEW_WIDTH);
        const y2 = (value[1].y / getOutputTensorHeight()) * (isPortrait() ? CAM_PREVIEW_HEIGHT + 25 : CAM_PREVIEW_WIDTH);
        return <Line key={value[0].name + value[1].name} x1={x1} x2={x2} y1={y1} y2={y2} stroke="white" />;
      });
      return (
        <Svg className="absolute w-full h-full z-30">
          {circles}
          {pathes}
        </Svg>
      );
    } else {
      return <View></View>;
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
        return 90;
      case ScreenOrientation.Orientation.LANDSCAPE_RIGHT:
        return 270;
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
    return (
      <View className="relative w-full h-full">
        <View className="absolute w-full h-[10%] z-50 bg-white">
          <View className="flex w-full h-full justify-between flex-row">
            <View className="flex w-2/5 h-full justify-center items-center">
              <Text className="text-3xl">횟수 : {count}</Text>
              <Text className="text-3xl">다음 동작 : {step === 1 ? "↑" : "↓"}</Text>
            </View>
            {isStarted ? (
              <TouchableOpacity className="flex w-1/5 h-full justify-center items-center bg-button" onPress={() => setIsStarted(!isStarted)}>
                <Text className="text-2xl text-white">취소</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="flex w-1/5 h-full justify-center items-center bg-button" onPress={() => setIsStarted(!isStarted)}>
                <Text className="text-2xl text-white">시작</Text>
              </TouchableOpacity>
            )}
            <View className="flex w-2/5 h-full justify-center items-center flex-col">
              <Text className="text-3xl">남은시간</Text>
              <Text className="text-3xl">{nowTime}초</Text>
            </View>
          </View>
        </View>
        <TensorCamera
          ref={cameraRef}
          className="absolute w-full h-full z-30"
          autorender={AUTO_RENDER}
          type={Camera.Constants.Type.front}
          cameraTextureWidth={getOutputTensorWidth()}
          cameraTextureHeight={getOutputTensorHeight()}
          resizeWidth={getOutputTensorWidth()}
          resizeHeight={getOutputTensorHeight()}
          resizeDepth={3}
          rotation={getTextureRotationAngleInDegrees()}
          onReady={handleCameraStream}
        />
        {renderPose()}
      </View>
    );
  }
}
