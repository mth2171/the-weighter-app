import React, { useEffect, useRef, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView } from "react-native";
import Footer from "../../components/Footer";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { getToken } from "../../utils/tokenManaging";
import Loading from "../../assets/Spinner.gif";

const DietRecommend = ({ navigation }) => {
  const [gender, setGender] = useState("여성");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [disease, setDisease] = useState("");
  const [allergy, setAllergy] = useState("");
  const [isButtonClick, setIsButtonClick] = useState(false);
  const [result, setResult] = useState("");
  const heightRef = useRef(null);
  const weightRef = useRef(null);
  const diseaseRef = useRef(null);
  const allergyRef = useRef(null);

  const onClickSubmitButton = () => {
    if (gender && age && height && weight) {
      setIsButtonClick(true);
      axios
        .post(`http://172.21.1.182:3000/api/chat`, { prompt: { gender, age, height, weight, disease, allergy, flag: false, buttonInput: "button1" } })
        .then((res) => {
          const responseStr = res.data.response.text.replace(/^\n+/, "");
          setResult(responseStr);
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
          const { age, height, weight, disease, allergy } = res.data.status;
          setAge(age);
          setHeight(height);
          setWeight(weight);
          setDisease(disease);
          setAllergy(allergy);
        });
    });
  }, []);
  return (
    <View className="flex w-full h-full justify-center items-center">
      <KeyboardAvoidingView className="flex w-full h-[90%] justify-center items-center" behavior="padding">
        <Text className="text-3xl">식단 추천</Text>
        <RadioButton.Group onValueChange={(newValue) => setGender(newValue)} value={gender}>
          <View className="flex w-full justify-start items-center flex-row mt-8 mb-2">
            <Text className="text-xl">남성</Text>
            <RadioButton.Android value="남성" color="#06CFCB" />
            <Text className="text-xl">여성</Text>
            <RadioButton.Android value="여성" color="#06CFCB" />
          </View>
        </RadioButton.Group>
        <TextInput
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="나이"
          placeholderTextColor="darkgray"
          value={age.toString()}
          onChangeText={(text) => setAge(text)}
          keyboardType="number-pad"
          returnKeyType="done"
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
          placeholderTextColor="darkgray"
          value={weight.toString()}
          onChangeText={(text) => setWeight(text)}
          keyboardType="number-pad"
          returnKeyType="done"
          onSubmitEditing={() => diseaseRef.current.focus()}
        />
        <TextInput
          ref={diseaseRef}
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="질병"
          value={disease}
          placeholderTextColor="darkgray"
          onChangeText={(text) => setDisease(text)}
          returnKeyType="done"
          onSubmitEditing={() => allergyRef.current.focus()}
        />
        <TextInput
          ref={allergyRef}
          className="flex w-2/3 h-12 bg-white border-neutral-400 border ml-5 p-2 text-xl my-2 rounded-lg"
          placeholder="알레르기"
          value={allergy}
          placeholderTextColor="darkgray"
          onChangeText={(text) => setAllergy(text)}
        />
        <TouchableOpacity className="flex w-1/2 h-12 rounded-xl bg-button justify-center items-center mt-5" onPress={onClickSubmitButton}>
          <Text className="text-white text-xl">추천받기</Text>
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={isButtonClick} onRequestClose={() => setIsButtonClick(!isButtonClick)}>
          <View className="flex-1 justify-center items-center">
            <View className="flex w-5/6 justify-center items-center p-5 border-black border bg-white">
              <Text className="text-2xl mb-5">식단 추천 결과</Text>
              {result ? (
                <Text className="text-lg">{result}</Text>
              ) : (
                <>
                  <Image source={Loading} resizeMode="contain" className="w-1/2" />
                  <Text className="text-xl">결과 생성중입니다. 잠시만 기다려주세요.</Text>
                </>
              )}
              <View className="flex w-full mt-5 justify-center items-center flex-row">
                <TouchableOpacity
                  className="flex w-1/3 p-3 justify-center items-center bg-button mt-5 rounded-xl mx-1"
                  onPress={() => {
                    setResult("");
                    setIsButtonClick(false);
                  }}
                >
                  <Text className="text-white text-lg">닫기</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex w-1/3 p-3 justify-center items-center bg-button mt-5 rounded-xl mx-1" onPress={() => {}}>
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

export default DietRecommend;
