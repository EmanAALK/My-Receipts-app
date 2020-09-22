import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";
// component
import DrawerContent from "../DawerContenent";

import Navigation from "./index";
import authStore from "../../store/authStore";
import HomeStackScreen from "./HomeStackScreen";
import NotificationStackscreen from "./NotificationStackscreen";
import AddReceiptStackScreen from "./AddReceiptStackscreen";
import { LinearGradient } from "expo-linear-gradient"; // unused import
import receiptStore from "../../store/ReceiptStore";
const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();

const color = "#e2cfc4";

// make this file as the index.js
// and move the navigator in index.js to Navigation.js

const TabScreen = () => (
  <Tab.Navigator
    initialRouteName='Home'
    activeColor='#ffbf00'
    barStyle={{ backgroundColor: "white" }}
    initialRouteName='Home'
  >
    <Tab.Screen
      name='Home'
      component={HomeStackScreen}
      options={{
        backgroundColor: "white",
        // tabBarLabel: "Home",
        showLabel: false,
        title: false,

        backgroundColor: color,

        tabBarIcon: ({ color }) => (
          <Icon name='ios-home' color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name='AddReceipt'
      component={AddReceiptStackScreen}
      options={{
        backgroundColor: "white",
        // tabBarLabel: "AddReceipt",
        showLabel: false,
        title: false,
        backgroundColor: "color",
        tabBarIcon: ({ color }) => (
          <Icon name='md-camera' color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name='Notifications'
      component={NotificationStackscreen}
      options={{
        backgroundColor: "white",
        // tabBarLabel: "notifications",
        showLabel: false,
        title: false,
        backgroundColor: color,
        tabBarIcon: ({ color }) => (
          <>
            <Badge value={receiptStore.expiredLength} status='error' />
            <Icon name='ios-notifications' color={color} size={26} />
          </>
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
          <Drawer.Screen name='HomeTab' component={TabScreen} />
        </Drawer.Navigator>
      ) : (
          <Navigation />
        )}
    </>
  );
};
export default observer(RootNavigator);
