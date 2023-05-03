import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View className="flex w-full h-[12%] justify-between items-center bg-button flex-row px-10 pb-5 border-t border-white">
      <Icon name="md-home-sharp" size={40} color="white" onPress={() => navigation.navigate("Home")} />
      <Icon name="person-circle" size={50} color="white" onPress={() => navigation.navigate("DefaultProfile")} />
    </View>
  );
};

export default Footer;
