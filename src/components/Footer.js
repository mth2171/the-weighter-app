import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "../styles/FooterStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Ionicons name="md-person-circle" style={styles.button} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
