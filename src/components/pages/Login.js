import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles/LoginStyles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigator = useNavigation();
  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" style={styles.icon} />
      <Text style={styles.loginFont}>로그인</Text>
      <TextInput style={styles.input} placeholder="이메일 주소" />
      <TextInput style={styles.input} placeholder="비밀번호" />
      <View style={styles.text}>
        <TouchableOpacity onPress={() => alert("Forget Password Clicked")}>
          <Text style={{ color: "#7a7a7a" }}>비밀번호를 잊으셨나요?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
        <Text style={{ color: "#b8b8b8" }}>계정이 존재하지 않나요?</Text>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigator.navigate("Signup")}>
          <Text style={{ color: "#00919E" }}>계정 만들기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
