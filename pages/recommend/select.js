import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SelectRecommend = ({ navigation }) => {
  return (
    <View className="flex w-full h-full justify-center items-center">
      <TouchableOpacity className="flex w-2/3 h-16 bg-button mb-5 justify-center items-center rounded-lg" onPress={() => navigation.navigate("DietRecommend")}>
        <Text className="text-2xl text-white">식단 추천</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex w-2/3 h-16 bg-button mt-5 justify-center items-center rounded-lg"
        onPress={() => navigation.navigate("ExerciseRecommend")}
      >
        <Text className="text-2xl text-white">운동 추천</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectRecommend;
