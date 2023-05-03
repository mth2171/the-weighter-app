import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

const Main = () => {
  const navigation = useNavigation();

  return (
    <View className="flex w-full h-full">
      <View className="flex w-full h-[90%] justify-center items-center bg-button flex-row">
        <TouchableOpacity className="flex w-2/5 h-40 justify-center items-center bg-neutral-100 mr-2" onPress={() => navigation.navigate("Select")}>
          <Text className="text-2xl">건강 관리</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex w-2/5 h-40 justify-center items-center bg-neutral-100 ml-2" onPress={() => navigation.navigate("PoseSelect")}>
          <Text className="text-2xl">체력 검정</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default Main;
