import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react";

import Icon from "react-native-vector-icons/Ionicons";

// component
import CreateReceiptForm from "../Forms/CreateReceiptForm"; // unused import
import CameraModal from "../Modals/CameraModal"; // unused import
import CameraScreen from "../CameraFeature/CameraScreen";

const AddReceiptStack = createStackNavigator();
const color = "#e2cfc4"; // unused const

const AddReceiptStackScreen = ({ navigation }) => (
  <AddReceiptStack.Navigator
    initialRouteName='AddReceipt'
    // title={false}
    screenOptions={{
      headerTintColor: "white",
      backgroundColor: "white",
      headerStyle: {
        backgroundColor: "white",
        height: 100,
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      backgroundColor: "white",
    }}
  >
    <AddReceiptStack.Screen
      name='CameraScreen'
      component={CameraScreen}
      options={{
        title: false,

        headerLeft: () => (
          <Icon.Button
            name='ios-menu'
            size={25}
            color={"gray"}
            backgroundColor='transparent'
            onPress={() => navigation.openDrawer()}
          ></Icon.Button>
        ),
      }}
    />
  </AddReceiptStack.Navigator>
);

export default observer(AddReceiptStackScreen);
