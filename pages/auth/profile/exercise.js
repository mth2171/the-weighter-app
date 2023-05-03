import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Footer from "../../../components/Footer";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { BarChart } from "react-native-chart-kit";
import { getToken } from "../../../utils/tokenManaging";
import axios from "axios";

const ExerciseProfile = () => {
  const [mode, setMode] = useState("squat");
  const [date, setDate] = useState(new Date(new Date().setHours(0, 0, 0, 0)));
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getToken().then((token) => {
      console.log("date : ", date);
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
            newLabels.push(obj.time);
            newData.push(obj.count);
          });
          setLabels(newLabels);
          setData(newData);
        })
        .catch((err) => console.error(err));
    });
  }, [date]);

  return (
    <View className="flex w-full h-full">
      <View className="flex w-full h-[90%] justify-center items-center bg-neutral-100">
        <Text className="text-3xl">운동정보</Text>
        <View className="flex w-full h-1/6 justify-center items-center z-10">
          <TouchableOpacity className="w-4/5 justify-center items-center" onPress={() => setOpenDatePicker(true)}>
            <Text className="text-xl">{"날짜 : " + moment(date).format("YYYY년 MM월 DD일")}</Text>
            <DateTimePicker
              date={date}
              isVisible={openDatePicker}
              mode="date"
              onConfirm={(date) => {
                console.log(date);
                setOpenDatePicker(false);
                setDate(new Date(date));
              }}
              onCancel={() => setOpenDatePicker(false)}
            />
          </TouchableOpacity>
          <View className="flex w-full justify-center items-center flex-row mt-3">
            <TouchableOpacity className="flex w-1/5 justify-center items-center">
              <Text className="text-xl">종류</Text>
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
              containerStyle={{ width: "60%" }}
              autoScroll={true}
            />
          </View>
        </View>
        <ScrollView className="flex w-full flex-row" horizontal={true}>
          {data.length > 0 && (
            <BarChart
              data={{ labels, datasets: [{ data }] }}
              width={600}
              height={Dimensions.get("window").height * 0.5}
              yAxisSuffix=" 회"
              fromZero={true}
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
      </View>
      <Footer />
    </View>
  );
};

export default ExerciseProfile;
