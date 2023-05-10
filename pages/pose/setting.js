import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { getToken } from "../../utils/tokenManaging";
import axios from "axios";
import moment from "moment/moment";
import { RadioButton } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const PoseSetting = ({ navigation }) => {
  const [plan, setPlan] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState();
  const [mode, setMode] = useState("free");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [type, setType] = useState("squat");
  const [count, setCount] = useState(0);

  const onClickGetPlan = () => {
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/planner/getPlan`,
          { date: moment(new Date()).format("YYYY-MM-DD") },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          if (res.data.length > 0) {
            setMode("plan");
            setPlan(res.data);
          } else {
            Alert.alert("금일 계획이 없습니다.");
          }
        })
        .catch((err) => console.error(err));
    });
  };

  const onClickFree = () => {
    setPlan([]);
    setMode("free");
  };
  return (
    <KeyboardAvoidingView className="flex-1 justify-center items-center bg-neutral-100" behavior="padding">
      <View className="flex w-5/6 justify-center items-center p-3">
        <Text className="text-2xl font-semibold">운동 설정</Text>
      </View>
      <View className="flex w-5/6 justify-center flex-row p-3">
        <TouchableOpacity className="flex w-1/2 justify-center items-center bg-button p-3 mx-2 rounded-lg" onPress={onClickGetPlan}>
          <Text className="text-white font-semibold text-xl">계획 불러오기</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex w-1/2 justify-center items-center bg-button p-3 mx-2 rounded-lg" onPress={onClickFree}>
          <Text className="text-white font-semibold text-xl">자율운동</Text>
        </TouchableOpacity>
      </View>
      {plan.length > 0 ? (
        <View className="flex w-4/5 flex-col justify-center items-center my-10">
          {plan.map((value, index) => (
            <View className="flex flex-row border-neutral-400 border my-2" key={index}>
              <View className="flex w-1/4 justify-center items-center border-neutral-400 border-r">
                <RadioButton.Android
                  status={selectedIndex == index ? "checked" : "unchecked"}
                  color="#06CFCB"
                  onPress={() => {
                    setType(value.type);
                    setCount(value.count);
                    setSelectedIndex(index);
                  }}
                />
              </View>
              <View className="flex w-3/4 flex-col p-3">
                <Text className="flex text-xl font-semibold p-2">{`날짜 : ${value.createAt}`}</Text>
                <Text className="flex text-xl font-semibold p-2">{`운동 : ${value.type}`}</Text>
                <Text className="flex text-xl font-semibold p-2">{`갯수 : ${value.count}`}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View className="flex w-5/6 items-center z-10 p-3 border-neutral-300 border-t">
          <View className="flex w-full justify-center items-center flex-row my-3">
            <Text className="text-2xl font-semibold mx-2">운동</Text>
            <DropDownPicker
              open={openDropdown}
              value={type}
              items={[
                { label: "스쿼트", value: "squat" },
                { label: "윗몸일으키기", value: "situp" },
                { label: "팔굽혀펴기", value: "pushup" },
              ]}
              onPress={() => setOpenDropdown(!openDropdown)}
              onSelectItem={(item) => setType(item.value)}
              autoScroll={true}
              containerStyle={{ width: "60%" }}
              textStyle={{ fontSize: "20px" }}
            />
          </View>
          <View className="flex w-full justify-center items-center flex-row my-3">
            <Text className="text-2xl font-semibold mx-2">개수</Text>
            <TextInput value={count} className="w-3/5 bg-white h-12 border-neutral-400 border rounded-lg p-3" keyboardType="number-pad" returnKeyType="done" onChangeText={(text) => setCount(text)} />
          </View>
        </View>
      )}
      <TouchableOpacity
        className="flex w-1/3 p-3 justify-center items-center bg-button rounded-lg"
        onPress={() => {
          navigation.navigate("PoseDetect", {
            mode,
            pose: type,
            count: count,
          });
        }}
      >
        <Text className="text-xl text-white font-semibold">운동 시작</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default PoseSetting;
