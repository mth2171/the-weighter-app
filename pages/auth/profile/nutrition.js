import React, { useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../../components/Footer";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { StackedBarChart } from "react-native-chart-kit";
import NutritionData from "./data/nutritionData";

const NutritionProfile = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("month");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <View className="flex w-full h-full flex-col">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100">
        <Text className="text-3xl">영양정보</Text>
        <View className="flex w-full h-1/6 justify-center items-center z-10">
          <TouchableOpacity className="w-4/5 justify-center items-center" onPress={() => setOpenDatePicker(true)}>
            <Text className="text-xl">{"시작 날짜 : " + moment(date).format("YYYY년 MM월 DD일")}</Text>
            <DateTimePicker
              date={date}
              isVisible={openDatePicker}
              mode="time"
              onConfirm={() => setOpenDatePicker(false)}
              onCancel={() => setOpenDatePicker(false)}
            />
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
        <View className="flex w-5/6 flex-row justify-center items-center mt-12">
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("DefaultProfile")}>
            <Text className="text-lg text-white">기본정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("HealthProfile")}>
            <Text className="text-lg text-white">건강정보</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex justify-center items-center bg-button p-4 rounded-lg mx-2" onPress={() => navigation.navigate("ExerciseProfile")}>
            <Text className="text-lg text-white">운동정보</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </View>
  );
};

export default NutritionProfile;
