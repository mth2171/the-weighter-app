import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Footer from "../../components/Footer";
import { API_URL } from "@env";
import axios from "axios";
import { getToken } from "../../utils/tokenManaging";

const PoseResult = ({ route, navigation }) => {
  const [count, setCount] = useState(0);
  const [nowCount, setNowCount] = useState(0);
  const [time, setTime] = useState(0);
  const [type, setType] = useState("");

  useEffect(() => {
    setCount(route.params.count);
    setNowCount(route.params.nowCount);
    setTime(route.params.time);
    setType(route.params.type);
  }, [route]);

  const onClickSubmitButton = () => {
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/motion/save`,
          { type, count, time, score: parseInt((count / time) * 100) },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            navigation.navigate("Home");
          }
        })
        .catch((err) => console.error(err));
    });
  };

  return (
    <View className="flex w-full h-full justify-center items-center">
      <View className="flex w-full h-[90%] justify-center items-center">
        <Text className="text-3xl">결과화면</Text>
        <View className="flex w-2/3 flex-row justify-center items-center mt-10 border">
          <View className="flex w-1/3 p-3 border-black items-end border-r">
            <Text className="text-2xl">운동명</Text>
          </View>
          <View className="flex w-2/3 p-3 border-black items-start">
            <Text className="text-2xl">{type}</Text>
          </View>
        </View>
        <View className="flex w-2/3 flex-row justify-center items-center border-b border-x">
          <View className="flex w-1/3 p-3 border-black items-end border-r">
            <Text className="text-2xl">갯수</Text>
          </View>
          <View className="flex w-2/3 p-3 border-black items-start">
            <Text className="text-2xl">{nowCount}개</Text>
          </View>
        </View>
        <View className="flex w-2/3 flex-row justify-center items-center border-b border-x">
          <View className="flex w-1/3 p-3 border-black items-end border-r">
            <Text className="text-2xl">시간</Text>
          </View>
          <View className="flex w-2/3 p-3 border-black items-start">
            <Text className="text-2xl">{time}초</Text>
          </View>
        </View>
        <View className="flex w-2/3 flex-row justify-center items-center border-b border-x">
          <View className="flex w-1/3 p-3 border-black items-end border-r">
            <Text className="text-2xl">점수</Text>
          </View>
          <View className="flex w-2/3 p-3 border-black items-start">
            <Text className="text-2xl">{`${nowCount}개 / ${count}개`}</Text>
          </View>
        </View>
        <TouchableOpacity className="flex w-1/3 h-14 bg-button justify-center items-center rounded-xl mt-10" onPress={onClickSubmitButton}>
          <Text className="text-xl text-white">등록하기</Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
};

export default PoseResult;
