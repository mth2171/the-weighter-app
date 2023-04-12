import { Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const navigation = useNavigation();
  return (
    <View className="flex w-full h-[80%] justify-center items-center bg-button flex-row">
      <View className="flex w-2/5 h-40 justify-center items-center bg-neutral-100 mr-2">
        <Text className="text-2xl">건강 관리</Text>
      </View>
      <View className="flex w-2/5 h-40 justify-center items-center bg-neutral-100 ml-2">
        <Text className="text-2xl">체력 검정</Text>
      </View>
    </View>
  );
};

export default Main;
