import React, { useEffect } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const CustomDrawer = ({ navigation, handleLogout, isLogin }, props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View className="flex w-full">
        <Text className="flex w-full px-3 text-2xl mt-6">기본</Text>
        <DrawerItem
          icon={() => <Icon name="home" size={25} />}
          label={() => <Text className="text-xl text-black">Home</Text>}
          onPress={() => navigation.navigate("Home")}
        />
        <DrawerItem
          icon={() => <Icon name="information-circle-outline" size={25} />}
          label={() => <Text className="text-xl text-black">기능 소개</Text>}
          onPress={() => navigation.navigate("Info")}
        />
        <DrawerItem
          icon={() => <Icon name="analytics" size={25} />}
          label={() => <Text className="text-xl text-black">기록표</Text>}
          onPress={() => navigation.navigate("Record")}
        />
        <Text className="flex w-full px-3 text-2xl mt-6">체력 검정</Text>
        <DrawerItem
          icon={() => <Icon name="barbell" size={25} />}
          label={() => <Text className="text-xl">자세 측정</Text>}
          onPress={() => navigation.navigate("PoseSetting")}
        />
        <Text className="flex w-full px-3 text-2xl mt-6">건강 관리</Text>
        <DrawerItem
          icon={() => <Icon name="restaurant" size={25} />}
          label={() => <Text className="text-xl">영양소 분석</Text>}
          onPress={() => navigation.navigate("NutritionSelect")}
        />
        <DrawerItem
          icon={() => <Icon name="star-outline" size={25} />}
          label={() => <Text className="text-xl">추천 받기</Text>}
          onPress={() => navigation.navigate("SelectRecommend")}
        />
        <Text className="flex w-full px-3 text-2xl mt-6">회원정보</Text>
        {isLogin ? (
          <>
            <DrawerItem
              icon={() => <Icon name="person" size={25} />}
              label={() => <Text className="text-xl">프로필</Text>}
              onPress={() => navigation.navigate("DefaultProfile")}
            />
            <TouchableOpacity className="w-full px-5 flex-row items-center" onPress={() => handleLogout()}>
              <Icon name="person-remove" size={25} />
              <Text className="text-xl ml-[30px]">로그아웃</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View>
            <DrawerItem
              icon={() => <Icon name="person" size={25} />}
              label={() => <Text className="text-xl">로그인</Text>}
              onPress={() => navigation.navigate("Login")}
            />
            <DrawerItem
              icon={() => <Icon name="person-add" size={25} />}
              label={() => <Text className="text-xl">회원가입</Text>}
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
