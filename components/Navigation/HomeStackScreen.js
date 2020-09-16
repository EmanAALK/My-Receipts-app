import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import EditProfile from "../Profile";
import FolderList from "../FolderList";
import Notification from "../Notifications";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    initialRouteName="Home"
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
    <HomeStack.Screen
      name="Home"
      component={FolderList}
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

    <HomeStack.Screen
      name="Profile"
      component={EditProfile}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            color="#fff"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
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
    <HomeStack.Screen
      name="Notification"
      component={Notification}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            color="#fff"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
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
  </HomeStack.Navigator>
);

export default observer(HomeStackScreen);