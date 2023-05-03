import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Footer from "../../../components/Footer";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import axios from "axios";
import { getToken } from "../../../utils/tokenManaging";

const HealthProfile = ({ route, navigation }) => {
  const [data, setData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [allergy, setAllergy] = useState("");
  const ageRef = useRef();
  const heightRef = useRef();
  const weightRef = useRef();
  const allergyRef = useRef();

  const onClickSubmitButton = () => {
    setOpenModal(!openModal);
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/profile/statusModify`,
          { age, height, weight, allergy },
          {
            withCredentials: true,
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    });
  };

  useEffect(() => {
    if (route.params) {
      const { age, height, weight, allergy } = route.params.healthData;
      setAge(age);
      setHeight(height);
      setWeight(weight);
      setAllergy(allergy);
    }
  }, []);

  return (
    <View className="flex w-full h-full">
      <View className="flex w-full h-[90%] justify-center items-center">
        <Text className="text-3xl">건강정보</Text>
        {route.params ? (
          <>
            <View className="flex w-5/6 justify-center items-center flex-col my-10">
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border items-end">
                  <Text className="text-2xl">나이</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-y border-r items-start">
                  <Text className="text-2xl">{age}세</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">키</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{height}cm</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">몸무게</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{weight}kg</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">알레르기</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{allergy}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mb-5" onPress={() => setOpenModal(!openModal)}>
              <Text className="text-lg text-white">건강정보 수정하기</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg my-5">
              <Text className="text-lg text-white">건강정보 입력하기</Text>
            </TouchableOpacity>
          </>
        )}
        <View className="flex w-5/6 flex-row justify-center items-center">
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("DefaultProfile")}>
            <Text className="text-lg text-white">기본정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("NutritionProfile")}>
            <Text className="text-lg text-white">영양정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("ExerciseProfile")}>
            <Text className="text-lg text-white">운동정보</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
      <Modal className="flex-1 justify-center items-center" visible={openModal} transparent={true}>
        <View className="flex-1 justify-center items-center">
          <KeyboardAvoidingView className="flex w-5/6 h-2/3 op-3 bg-white rounded-xl border-black border justify-center items-center" behavior="padding">
            <Text className="text-3xl mb-10">{route.params ? "건강정보 수정하기" : "건강정보 입력하기"}</Text>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-center">
                <Text className="text-2xl">나이</Text>
              </View>
              <TextInput
                ref={ageRef}
                value={age.toString()}
                className="flex w-1/2 h-14 border-neutral-400 border px-3 text-xl rounded-md my-2"
                placeholderTextColor="darkgray"
                placeholder="나이"
                onChangeText={(text) => setAge(text)}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => heightRef.current.focus()}
              />
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-center">
                <Text className="text-2xl">키</Text>
              </View>
              <TextInput
                ref={heightRef}
                value={height.toString()}
                className="flex w-1/2 h-14 border-neutral-400 border px-3 text-xl rounded-md my-2"
                placeholderTextColor="darkgray"
                placeholder="키"
                onChangeText={(text) => setHeight(text)}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => weightRef.current.focus()}
              />
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-center">
                <Text className="text-2xl">몸무게</Text>
              </View>
              <TextInput
                ref={weightRef}
                value={weight.toString()}
                className="flex w-1/2 h-14 border-neutral-400 border px-3 text-xl rounded-md my-2"
                placeholderTextColor="darkgray"
                placeholder="몸무게"
                onChangeText={(text) => setWeight(text)}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => allergyRef.current.focus()}
              />
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-center">
                <Text className="text-2xl">알레르기</Text>
              </View>
              <TextInput
                ref={allergyRef}
                value={allergy}
                className="flex w-1/2 h-14 border-neutral-400 border px-3 text-xl rounded-md my-2"
                placeholderTextColor="darkgray"
                placeholder="알레르기"
                onChangeText={(text) => setAllergy(text)}
              />
            </View>
            <TouchableOpacity className="flex w-1/3 p-3 bg-button rounded-xl justify-center items-center mt-5" onPress={() => onClickSubmitButton()}>
              <Text className="text-xl text-white">적용</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

export default HealthProfile;
