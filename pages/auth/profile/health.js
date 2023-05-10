import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import Footer from "../../../components/Footer";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import axios from "axios";
import { getToken } from "../../../utils/tokenManaging";

const HealthProfile = ({ route, navigation }) => {
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
    <View className="flex-1 bg-neutral-100">
      <View className="flex w-full h-[90%] justify-center items-center">
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-t p-3">
          <Text className="text-2xl font-semibold">건강정보</Text>
        </View>
        {age ? (
          <>
            <View className="flex w-5/6 justify-center items-center flex-col border-neutral-300 border-y p-3">
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">나이</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{`${age}세`}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">키</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{`${height}cm`}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">몸무게</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{`${weight}kg`}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">알레르기</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{allergy}</Text>
                </View>
              </View>
              <TouchableOpacity
                className="flex justify-center items-center border-neutral-400 border p-3 rounded-lg my-3"
                onPress={() => setOpenModal(!openModal)}
              >
                <Text className="text-xl">건강정보 수정하기</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg my-5" onPress={() => setOpenModal(!openModal)}>
              <Text className="text-lg text-white">건강정보 입력하기</Text>
            </TouchableOpacity>
          </>
        )}
        <View className="flex w-5/6 flex-row justify-center items-center mt-5">
          <TouchableOpacity
            className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
            onPress={() => navigation.navigate("DefaultProfile")}
          >
            <Text className="text-xl text-white">기본정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2" onPress={() => navigation.navigate("PlanProfile")}>
            <Text className="text-xl text-white">계획정보</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-5/6 flex-row justify-center items-center mt-4">
          <TouchableOpacity
            className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
            onPress={() => navigation.navigate("NutritionProfile")}
          >
            <Text className="text-xl text-white">영양정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
            onPress={() => navigation.navigate("ExerciseProfile")}
          >
            <Text className="text-xl text-white">운동정보</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
      <Modal className="flex-1 justify-center items-center" visible={openModal} transparent={true}>
        <View className="flex-1 justify-center items-center">
          <KeyboardAvoidingView className="flex w-5/6 h-1/2 bg-white border-black border justify-center items-center" behavior="padding">
            <Text className="text-3xl">건강 정보</Text>
            <View className="flex w-5/6 flex-row justify-center items-center mt-5">
              <View className="flex w-1/3 justify-center items-end">
                <Text className="text-2xl">나이</Text>
              </View>
              <TextInput
                ref={ageRef}
                value={age.toString()}
                className="flex w-2/3 h-12 border-neutral-400 border px-3 text-xl rounded-md my-2 mx-5"
                placeholderTextColor="darkgray"
                onChangeText={(text) => setAge(text)}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => heightRef.current.focus()}
              />
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-end">
                <Text className="text-2xl">키</Text>
              </View>
              <TextInput
                ref={heightRef}
                value={height.toString()}
                className="flex w-2/3 h-12 border-neutral-400 border px-3 text-xl rounded-md my-2 mx-5"
                placeholderTextColor="darkgray"
                onChangeText={(text) => setHeight(text)}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => weightRef.current.focus()}
              />
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-end">
                <Text className="text-2xl">몸무게</Text>
              </View>
              <TextInput
                ref={weightRef}
                value={weight.toString()}
                className="flex w-2/3 h-12 border-neutral-400 border px-3 text-xl rounded-md my-2 mx-5"
                placeholderTextColor="darkgray"
                onChangeText={(text) => setWeight(text)}
                keyboardType="number-pad"
                returnKeyType="done"
                onSubmitEditing={() => allergyRef.current.focus()}
              />
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <View className="flex w-1/3 justify-center items-end">
                <Text className="text-2xl">알레르기</Text>
              </View>
              <TextInput
                ref={allergyRef}
                value={allergy}
                className="flex w-2/3 h-12 border-neutral-400 border px-3 text-xl rounded-md my-2 mx-5"
                placeholderTextColor="darkgray"
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
