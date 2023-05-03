import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const EXERCISES = ["squat", "pushup", "situp"];

const Select = ({ navigation }) => {
  return (
    <View className="flex w-full h-full bg-neutral-200 justify-center items-center">
      {EXERCISES.map((value) => (
        <TouchableOpacity
          key={Math.random()}
          className="flex w-2/3 h-16 bg-button my-2 justify-center items-center rounded-lg"
          onPress={() => navigation.navigate("PoseDetect", { pose: value })}
        >
          <Text className="text-xl text-white">{value.toUpperCase()}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Select;
