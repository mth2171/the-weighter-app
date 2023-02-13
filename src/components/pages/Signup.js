import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "../../styles/SignupStyles";
import axios from "axios";
import EmailAuthModal from "../modals/EmailAuthModal";

const Signup = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isConfirmEmail, setIsConfirmEmail] = React.useState(false);
  const [isAuthEmail, setIsAuthEmail] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [isConfirmPassword, setIsConfirmPassword] = React.useState(false);

  const [code, setCode] = React.useState("");

  const onClickEmailCheck = () => {
    const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(reg)) {
      axios
        .post("http://localhost:8000/signup/emailCheck/", { email })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
            alert("이미 가입된 이메일입니다.");
          } else {
            setIsConfirmEmail(true);
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };

  const onClickSubmit = () => {
    if (firstName && lastName && isConfirmEmail && phone && isConfirmPassword) {
      axios
        .post("http://localhost:8000/signup/post", { name: firstName + lastName, email, phone, password })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    } else {
      alert("정보를 다시 확인해 주세요.");
    }
  };

  const onClickEmailAuth = () => {
    setOpen(true);
    axios
      .post("http://localhost:8000/signup/evf", { email })
      .then((res) => setCode(res.data.sendEvfcode))
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (password.match(reg) && password === passwordConfirm) {
      setIsConfirmPassword(true);
    } else {
      setIsConfirmPassword(false);
    }
  }, [password, passwordConfirm]);

  React.useEffect(() => {
    setIsConfirmEmail(false);
    setIsAuthEmail(false);
  }, [email]);

  return (
    <View style={styles.container}>
      <Text style={styles.signupFont}>회원가입</Text>
      <View style={styles.rowView}>
        <TextInput style={styles.nameInput} placeholder="성" onChangeText={(text) => setFirstName(text)} />
        <TextInput style={styles.nameInput} placeholder="이름" onChangeText={(text) => setLastName(text)} />
      </View>
      <View style={styles.rowView}>
        <TextInput style={styles.emailInput} placeholder="이메일" onChangeText={(text) => setEmail(text)} />
        <TouchableOpacity style={styles.emailButton}>
          <Text style={{ color: "white" }} onPress={() => onClickEmailCheck()}>
            확인
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ display: "flex", alignItems: "flex-end", width: "80%", marginTop: 5 }}>
        {isConfirmEmail && isAuthEmail ? (
          <Text style={{ color: "blue" }}>이메일이 확인되었습니다.</Text>
        ) : isConfirmEmail ? (
          <View style={{ display: "flex", width: "100%", height: "100%", flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ display: "flex", color: "green" }}>사용가능한 이메일입니다.</Text>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={{ color: "white" }} onPress={() => onClickEmailAuth()}>
                이메일 인증하기
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={{ color: "red" }}>이메일을 확인해주세요</Text>
        )}
      </View>
      <TextInput style={styles.input} placeholder="전화번호" onChangeText={(text) => setPhone(text)} />
      <TextInput style={styles.input} placeholder="비밀번호" secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
      <View style={{ display: "flex", alignItems: "flex-end", width: "80%", marginTop: 5 }}>
        <Text style={{ color: "#6B7280" }}>8 - 14자 사이 입력 (0-9, a-z, A-Z)</Text>
        <Text style={{ color: "#6B7280" }}>특수 문자 필요 (!, @, #, $, %)</Text>
      </View>
      <TextInput style={styles.input} placeholder="비밀번호 확인" secureTextEntry={true} onChangeText={(text) => setPasswordConfirm(text)} />
      <View style={{ display: "flex", alignItems: "flex-end", width: "80%", marginTop: 5 }}>
        {isConfirmPassword ? (
          <Text style={{ color: "blue" }}>비밀번호가 일치합니다.</Text>
        ) : (
          <Text style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</Text>
        )}
      </View>
      <View style={{ display: "flex", alignItems: "flex-end", width: "80%", marginTop: 5 }}></View>
      <TouchableOpacity style={styles.submit} onPress={() => onClickSubmit()}>
        <Text style={{ color: "white" }}>계정 생성</Text>
      </TouchableOpacity>
      <EmailAuthModal open={open} setOpen={setOpen} code={code} email={email} setIsAuthEmail={setIsAuthEmail} />
    </View>
  );
};

export default Signup;
