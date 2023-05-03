import React, { useState, useEffect } from "react";
import { Alert, Image, KeyboardAvoidingView, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import Title from "../../assets/title.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";

const SignUp = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [certNumber, setCertNumber] = useState("");
  const [inputCertNumber, setInputCertNumber] = useState("");
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("남성");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const onClickEmailConfirm = () => {
    const reg = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(reg)) {
      axios
        .post(`http://${API_URL}/signup/emailCheck`, { email })
        .then((res) => {
          if (res.data.result) {
            setIsConfirmEmail(res.data.result);
          } else {
            Alert.alert("이미 가입된 이메일입니다.");
          }
        })
        .catch((err) => console.error(err));
    } else {
      Alert.alert("이메일 형식에 맞게 입력해주세요.");
    }
  };

  const onClickEmailCert = () => {
    setOpenModal(true);
    axios
      .post(`http://${API_URL}/signup/evf`, { id: email })
      .then((res) => setCertNumber(res.data.data))
      .catch((err) => console.error(err));
  };

  const onCheckEmail = () => {
    if (inputCertNumber === certNumber) {
      Alert.alert("인증되었습니다.");
      setIsEmailCheck(true);
      setOpenModal(false);
    } else {
      Alert.alert("인증코드를 다시 확인해주세요.");
    }
  };

  const onClickSignupButton = () => {
    if (firstName && lastName && isEmailCheck && phone && isEmailCheck) {
      axios
        .post(`http://${API_URL}/signup/post`, { email, name: firstName + lastName, phone, password })
        .then((res) => {
          if (res.data.result) {
            Alert.alert(`회원가입되었습니다. 아이디는 ${email}입니다.`);
            navigation.navigate("Home");
          } else {
            Alert.alert("회원가입에 실패했습니다.");
          }
        })
        .catch((err) => console.error(err));
    } else {
      Alert.alert("정보를 모두 입력한 후 회원가입을 시도해주세요.");
    }
  };

  useEffect(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (password.match(reg) && password === passwordConfirm) {
      setIsPasswordCheck(true);
    } else {
      setIsPasswordCheck(false);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    setIsConfirmEmail(false);
    setIsEmailCheck(false);
  }, [email]);

  return (
    <ScrollView>
      <View className="flex w-full h-full justify-center items-center">
        <View className="flex w-3/4 h-20 justify-center items-center mt-14">
          <Image source={Title} resizeMode="contain" className="w-full h-full" />
        </View>
        <View className="flex w-full justify-center items-center flex-row mt-10">
          <TextInput
            className="flex w-40 bg-white text-xl border-neutral-400 border rounded-lg mr-1 p-2"
            placeholder="성"
            placeholderTextColor="darkgray"
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            className="flex w-40  bg-white text-xl border-neutral-400 border rounded-lg ml-1 p-2"
            placeholder="이름"
            placeholderTextColor="darkgray"
            onChangeText={(text) => setLastName(text)}
          />
        </View>
        <View className="flex w-full justify-center items-center flex-row mt-4">
          <TextInput
            className="flex w-2/3 bg-white text-xl border-neutral-400 border rounded-lg p-2"
            placeholder="이메일"
            placeholderTextColor="darkgray"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          {isConfirmEmail ? (
            <TouchableOpacity
              className="flex w-[15%] h-10 bg-button ml-2 rounded-lg justify-center items-center"
              onPress={() => onClickEmailCert()}
              disabled={isEmailCheck}
            >
              <Text className="text-lg text-white">인증</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="flex w-[15%] h-10 bg-button ml-2 rounded-lg justify-center items-center" onPress={() => onClickEmailConfirm()}>
              <Text className="text-lg text-white">확인</Text>
            </TouchableOpacity>
          )}
        </View>
        <View className="flex w-5/6 items-end mt-2">
          {isConfirmEmail && isEmailCheck ? (
            <Text className="text-blue-500">인증된 이메일입니다.</Text>
          ) : isConfirmEmail ? (
            <Text className="text-green-500">사용가능한 이메일입니다.</Text>
          ) : (
            <Text className="text-red-500">확인이 필요한 이메일입니다.</Text>
          )}
        </View>
        <TextInput
          className="flex w-5/6 bg-white text-xl border-neutral-400 border rounded-lg p-2 mt-4"
          placeholder="전화번호"
          placeholderTextColor="darkgray"
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
        />
        <RadioButton.Group onValueChange={(newValue) => setGender(newValue)} value={gender}>
          <View className="flex w-full justify-start items-center flex-row px-10 py-3">
            <Text className="text-xl mr-5">성별</Text>
            <Text className="text-lg">남성</Text>
            <RadioButton.Android value="남성" color="#06CFCB" />
            <Text className="text-lg">여성</Text>
            <RadioButton.Android value="여성" color="#06CFCB" />
          </View>
        </RadioButton.Group>
        <TextInput
          className="flex w-5/6 bg-white text-xl border-neutral-400 border rounded-lg p-2"
          placeholder="비밀번호"
          placeholderTextColor="darkgray"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View className="flex w-5/6 items-end">
          <Text className="text-neutral-400 mt-2">(영문, 숫자, 특수문자 조합 8~14자리로 입력해주세요.)</Text>
        </View>
        <TextInput
          className="flex w-5/6 bg-white text-xl border-neutral-400 border rounded-lg p-2 mt-4"
          placeholder="비밀번호 확인"
          placeholderTextColor="darkgray"
          secureTextEntry={true}
          onChangeText={(text) => setPasswordConfirm(text)}
        />
        <TouchableOpacity className="flex w-1/3 h-12 justify-center items-center bg-button mt-5 rounded-xl" onPress={() => onClickSignupButton()}>
          <Text className="text-xl text-white">회원가입</Text>
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={openModal} onRequestClose={() => setOpenModal(!openModal)}>
        <View className="flex-1 justify-center items-center">
          <View className="flex w-4/5 h-1/3 bg-white rounded-xl p-10 items-center shadow-shadow border-black border">
            <Text className="text-2xl">이메일 인증</Text>
            <View className="flex w-full h-2/3 justify-center items-center">
              <Text className="text-lg">{`<${email}>`}</Text>
              <Text className="text-lg">인증 코드가 메일로 발송되었습니다.</Text>
              <TextInput
                className="flex w-full justify-center items-center bg-white border-neutral-400 border p-3 text-xl rounded-lg mt-2"
                onChangeText={(text) => setInputCertNumber(text)}
              />
            </View>
            <View className="flex w-full justify-center items-center flex-row">
              <TouchableOpacity className="flex bg-button rounded-2xl" onPress={() => onCheckEmail()}>
                <Text className="text-white text-xl p-3 mx-1">확인</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex bg-black rounded-2xl" onPress={() => setOpenModal(!openModal)}>
                <Text className="text-white text-xl p-3 mx-1">닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SignUp;
