import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
// styles
import Icon from "react-native-vector-icons/Ionicons";

// component
import Notification from "../Notifications";

const NotificationStack = createStackNavigator();
const color = "#427aa1";

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    initialRouteName="Notification"
    screenOptions={{
      headerTintColor: "white",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 90,
        backgroundColor: color,
        height: 60,
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
        // title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color="white"
            backgroundColor={color}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

export default observer(NotificationStackScreen);
