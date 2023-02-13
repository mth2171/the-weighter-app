import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import styles from "../styles/HeaderStyles";
import { Entypo } from "@expo/vector-icons";
import logo from "../../assets/icon/logo.png";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Main")}>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Entypo name="menu" color="#00919E" style={styles.menu} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
