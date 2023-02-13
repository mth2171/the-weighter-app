import * as React from "react";
import Footer from "./src/components/Footer";
import Login from "./src/components/pages/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./src/components/pages/Main";
import Header from "./src/components/Header";
import Signup from "./src/components/pages/Signup";
import Menu from "./src/components/pages/Menu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Header />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
      <Footer />
    </NavigationContainer>
  );
}
