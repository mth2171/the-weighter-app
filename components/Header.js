import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View className="flex w-full h-[12%] top-[5%] p-3">
      <Icon name="menu" size={30} color="#00909E" onPress={() => navigation.openDrawer()} />
    </View>
  );
};

export default Header;
