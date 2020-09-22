import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import Notification from "../Notifications";

const NotificationStack = createStackNavigator();
const color = "#e2cfc4";

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    initialRouteName='Notification'
    screenOptions={{
      headerTintColor: "#fff",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 90,
        backgroundColor: color,
        height: 55,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <NotificationStack.Screen
      name='Notification'
      component={Notification}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name='ios-menu'
            size={25}
            color={"lightgray"}
            backgroundColor='white'
            backgroundColor={color}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

export default observer(NotificationStackScreen);
