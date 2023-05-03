import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import title from "../../assets/title.png";

const IsNotLogin = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="w-full h-full justify-center items-center">
        <Image className="w-5/6 h-20 mb-10" source={title} />
        <Text className="text-lg">로그인 후 이용해주세요</Text>
        <View className="w-full justify-center items-center flex-row mt-10">
          <TouchableOpacity className="flex w-1/3 h-12 bg-button rounded-xl justify-center items-center mx-1" onPress={() => navigation.navigate("Home")}>
            <Text className="text-lg text-white">홈으로</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex w-1/3 h-12 bg-button rounded-xl justify-center items-center mx-1" onPress={() => navigation.navigate("Login")}>
            <Text className="text-lg text-white">로그인으로</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default IsNotLogin;
