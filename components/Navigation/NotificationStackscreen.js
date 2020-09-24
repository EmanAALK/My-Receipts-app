import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import Notification from "../Notifications";

const NotificationStack = createStackNavigator();

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    initialRouteName='Notification'
    screenOptions={{
      headerTintColor: "#fff",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 90,
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
            color={"#E0E0E0"}
            backgroundColor='white'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

export default observer(NotificationStackScreen);
