import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { observer } from "mobx-react";

// styles
import styled from "styled-components";
import { Badge } from "react-native-elements";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// component
import Search from "../Search/index";
import DrawerContent from "../DawerContenent";
import Navigation from "./index";
import authStore from "../../store/authStore";
import HomeStackScreen from "./HomeStackScreen";
import NotificationStackscreen from "./NotificationStackscreen";
import AddReceiptStackScreen from "./AddReceiptStackscreen";
import receiptStore from "../../store/ReceiptStore";

//Icons
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const color = "#C2C2C2";

const TabScreen = observer(() => (
  <Tab.Navigator
    initialRouteName='Home'
    color='#C3C3C3'
    activeColor='#ffbf00'
    barStyle={{ backgroundColor: "white", height: 70 }}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        backgroundColor: "white",
        showLabel: false,
        title: "Home",

        tabBarIcon: ({ color }) => (
          // <Icon name='ios-home' activeColor='#ffbf00' color={color} size={26} />
          <SimpleLineIcons
            name='home'
            activeColor='#ffbf00'
            color={color}
            size={23}
          />
          <Icon name="ios-home" color={"#C2C2C2"} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name='Search'
      component={Search}
      options={{
        backgroundColor: "white",
        showLabel: "Search",
        title: "Search",
        tabBarIcon: ({ color }) => (
          <>
            <AntDesign name='search1' color={color} size={23} />
          </>
        ),
      }}
    />

    <Tab.Screen
      name="AddReceipt"
      component={AddReceiptStackScreen}
      options={{
        backgroundColor: "white",
        showLabel: "New Receipt",
        title: "New Receipt",
        backgroundColor: color,

        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons
            name='camera-plus-outline'
            color={color}
            size={23}
          />
          <Icon name="md-camera" color={"#C2C2C2"} size={26} />

        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationStackscreen}
      options={{
        backgroundColor: "white",
        showLabel: "Notifications",
        title: "Notifications",
        tabBarIcon: ({ color }) => (
          <>
            <Badge
              value={receiptStore.totalExpiredReceipt}
              status='error'
              badgeStyle={styles.badge}
            />
            <Ionicons
              name='ios-notifications-outline'
              color={color}
              size={23}
            />
              badgeStyle={{ marginLeft: 25 }}
              value={receiptStore.totalExpiredReceipt}
              status="error"
            />
            <Icon name="ios-notifications" color={"#C2C2C2"} size={26} />
          </>
        ),
      }}
    />
  </Tab.Navigator>
));
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

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9,
    height: 18,
    minWidth: 0,
    width: 18,
  },
  badgeContainer: {
    position: "absolute",
  },
  badgeText: {
    fontSize: 10,
    paddingHorizontal: 0,
  },
});
