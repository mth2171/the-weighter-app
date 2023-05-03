import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Title from "../../assets/title.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Login = ({ onLogin }) => {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onClickLoginButton = () => {
    if (id && password) {
      axios
        .post(
          `http://${process.env.API_URL}/login/post`,
          { id, pw: password },
          {
            withCredentials: true,
          }
        )
        .then(async (res) => {
          onLogin(res.data.data).then(() => navigation.navigate("Home"));
        })
        .catch((err) => Alert.alert("ID와 비밀번호를 확인해주세요."));
    } else {
      Alert.alert("ID와 비밀번호를 모두 입력해주세요.");
    }
  };

  return (
    <View className="flex w-full h-full justify-center items-center">
      <View className="flex w-3/4 h-16 justify-center items-center">
        <Image source={Title} resizeMode="contain" className="w-full" />
      </View>
      <View className="flex w-full justify-center items-center mt-10">
        <TextInput
          className="flex w-5/6 bg-white text-xl border-neutral-400 border rounded-lg p-3 mt-4"
          placeholderTextColor="darkgray"
          placeholder="이메일"
          keyboardType="email-address"
          onChangeText={(text) => setId(text)}
        />
        <TextInput
          className="flex w-5/6 bg-white text-xl border-neutral-400 border rounded-lg p-3 mt-6"
          placeholderTextColor="darkgray"
          placeholder="비밀번호"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity className="flex w-1/3 h-12 justify-center items-center bg-button mt-6 rounded-xl" onPress={() => onClickLoginButton()}>
          <Text className="text-xl text-white">로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
