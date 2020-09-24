import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

// styles
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
import ArchiveReceipt from "../ReceiptList/ArchiveReceipt";
//Camera Feature
import CameraScreen from "../CameraFeature/CameraScreen";
import CameraPhoto from "../CameraFeature/CameraPhoto";
import PhotoPicker from "../CameraFeature/PhotoPicker";

const HomeStack = createStackNavigator();
const color = "#ffbf00";

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    initialRouteName="Home"
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
    <HomeStack.Screen
      name="Home"
      component={FolderList}
      screenOptions={{
        backgroundColor: "white",
      }}
      options={{
        backgroundColor: "white",
        title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
            activeColor='transparent'
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
            color={"#E0E0E0"}
            backgroundColor='transparent'
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
            color='#E0E0E0'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='white'
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
            color='#E0E0E0'
            backgroundColor='transparent'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
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
            backgroundColor='transparent'
            color={"#E0E0E0"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
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
            color={"#E0E0E0"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
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
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
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
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
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
            color={"#EBEBEB"}
            backgroundColor='transparent'
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
            color={"#EBEBEB"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name="CameraScreen"
      component={CameraScreen}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            color={"#EBEBEB"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name="CameraPhoto"
      component={CameraPhoto}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            color={"#E0E0E0"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="PhotoPicker"
      component={PhotoPicker}
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
      name="ArchiveReceipt"
      component={ArchiveReceipt}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name="md-arrow-back"
            size={25}
            color={"#E0E0E0"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </HomeStack.Navigator>
);

export default observer(HomeStackScreen);