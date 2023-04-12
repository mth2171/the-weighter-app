import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Pose from "./pages/pose";
import Main from "./pages/main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CustomDrawer from "./components/CustomDrawer";

// const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator options={{ header: <Header /> }} drawerContent={(props) => <CustomDrawer {...props} />}>
        <Drawer.Screen name="main" component={Main} />
        <Drawer.Screen name="pose" component={Pose} />
      </Drawer.Navigator>
      <Footer />
      {/* <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="pose" component={Pose} />
      </Stack.Navigator> */}
    </NavigationContainer>
  );
}
