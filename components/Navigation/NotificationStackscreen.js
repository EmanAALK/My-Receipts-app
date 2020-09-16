import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import Notification from "../Notifications";

const NotificationStack = createStackNavigator();

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    initialRouteName="Notification"
    screenOptions={{
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "grey",
        height: 55,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <NotificationStack.Screen
      name="Notification"
      component={Notification}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="grey"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

export default observer(NotificationStackScreen);