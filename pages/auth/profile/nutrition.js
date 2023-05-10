import React, { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View, Modal } from "react-native";
import Footer from "../../../components/Footer";
import moment from "moment";
import { Calendar } from "react-native-calendars";
import DropDownPicker from "react-native-dropdown-picker";
import { StackedBarChart } from "react-native-chart-kit";
import NutritionData from "./data/nutritionData";

const NutritionProfile = ({ navigation }) => {
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [mode, setMode] = useState("month");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100">
        <View className="flex w-5/6 justify-center items-center border-neutral-300 border-t p-3">
          <Text className="text-2xl font-semibold">영양정보</Text>
        </View>
        <View className="flex w-full h-1/6 justify-center items-center z-10">
          <TouchableOpacity className="w-4/5 justify-center items-center" onPress={() => setOpenDatePicker(true)}>
            <Text className="text-xl">{"시작 날짜 : " + moment(date).format("YYYY년 MM월 DD일")}</Text>
          </TouchableOpacity>
          <View className="flex w-full justify-center items-center flex-row mt-3">
            <TouchableOpacity className="flex w-1/5 justify-center items-center">
              <Text className="text-xl">타입</Text>
            </TouchableOpacity>
            <DropDownPicker
              open={openDropdown}
              value={mode}
              items={[
                { label: "월별", value: "month" },
                { label: "주별", value: "week" },
                { label: "일별", value: "day" },
              ]}
              onPress={() => setOpenDropdown(!openDropdown)}
              onSelectItem={(item) => setMode(item.value)}
              containerStyle={{ width: "60%" }}
              autoScroll={true}
            />
          </View>
        </View>
        <ScrollView className="flex w-full flex-row" horizontal={true}>
          <StackedBarChart
            data={NutritionData[mode]}
            width={mode === "day" ? 500 : 800}
            height={Dimensions.get("window").height * 0.5}
            yAxisSuffix=" kcal"
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "#f5f5f5",
              backgroundGradientTo: "#f5f5f5",
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            decimalPlaces={0}
          />
        </ScrollView>
        <View className="flex w-5/6 flex-row justify-center items-center">
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("DefaultProfile")}>
            <Text className="text-lg text-white">기본정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("HealthProfile")}>
            <Text className="text-lg text-white">건강정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("PlanProfile")}>
            <Text className="text-lg text-white">계획정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("ExerciseProfile")}>
            <Text className="text-lg text-white">운동정보</Text>
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

export default NutritionProfile;
