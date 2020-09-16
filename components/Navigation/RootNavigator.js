import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import DrawerContent from "../DawerContenent";

import Navigation from "./index";
import authStore from "../../store/authStore";
import HomeStackScreen from "./HomeStackScreen";

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const TabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="white"
    barStyle={{ backgroundColor: "grey" }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        backgroundColor: "grey",
        tabBarLabel: "Home",

        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="AddReceipt"
      component={HomeStackScreen}
      options={{
        backgroundColor: "grey",
        tabBarLabel: "Home",

        tabBarIcon: ({ color }) => (
          <Icon name="md-camera" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="notifications"
      component={HomeStackScreen}
      options={{
        backgroundColor: "grey",
        tabBarLabel: "Home",

        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

const RootNavigator = () => {
  return (
    <>
      {authStore.user ? (
        <Drawer.Navigator
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="HomeTab" component={TabScreen} />
        </Drawer.Navigator>
      ) : (
        <Navigation />
      )}
    </>
  );
};
export default observer(RootNavigator);
