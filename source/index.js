import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import Store from "./reduxStore";
import Home from "./screens/home";
import Register from "./screens/Register/Register";
import Password from "./components/Password/Password";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="profile"
        component={Home}
        options={{
          tabBarLabel: "الملف الشخصي",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "md-person-circle" : "md-person-circle-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="schadule"
        component={Home}
        options={{
          title: "مواعيدى",
          tabBarActiveTintColor: "#109EC4",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-person-circle-outline"
                size={24}
                color={tabInfo.focused ? "#109EC4" : "#8e8e93"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "الرئيسية",
          tabBarActiveTintColor: "#109EC4",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: (tabInfo) => {
            return (
              <AntDesign
                name="home"
                size={24}
                color={tabInfo.focused ? "#109EC4" : "#8e8e93"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default function () {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register" headerMode="none">
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={TabNavigator} />
          <Stack.Screen name="Password" component={Password} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});
