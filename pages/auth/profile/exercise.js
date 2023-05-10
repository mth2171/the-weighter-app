import React, { useEffect, useState } from "react";
import { Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../../components/Footer";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import { BarChart } from "react-native-chart-kit";
import { getToken } from "../../../utils/tokenManaging";
import axios from "axios";
import { Calendar } from "react-native-calendars";

const ExerciseProfile = ({ navigation }) => {
  const [mode, setMode] = useState("squat");
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getToken().then((token) => {
      axios
        .post(
          `http://${process.env.API_URL}/profile/Exercise`,
          { period: "week", date, condition: mode },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `bearer ${token.token}`,
            },
          }
        )
        .then((res) => {
          const newLabels = [];
          const newData = [];
          res.data.forEach((obj) => {
            newData.push(obj.count);
          });
          for (let i = 6; i >= 0; i--) {
            const currentDate = new Date(date);
            newLabels.push(moment(currentDate.setDate(currentDate.getDate() - i)).format("MM월 DD일"));
          }
          setLabels(newLabels);
          setData(newData);
        })
        .catch((err) => console.error(err));
    });
  }, [date]);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100">
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-t p-3">
          <Text className="text-2xl font-semibold">운동정보</Text>
        </View>
        <View className="flex w-5/6 justify-center items-center py-3 flex-row border-neutral-300 border-y z-10">
          <TouchableOpacity className="justify-center items-center mr-5" onPress={() => setOpenDatePicker(true)}>
            <Text className="text-xl ">{`날짜 : ${moment(date).format("YYYY년 MM월 DD일")}`}</Text>
          </TouchableOpacity>
          <DropDownPicker
            open={openDropdown}
            value={mode}
            items={[
              { label: "스쿼트", value: "squat" },
              { label: "팔굽혀펴기", value: "pushup" },
              { label: "윗몸일으키기", value: "situp" },
            ]}
            onPress={() => setOpenDropdown(!openDropdown)}
            onSelectItem={(item) => setMode(item.value)}
            autoScroll={true}
            textStyle={{ fontSize: 18 }}
            containerStyle={{ width: "40%" }}
          />
        </View>
        <ScrollView className="flex w-5/6 max-h-80 py-3 border-neutral-300 border-b" horizontal={true}>
          {data.length > 0 && (
            <BarChart
              data={{ labels, datasets: [{ data }] }}
              width={600}
              height={300}
              yAxisSuffix=" 회"
              chartConfig={{
                backgroundGradientFrom: "rgb(245, 245, 245)",
                backgroundGradientTo: "rgb(245, 245, 245)",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                decimalPlaces: 0,
              }}
            />
          )}
        </ScrollView>
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
          <TouchableOpacity className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2" onPress={() => navigation.navigate("PlanProfile")}>
            <Text className="text-xl text-white">계획정보</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex justify-center items-center w-1/3 bg-button p-3 rounded-lg mx-2"
            onPress={() => navigation.navigate("NutritionProfile")}
          >
            <Text className="text-xl text-white">영양정보</Text>
          </TouchableOpacity>
        </View>
        <Modal className="flex-1 justify-center items-center" visible={openDatePicker} transparent={true}>
          <View className="flex-1 justify-center items-center">
            <View className="flex w-5/6 justify-center items-center bg-white p-5 border-black border">
              <Calendar
                onDayPress={(date) => {
                  setDate(date.dateString);
                  setOpenDatePicker(!openDatePicker);
                }}
                markedDates={{
                  [date]: { selected: true, disableTouchEvent: true, selectedDotColor: "orange" },
                }}
              />
              <TouchableOpacity className="flex w-1/3 p-3 rounded-xl bg-button justify-center items-center mt-5" onPress={() => setOpenDatePicker(false)}>
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

export default ExerciseProfile;
