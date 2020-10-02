import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

//Icons
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// component
import EditProfile from "../Profile";
import FolderList from "../FolderList";
import Notifications from "../Notification/Notifications";
import CreateReceiptForm from "../Forms/CreateReceiptForm";
import UpdateFolderForm from "../Forms/UpdateFolderForm";
import CreateFolderForm from "../Forms/CreateFolderForm";
import ReceiptList from "../ReceiptList";
import ReceiptDetail from "../ReceiptList/ReceiptDetail";
import Calculation from "../Calculation";
import Search from "../Search";
import ArchiveReceipt from "../ReceiptList/ArchiveReceipt";
import UpdateReceiptForm from "../Forms/UpdateReceiptForm";
//Camera Feature
import CameraScreen from "../CameraFeature/CameraScreen";
import CameraPhoto from "../CameraFeature/CameraPhoto";
import PhotoPicker from "../CameraFeature/PhotoPicker";

const HomeStack = createStackNavigator();

const color = "white";
const iconsColor = "#C2C2C2";

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator
    initialRouteName='Home'
    Title='Home'
    screenOptions={{
      headerTintColor: "black",


      backgroundColor: "transparent",


      headerStyle: {
        height: 80,
        backgroundColor: "transparent",
      },
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 18,
      },
    }}
  >
    <HomeStack.Screen
      name='Home'
      component={FolderList}
      // screenOptions={{
      //   backgroundColor: "red",
      // }}
      options={{
        backgroundColor: "white",


        title: "My Folders",

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            activeColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name='ReceiptDetail'
      component={ReceiptDetail}
      screenOptions={{
        backgroundColor: "white",
      }}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name='Profile'
      component={EditProfile}
      options={{
        title: " Profile",
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color='#E0E0E0'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='white'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen

      name="Notifications"

      component={Notifications}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            // style={{ paddingRight: 10 }}

            name="md-arrow-back"
            size={25}
            color={iconsColor}
            backgroundColor="transparent"

            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='CreateReceiptForm'
      component={CreateReceiptForm}
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

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name='UpdateFolderForm'
      component={UpdateFolderForm}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color={iconsColor}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='CreateFolderForm'
      component={CreateFolderForm}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='ReceiptList'
      component={ReceiptList}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={iconsColor}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='Calculation'
      component={Calculation}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='Search'
      component={Search}
      options={{
        backgroundColor: "white",
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

            style={{ marginLeft: 2 }}
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name='CameraScreen'
      component={CameraScreen}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color={"#EBEBEB"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={"#EBEBEB"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />

    <HomeStack.Screen
      name='CameraPhoto'
      component={CameraPhoto}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color={"#E0E0E0"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='PhotoPicker'
      component={PhotoPicker}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color='#fff'
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"

            style={{ marginLeft: 2 }}
            size={25}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name='ArchiveReceipt'
      component={ArchiveReceipt}
      options={{
        title: false,
        headerRight: () => (
          <Icon
            style={{ paddingRight: 10 }}
            name='md-arrow-back'
            size={25}
            color={"#E0E0E0"}
            onPress={() => navigation.goBack()}
          ></Icon>
        ),
        headerLeft: () => (
          <Icon.Button

            name="ios-menu"
            style={{ marginLeft: 2 }}
            size={25}
            color={"#E0E0E0"}
            backgroundColor="transparent"
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
    <HomeStack.Screen
      name="UpdateReceiptForm"
      component={UpdateReceiptForm}
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
