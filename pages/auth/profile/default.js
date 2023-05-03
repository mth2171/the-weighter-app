import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../../components/Footer";
import { getToken } from "../../../utils/tokenManaging";
import axios from "axios";
import moment from "moment/moment";

const DefaultProfile = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  useEffect(() => {
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/profile`,
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          setProfileData(res.data.profile);
          setHealthData(res.data.status);
        })
        .catch((err) => console.error(err));
    });
  }, []);
  return (
    <View className="flex w-full h-full">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100 flex-col">
        <Text className="text-3xl">기본 정보</Text>
        {profileData != null ? (
          <>
            <View className="flex w-5/6 justify-center items-center flex-col my-10">
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border items-end">
                  <Text className="text-2xl">이름</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-y border-r items-start">
                  <Text className="text-2xl">{profileData.name.split(3, 2)}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">전화번호</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{profileData.phone}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">성별</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{profileData.gender ? "여성" : "남성"}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">이메일</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{profileData.email}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center">
                <View className="flex w-1/3 p-3 border-black border-x border-b items-end">
                  <Text className="text-2xl">가입일자</Text>
                </View>
                <View className="flex w-2/3 p-3 border-black border-b border-r items-start">
                  <Text className="text-2xl">{moment(profileData.createdAt).format("YYYY년 MM월 DD일")}</Text>
                </View>
              </View>
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center">
              <TouchableOpacity
                className="flex justify-center items-center bg-button p-4 rounded-lg mx-2"
                onPress={() => navigation.navigate("HealthProfile", { healthData })}
              >
                <Text className="text-lg text-white">건강정보</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex justify-center items-center bg-button p-4 rounded-lg mx-2"
                onPress={() => navigation.navigate("NutritionProfile")}
              >
                <Text className="text-lg text-white">영양정보</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex justify-center items-center bg-button p-4 rounded-lg mx-2"
                onPress={() => navigation.navigate("ExerciseProfile")}
              >
                <Text className="text-lg text-white">운동정보</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default DefaultProfile;
