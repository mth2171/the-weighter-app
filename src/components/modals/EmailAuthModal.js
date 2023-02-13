import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../../styles/EmailAuthModalStyles";

const EmailAuthModal = ({ open, setOpen, code, email, setIsAuthEmail }) => {
  const [inputCode, setInputCode] = React.useState("");
  const onClickCloseButton = () => {
    setOpen(false);
  };

  const onClickSubmitButton = () => {
    console.log(code, inputCode);
    if (code === inputCode) {
      setIsAuthEmail(true);
      setOpen(false);
    } else {
      alert("인증번호가 잘못되었습니다.");
    }
  };
  return (
    <Modal visible={open} transparent={true}>
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.text}>
            <Text>{email}</Text>
            <Text>로 인증 메일이 전송되었습니다.</Text>
          </View>
          <TextInput style={styles.input} onChangeText={(text) => setInputCode(text)}></TextInput>
          <View style={{ display: "flex", width: "100%", height: "10%", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity onPress={() => onClickSubmitButton()} style={styles.authButton}>
              <Text style={{ color: "white" }}>인증 확인</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickCloseButton()} style={styles.closeButton}>
              <Text style={{ color: "white" }}>창닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EmailAuthModal;
