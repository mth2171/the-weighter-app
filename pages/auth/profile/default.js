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
          console.log(res.data);
          setProfileData(res.data.profile);
          setHealthData(res.data.status);
        })
        .catch((err) => console.error(err));
    });
  }, []);
  return (
    <View className="flex-1 bg-neutral-100">
      <View className="flex w-full h-[90%] justify-center items-center flex-col">
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-t p-3">
          <Text className="text-2xl font-semibold">기본정보</Text>
        </View>
        {profileData != null && (
          <>
            <View className="flex w-5/6 justify-center items-center flex-col border-neutral-300 border-y p-3">
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">이름</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{profileData.name.split(3, 2)}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">전화번호</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{profileData.phone}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">성별</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{profileData.gender ? "여성" : "남성"}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">이메일</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{profileData.email}</Text>
                </View>
              </View>
              <View className="flex w-full flex-row justify-center items-center my-3">
                <View className="flex w-1/3  border-neutral-400 border-r items-end">
                  <Text className="text-xl mx-2">가입일자</Text>
                </View>
                <View className="flex w-2/3  border-neutral-400 items-start">
                  <Text className="text-xl mx-2">{moment(profileData.createdAt).format("YYYY년 MM월 DD일")}</Text>
                </View>
              </View>
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center mt-5">
              <TouchableOpacity
                className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
                onPress={() => navigation.navigate("HealthProfile", { healthData })}
              >
                <Text className="text-xl text-white">건강정보</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
                onPress={() => navigation.navigate("PlanProfile")}
              >
                <Text className="text-xl text-white">계획정보</Text>
              </TouchableOpacity>
            </View>
            <View className="flex w-5/6 flex-row justify-center items-center mt-4">
              <TouchableOpacity
                className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
                onPress={() => navigation.navigate("NutritionProfile")}
              >
                <Text className="text-xl text-white">영양정보</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
                onPress={() => navigation.navigate("ExerciseProfile")}
              >
                <Text className="text-xl text-white">운동정보</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      <Footer />
    </View>
  );
};

export default DefaultProfile;
