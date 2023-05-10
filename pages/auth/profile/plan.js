import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, Modal, ScrollView } from "react-native";
import { getToken } from "../../../utils/tokenManaging";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import Footer from "../../../components/Footer";
import axios from "axios";

const PlanProfile = ({ navigation }) => {
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);
  const [nutritionData, setNutritionData] = useState({
    breakfast: {
      menu: "계란말이, 고구마 스크램블, 바나나",
      calories: 500,
      nutrition: "탄수화물 50g, 단백질 15g, 지방 20g",
    },
    lunch: {
      menu: "밥, 돼지고기 볶음, 당근 샐러드",
      calories: 600,
      nutrition: "탄수화물 70g, 단백질 25g, 지방 20g",
    },
    dinner: {
      menu: "밥, 미트볼, 생채소",
      calories: 500,
      nutrition: "탄수화물 60g, 단백질 20g, 지방 15g",
    },
  });

  useEffect(() => {
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/planner/getPlan`,
          { date },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => setExerciseData(res.data))
        .catch((err) => {
          console.error(err);
        });
    });
  }, [date]);

  return (
    <View className="flex w-full h-full">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100">
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-y p-3">
          <Text className="text-2xl font-semibold">{`${moment(date).format("YYYY.MM.DD")}`}</Text>
        </View>
        <View className="flex w-5/6 justify-center items-center p-3">
          <TouchableOpacity className="justify-center items-center" onPress={() => setOpenDatePicker(true)}>
            <Text className="text-2xl ">{`날짜 변경`}</Text>
          </TouchableOpacity>
        </View>
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-y p-3">
          <Text className="text-2xl font-semibold">운동</Text>
          {exerciseData.length > 0 && (
            <View className="flex w-full justify-center items-center mt-3">
              {exerciseData.map((value, index) => {
                return <Text key={index} className="text-xl my-1">{`${index + 1}. ${value.type} / ${value.count}회`}</Text>;
              })}
            </View>
          )}
        </View>
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-b p-3">
          <Text className="text-2xl font-semibold">식단</Text>
          {nutritionData && (
            <View className="flex w-full justify-start items-center mt-3">
              <Text className="text-xl">{"아침 : " + nutritionData.breakfast.menu}</Text>
              <Text className="text-xl mt-2">{"점심 : " + nutritionData.lunch.menu}</Text>
              <Text className="text-xl mt-2">{"저녁 : " + nutritionData.dinner.menu}</Text>
            </View>
          )}
        </View>
        <View className="flex w-5/6 flex-row justify-center items-center mt-5">
          <TouchableOpacity
            className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
            onPress={() => navigation.navigate("DefaultProfile")}
          >
            <Text className="text-xl text-white">기본정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
            onPress={() => navigation.navigate("HealthProfile")}
          >
            <Text className="text-xl text-white">건강정보</Text>
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
        <Modal className="flex-1 justify-center items-center" visible={openDatePicker}>
          <View className="flex-1 justify-center items-center">
            <View className="flex w-5/6 justify-center items-center bg-white p-5 border-black border">
              <Calendar
                onDayPress={(date) => {
                  setDate(date.dateString);
                  setOpenDatePicker(!openDatePicker);
                }}
                markedDates={{ [date]: { selected: true, disableTouchEvent: true, selectedDotColor: "orange" } }}
              />
              <TouchableOpacity className="flex w-1/3 rounded-xl bg-button justify-center items-center p-3 mt-5" onPress={() => setOpenDatePicker(false)}>
                <Text className="text-xl text-white">닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Footer />
    </View>
  );
};

export default PlanProfile;
