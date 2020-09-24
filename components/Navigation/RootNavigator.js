import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { observer } from "mobx-react";

// styles
import Icon from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

// component
import DrawerContent from "../DawerContenent";
import Navigation from "./index";
import authStore from "../../store/authStore";
import HomeStackScreen from "./HomeStackScreen";
import NotificationStackscreen from "./NotificationStackscreen";
import AddReceiptStackScreen from "./AddReceiptStackscreen";
import receiptStore from "../../store/ReceiptStore";

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const color = "#427aa1";

const TabScreen = observer(() => (
  <Tab.Navigator
    initialRouteName='Home'
    activeColor='#ffbf00'
    barStyle={{ backgroundColor: "white", height: 70 }}
    initialRouteName='Home'
  >
    <Tab.Screen
      name='Home'
      component={HomeStackScreen}
      options={{
        backgroundColor: "white",
        showLabel: false,
        title: false,

        tabBarIcon: ({ color }) => (
          <Icon name='ios-home' color={"#C2C2C2"} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name='AddReceipt'
      component={AddReceiptStackScreen}
      options={{
        backgroundColor: "white",
        showLabel: false,
        title: false,
        backgroundColor: color,
        tabBarIcon: ({ color }) => (
          <Icon name='md-camera' color={"#C2C2C2"} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name='Notifications'
      component={NotificationStackscreen}
      options={{
        backgroundColor: "white",
        showLabel: false,
        title: false,
        tabBarIcon: ({ color }) => (
          <>
            <Badge value={receiptStore.totalExpiredReceipt} status='error' />
            <Icon name='ios-notifications' color={"#C2C2C2"} size={26} />
          </>
        ),
      }}
    />
  </Tab.Navigator>
));
const RootNavigator = () => {
  // console.log("laila", receiptStore.totalExpiredReceipt);
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
