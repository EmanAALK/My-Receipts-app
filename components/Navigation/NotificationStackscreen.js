import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";
// styles
import Icon from "react-native-vector-icons/Ionicons";

// component
import Notification from "../Notification/Notifications";

const NotificationStack = createStackNavigator();

const color = "#427aa1";
const iconsColor = "#C2C2C2";

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    initialRouteName='Notification'
    screenOptions={{
      headerTintColor: "white",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "transparent",
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
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            backgroundColor='transparent'
            color={iconsColor}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),

        headerLeft: () => (
          <Icon.Button
            name='ios-menu'
            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='white'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

export default observer(NotificationStackScreen);
