import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import EditProfile from "../Profile";
import FolderList from "../FolderList";
import Notification from "../Notifications";
import CreateReceiptForm from "../Forms/CreateReceiptForm";
import UpdateFolderForm from "../Forms/UpdateFolderForm";
import CreateFolderForm from "../Forms/CreateFolderForm";
import ReceiptList from "../ReceiptList";
import ReceiptDetail from "../ReceiptList/ReceiptDetail";
import Calculation from "../Calculation";
import Search from "../Search";

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerTintColor: "white",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "#ffbf00",
        height: 100,
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
            color={"white"}
            backgroundColor="transparent"
            activeColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name="ReceiptDetail"
      component={ReceiptDetail}
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
            color="white"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"lightgray"}
            backgroundColor="white"
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
            color="white"
            backgroundColor="transparent"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"lightgray"}
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="CreateReceiptForm"
      component={CreateReceiptForm}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            backgroundColor="transparent"
            color="white"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name="UpdateFolderForm"
      component={UpdateFolderForm}
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
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="CreateFolderForm"
      component={CreateFolderForm}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            backgroundColor="transparent"
            color="#fff"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="ReceiptList"
      component={ReceiptList}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            color="#fff"
            backgroundColor="transparent"
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="Calculation"
      component={Calculation}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="Search"
      component={Search}
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
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

export default observer(HomeStackScreen);
