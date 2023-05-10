import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken } from "./utils/tokenManaging";

import Header from "./components/Header";
import CustomDrawer from "./components/CustomDrawer";
import Main from "./pages/main";
import Info from "./pages/info";
import Record from "./pages/record";
import IsNotLogin from "./pages/error/isNotLogin";

import PoseSetting from "./pages/pose/setting";
import PoseSelect from "./pages/pose/select";
import PoseDetect from "./pages/pose/detect";
import PoseResult from "./pages/pose/result";

import NutritionSelect from "./pages/nutrition/select";
import NutritionDetect from "./pages/nutrition/detect";

import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";

import SelectRecommend from "./pages/recommend/select";
import DietRecommend from "./pages/recommend/diet";
import ExerciseRecommend from "./pages/recommend/exercise";

import DefaultProfile from "./pages/auth/profile/default";
import NutritionProfile from "./pages/auth/profile/nutrition";
import ExerciseProfile from "./pages/auth/profile/exercise";
import HealthProfile from "./pages/auth/profile/health";
import PlanProfile from "./pages/auth/profile/plan";
import NutritionBarcode from "./pages/nutrition/barcode";

const Drawer = createDrawerNavigator();

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLogin = async (token) => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    await AsyncStorage.setItem("token", JSON.stringify({ token, expiredAt: date }));
    setIsLogin(true);
  };

  const handleLogout = async () => {
    removeToken();
    setIsLogin(false);
  };

  return (
    <NavigationContainer onReady={() => console.log("Navigation container is ready")}>
      <Drawer.Navigator
        useLegacyImplementation
        screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} /> }}
        drawerContent={(props) => <CustomDrawer {...props} handleLogout={handleLogout} isLogin={isLogin} />}
      >
        <Drawer.Screen name="Home">{(props) => <Main {...props} />}</Drawer.Screen>
        <Drawer.Screen name="Info" component={Info} />
        <Drawer.Screen name="Record" component={Record} />
        <Drawer.Screen name="PoseSetting" component={isLogin ? PoseSetting : IsNotLogin} />
        <Drawer.Screen name="PoseDetect" component={PoseDetect} />
        <Drawer.Screen name="PoseSelect" component={PoseSelect} />
        <Drawer.Screen name="PoseResult" component={PoseResult} />
        <Drawer.Screen name="SelectRecommend" component={isLogin ? SelectRecommend : IsNotLogin} />
        <Drawer.Screen name="DietRecommend" component={DietRecommend} />
        <Drawer.Screen name="ExerciseRecommend" component={ExerciseRecommend} />
        <Drawer.Screen name="DefaultProfile" component={isLogin ? DefaultProfile : IsNotLogin} />
        <Drawer.Screen name="PlanProfile" component={PlanProfile} />
        <Drawer.Screen name="HealthProfile" component={HealthProfile} />
        <Drawer.Screen name="NutritionProfile" component={NutritionProfile} />
        <Drawer.Screen name="ExerciseProfile" component={ExerciseProfile} />
        <Drawer.Screen name="NutritionDetect" component={NutritionDetect} />
        <Drawer.Screen name="NutritionBarcode" component={NutritionBarcode} />
        <Drawer.Screen name="NutritionSelect" component={isLogin ? NutritionSelect : IsNotLogin} />
        <Drawer.Screen name="Login" children={({ navigation }) => <Login onLogin={handleLogin} navigation={navigation} />} />
        <Drawer.Screen name="SignUp" component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
