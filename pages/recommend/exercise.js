import React, { useEffect, useRef, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Modal, Image, KeyboardAvoidingView } from "react-native";
import Footer from "../../components/Footer";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import Loading from "../../assets/Spinner.gif";
import { getToken } from "../../utils/tokenManaging";

const ExerciseRecommend = () => {
  const [gender, setGender] = useState("여성");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [result, setResult] = useState("");
  const [training, setTraining] = useState("Cardio");

  const ageRef = useRef(null);
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const goalWeightRef = useRef(null);

  const onClickSubmitButton = () => {
    if (gender && age && height && weight && goalWeight) {
      setIsButtonClick(true);
      axios
        .post(`http://172.21.1.182:3000/api/chat`, { prompt: { gender, age, height, weight, goalWeight, training, flag: true } })
        .then((res) => {
          const responseStr = res.data.response.text.replace(/^\n+/, "");
          setResult(responseStr);
        })
        .catch((err) => console.error(err));
    }
  };

  const onClickSaveButton = () => {
    if (result) {
      axios
        .post(`http://172.21.1.182:3000/api/chat`, { prompt: { buttonType: true, flag: true }, data: result })
        .then((res) => {
          const plan = res.data.response.text;
          getToken().then((token) => {
            axios
              .post(
                `http://${process.env.API_URL}/planner/exercise`,
                { plan },
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    Authorization: `bearer ${token.token}`,
                  },
                }
              )
              .then((res) => console.log(res.data))
              .catch((err) => console.error(err));
          });
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/profile`,
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          const { age, height, weight } = res.data.status;
          setAge(age);
          setHeight(height);
          setWeight(weight);
        });
    });
  }, []);

  return (
    <View className="flex w-full h-full justify-center items-center">
      <KeyboardAvoidingView className="flex w-full h-[90%] justify-center items-center" behavior="padding">
        <Text className="text-3xl">운동 추천</Text>
        <RadioButton.Group onValueChange={(newValue) => setGender(newValue)} value={gender}>
          <View className="flex w-full justify-start items-center flex-row px-10 py-3">
            <Text className="text-lg">남성</Text>
            <RadioButton.Android value="남성" color="#06CFCB" />
            <Text className="text-lg">여성</Text>
            <RadioButton.Android value="여성" color="#06CFCB" />
          </View>
        </RadioButton.Group>
        <TextInput
          ref={ageRef}
          value={age.toString()}
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="나이"
          placeholderTextColor="darkgray"
          onChangeText={(text) => setAge(text)}
          keyboardType="number-pad"
          returnKeyType="done"
          returnKeyLabel="다음"
          onSubmitEditing={() => heightRef.current.focus()}
        />
        <TextInput
          ref={heightRef}
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="키"
          value={height.toString()}
          placeholderTextColor="darkgray"
          onChangeText={(text) => setHeight(text)}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={() => weightRef.current.focus()}
        />
        <TextInput
          ref={weightRef}
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="몸무게"
          value={weight.toString()}
          placeholderTextColor="darkgray"
          onChangeText={(text) => setWeight(text)}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={() => goalWeightRef.current.focus()}
        />
        <TextInput
          ref={goalWeightRef}
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="목표 몸무게"
          placeholderTextColor="darkgray"
          onChangeText={(text) => setGoalWeight(text)}
          keyboardType="number-pad"
          returnKeyType="done"
        />
        <RadioButton.Group onValueChange={(newValue) => setTraining(newValue)} value={training}>
          <View className="flex w-full justify-start items-center flex-row px-10 py-3">
            <Text className="text-lg">유산소</Text>
            <RadioButton.Android value="Cardio" color="#06CFCB" />
            <Text className="text-lg">무산소</Text>
            <RadioButton.Android value="근력 운동" color="#06CFCB" />
          </View>
        </RadioButton.Group>
        <TouchableOpacity className="flex w-1/2 h-12 rounded-xl bg-button justify-center items-center mt-5" onPress={onClickSubmitButton}>
          <Text className="text-white text-xl">추천받기</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={isButtonClick} onRequestClose={() => setIsButtonClick(!isButtonClick)}>
          <View className="flex-1 justify-center items-center">
            <View className="flex w-5/6 justify-center items-center p-5 border-black border bg-white">
              <Text className="text-2xl">운동 추천 결과</Text>
              {result ? (
                <Text className="text-lg mt-5">{result}</Text>
              ) : (
                <>
                  <Image source={Loading} resizeMode="contain" className="w-1/2" />
                  <Text className="text-xl">결과 생성중입니다. 잠시만 기다려주세요.</Text>
                </>
              )}
              <View className="flex w-full mt-5 flex-row justify-center items-center">
                <TouchableOpacity
                  className="flex w-1/3 p-3 justify-center items-center bg-button mt-5 rounded-xl mx-1"
                  onPress={() => {
                    setResult("");
                    setIsButtonClick(false);
                  }}
                >
                  <Text className="text-white text-lg">닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex w-1/3 p-3 justify-center items-center bg-button mt-5 rounded-xl mx-1"
                  onPress={() => {
                    onClickSaveButton();
                  }}
                >
                  <Text className="text-white text-lg">저장</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
};

export default ExerciseRecommend;
