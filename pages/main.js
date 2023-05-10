import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Footer from "../components/Footer";
import banner from "../assets/banner.png";
import Saying from "./saying";

const SayingIndex = Math.floor(Math.random() * Saying.length);

const Main = ({ navigation }) => {
  return (
    <View className="flex w-full h-full">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100">
        <View className="absolute top-0 w-full h-28">
          <Image source={banner} resizeMode="center" className="w-full h-28" />
        </View>
        <View className="flex w-full justify-center items-center flex-row mt-40">
          <TouchableOpacity
            className="flex w-2/5 h-40 justify-center items-center bg-button mx-2 rounded-xl"
            onPress={() => navigation.navigate("NutritionSelect")}
          >
            <Text className="text-2xl text-white">영양소 분석</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex w-2/5 h-40 justify-center items-center bg-button mx-2 rounded-xl"
            onPress={() => navigation.navigate("PoseSetting")}
          >
            <Text className="text-2xl text-white">체력 검정</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-[85%] h-48 p-3 justify-center mt-10 rounded-xl">
          <Text className="text-xl mt-5 text-center font-bold">{Saying[SayingIndex].quote}</Text>
          <View className="flex w-full items-end">
            <Text className="text-lg mt-5 text-neutral-400 font-bold">{`- ${Saying[SayingIndex].speaker}`}</Text>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default Main;
