import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Footer from "../components/Footer";
import InfoData from "./infoData";
import info1 from "../assets/info1.png";
import info2 from "../assets/info2.png";
import info3 from "../assets/info3.png";

const Info = () => {
  const [mode, setMode] = useState("info1");

  return (
    <View className="flex w-full h-full justify-center items-center">
      <View className="flex w-full h-[90%] justify-center items-center">
        <View className="flex w-5/6 flex-row justify-center items-center mt-10">
          <TouchableOpacity className="w-28 h-28" onPress={() => setMode("info1")}>
            <Image source={info1} className="w-full h-full rounded-l-xl" />
          </TouchableOpacity>
          <TouchableOpacity className="w-28 h-28" onPress={() => setMode("info2")}>
            <Image source={info2} className="w-full h-full" />
          </TouchableOpacity>
          <TouchableOpacity className="w-28 h-28" onPress={() => setMode("info3")}>
            <Image source={info3} className="w-full h-full rounded-r-xl" />
          </TouchableOpacity>
        </View>
        <View className="flex w-5/6 h-1/3 mt-5">
          <View className="flex w-full h-1/3 border-b border-black justify-center p-3">
            <Text className="text-3xl">{InfoData[mode].title}</Text>
          </View>
          <View className="flex w-full h-2/3 p-3">
            <Text className="text-xl">{InfoData[mode].content}</Text>
          </View>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default Info;
