import { createDrawerNavigator } from "@react-navigation/drawer";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-react-native";
import React, { useEffect, useState } from "react";
import Main from "./pages/main";
import Detect from "./pages/pose/detect";
import PoseSelect from "./pages/pose/select";
import Select from "./pages/food/select";
import Header from "./components/Header";
import { NavigationContainer } from "@react-navigation/native";
import CustomDrawer from "./components/CustomDrawer";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import DefaultProfile from "./pages/auth/profile/default";
import NutritionProfile from "./pages/auth/profile/nutrition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeToken } from "./utils/tokenManaging";
import IsNotLogin from "./pages/error/isNotLogin";
import ExerciseProfile from "./pages/auth/profile/exercise";
import Result from "./pages/pose/result";
import SelectRecommend from "./pages/recommend/select";
import DietRecommend from "./pages/recommend/diet";
import ExerciseRecommend from "./pages/recommend/exercise";
import HealthProfile from "./pages/auth/profile/health";
import Info from "./pages/info";
import Record from "./pages/record";
import DetectTest from "./pages/pose/detectTest";

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
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ header: ({ navigation }) => <Header navigation={navigation} /> }}
        drawerContent={(props) => <CustomDrawer {...props} handleLogout={handleLogout} isLogin={isLogin} />}
      >
        <Drawer.Screen name="Home" component={Main} />
        <Drawer.Screen name="Info" component={Info} />
        <Drawer.Screen name="Record" component={Record} />
        <Drawer.Screen name="PoseDetect" component={Detect} />
        <Drawer.Screen name="PoseSelect" component={isLogin ? PoseSelect : IsNotLogin} />
        <Drawer.Screen name="PoseResult" component={Result} />
        <Drawer.Screen name="SelectRecommend" component={isLogin ? SelectRecommend : IsNotLogin} />
        <Drawer.Screen name="DietRecommend" component={DietRecommend} />
        <Drawer.Screen name="ExerciseRecommend" component={ExerciseRecommend} />
        <Drawer.Screen name="DefaultProfile" component={isLogin ? DefaultProfile : IsNotLogin} />
        <Drawer.Screen name="HealthProfile" component={isLogin ? HealthProfile : IsNotLogin} />
        <Drawer.Screen name="NutritionProfile" component={isLogin ? NutritionProfile : IsNotLogin} />
        <Drawer.Screen
          name="ExerciseProfile"
          children={({ navigation }) => (isLogin ? <ExerciseProfile isLogin={isLogin} /> : <Login onLogin={handleLogin} navigation={navigation} />)}
        />
        <Drawer.Screen name="Select" component={isLogin ? Select : IsNotLogin} />
        <Drawer.Screen name="Login" children={({ navigation }) => <Login onLogin={handleLogin} navigation={navigation} />} />
        <Drawer.Screen name="SignUp" component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
