import React from "react";
import styles from "../../styles/MenuStyles";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Menu = () => {
  const navigator = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.text}>서비스 소개</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.text}>영양소 분석</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.text}>운동하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.text}>고객 지원</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Menu;
