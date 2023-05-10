import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const Header = ({ navigation, layout }) => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if (token != null) {
      const tokenJson = JSON.parse(token);
      if (new Date(tokenJson.expiredAt) < new Date()) {
        await AsyncStorage.removeItem("token");
        return null;
      } else {
        return tokenJson.token;
      }
    } else {
      return null;
    }
  };

  return (
    <View className="flex w-full mt-14 justify-center bg-neutral-100">
      <TouchableOpacity onPress={() => navigation.openDrawer()} className="p-3">
        <Icon name="menu" size={30} color="#00909E" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
