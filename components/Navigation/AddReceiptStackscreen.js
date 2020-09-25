import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

//Styling
import Icon from "react-native-vector-icons/Ionicons";
import PhotoPicker from "../CameraFeature/PhotoPicker";
// component
import CreateReceiptForm from "../Forms/CreateReceiptForm";
import CameraModal from "../Modals/CameraModal";
import CameraScreen from "../CameraFeature/CameraScreen";

const AddReceiptStack = createStackNavigator();

const AddReceiptStackScreen = ({ navigation }) => (
  <AddReceiptStack.Navigator
    initialRouteName='AddReceipt'

const color = "#ffbf00";

const AddReceiptStackScreen = ({ navigation }) => (
  <AddReceiptStack.Navigator
    initialRouteName="AddReceipt"
    title={false}
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
      backgroundColor: "white",
    }}
  >
    <AddReceiptStack.Screen

      name="CameraModal"
      component={CameraModal}

      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            color={"#E0E0E0"}
            backgroundColor='transparent'
            color="white"
            backgroundColor={color}
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AddReceiptStack.Navigator>
);

export default observer(AddReceiptStackScreen);
