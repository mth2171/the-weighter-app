import React from "react";
import { TouchableOpacity, Text, View } from "react-native";

const NutritionSelect = ({ navigation }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-3xl">영양소 분석</Text>
      <View className="flex w-full h-1/6 justify-center items-center flex-row mt-10">
        <TouchableOpacity
          className="flex w-1/3 h-full p-3 justify-center items-center bg-button mx-2 rounded-lg"
          onPress={() => navigation.navigate("NutritionBarcode")}
        >
          <Text className="text-white text-2xl">바코드 인식</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex w-1/3 h-full p-3 justify-center items-center bg-button mx-2 rounded-lg"
          onPress={() => navigation.navigate("NutritionDetect")}
        >
          <Text className="text-white text-2xl">음식 인식</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NutritionSelect;
